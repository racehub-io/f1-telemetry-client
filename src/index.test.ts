import {
  BIGINT_ENABLED,
  constants,
  DEFAULT_PORT,
  F1TelemetryClient,
  FORWARD_ADDRESSES,
} from './index';
import lineByLine from 'n-readlines';
import {readFileSync} from 'fs';
import {createSocket} from 'dgram';
import {once} from 'events';
import {AddressInfo} from 'net';

const normalize = (v: unknown) =>
  JSON.parse(
    JSON.stringify(v, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )
  );

const parseMessage = (data: number[]) => {
  const buffer = Buffer.from(data);
  const parsed = F1TelemetryClient.parseBufferMessage(buffer, true);
  expect(parsed?.message).toBe(buffer);
  expect(parsed?.packetID).toBe(
    Object.keys(constants.PACKETS)[parsed!.packetData.data.m_header.m_packetId]
  );
  return normalize(parsed?.packetData?.data);
};

describe('F1TelemetryClient', () => {
  describe('constructor', () => {
    describe('default settings', () => {
      describe('when no parameters are passed', () => {
        let f1TelemetryClient: F1TelemetryClient;

        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
        });

        it('should set default port, forwardAddresses and bigintEnabled to default values', () => {
          expect(f1TelemetryClient.port).toBe(DEFAULT_PORT);
          expect(f1TelemetryClient.forwardAddresses).toBe(FORWARD_ADDRESSES);
          expect(f1TelemetryClient.bigintEnabled).toBe(BIGINT_ENABLED);
        });

        it('should set up client as udp4 client', () => {
          expect(f1TelemetryClient.socket).toBeDefined();
          // eslint-disable-next-line  @typescript-eslint/no-explicit-any
          expect((f1TelemetryClient.socket as any).type).toBe('udp4');
        });
      });
    });

    describe('port attribute', () => {
      describe('when a custom port is passed through parameters', () => {
        let f1TelemetryClient: F1TelemetryClient;

        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient({port: 20778});
        });

        it('should set custom port', () => {
          expect(f1TelemetryClient.port).toBe(20778);
        });

        it('should set forwardAddresses, forward port and bigintEnabled to default values', () => {
          expect(f1TelemetryClient.forwardAddresses).toBe(FORWARD_ADDRESSES);
          expect(f1TelemetryClient.bigintEnabled).toBe(BIGINT_ENABLED);
        });

        it('should set up client as udp4 client', () => {
          expect(f1TelemetryClient.socket).toBeDefined();
          // eslint-disable-next-line  @typescript-eslint/no-explicit-any
          expect((f1TelemetryClient.socket as any).type).toBe('udp4');
        });
      });
    });

    describe('parser enabled attribute', () => {
      describe('when parser enabled is passed through parameters', () => {
        let f1TelemetryClient: F1TelemetryClient;

        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient({
            forwardAddresses: [{port: 4477}],
          });
        });

        it('should set parser enabled', () => {
          expect(f1TelemetryClient.forwardAddresses).toStrictEqual([
            {port: 4477},
          ]);
        });

        it('should set port, forward port and bigintEnabled to default values', () => {
          expect(f1TelemetryClient.port).toBe(DEFAULT_PORT);
          expect(f1TelemetryClient.bigintEnabled).toBe(BIGINT_ENABLED);
        });

        it('should set up client as udp4 client', () => {
          expect(f1TelemetryClient.socket).toBeDefined();
          // eslint-disable-next-line  @typescript-eslint/no-explicit-any
          expect((f1TelemetryClient.socket as any).type).toBe('udp4');
        });
      });
    });

    describe('bigintEnabled attribute', () => {
      describe('when bigint enabled is passed through parameters', () => {
        let f1TelemetryClient: F1TelemetryClient;

        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient({bigintEnabled: false});
        });

        it('should set bigint enabled', () => {
          expect(f1TelemetryClient.bigintEnabled).toBe(false);
        });

        it('should set forwardAddresses, forward port and port to default values', () => {
          expect(f1TelemetryClient.forwardAddresses).toBe(FORWARD_ADDRESSES);
          expect(f1TelemetryClient.port).toBe(DEFAULT_PORT);
        });

        it('should set up client as udp4 client', () => {
          expect(f1TelemetryClient.socket).toBeDefined();
          // eslint-disable-next-line  @typescript-eslint/no-explicit-any
          expect((f1TelemetryClient.socket as any).type).toBe('udp4');
        });
      });
    });
  });

  describe('recorded F1 25 packets', () => {
    const capture = JSON.parse(
      readFileSync('src/mocks/2025.json', 'utf8').split('\n')[0]
    );
    const message = Buffer.from(capture.message.data ?? capture.message);

    it('keeps the packet event and raw event API', () => {
      const client = new F1TelemetryClient();
      let packetCount = 0;
      let rawCount = 0;
      client.on(constants.PACKETS.motion, packet => {
        packetCount++;
        expect(normalize(packet)).toEqual(capture.parsed);
      });
      client.on('raw', raw => {
        rawCount++;
        expect(raw.packetID).toBe('motion');
        expect(raw.message).toBe(message);
        expect(normalize(raw.packetData.data)).toEqual(capture.parsed);
      });
      client.handleMessage(message);
      expect(packetCount).toBe(1);
      expect(rawCount).toBe(1);
    });

    it('includes sender details in both events from a real UDP packet', async () => {
      const client = new F1TelemetryClient({port: 0});
      const sender = createSocket('udp4');
      try {
        const listening = once(client.socket!, 'listening');
        client.start();
        await listening;
        const packetEvent = once(client, constants.PACKETS.motion);
        const rawEvent = once(client, 'raw');
        sender.send(
          message,
          (client.socket!.address() as AddressInfo).port,
          '127.0.0.1'
        );
        const [[packet, remote], [raw, rawRemote]] = await Promise.all([
          packetEvent,
          rawEvent,
        ]);
        expect(remote).toEqual({
          address: '127.0.0.1',
          port: (sender.address() as AddressInfo).port,
          family: 'IPv4',
          size: message.length,
        });
        expect(rawRemote).toBe(remote);
        expect(normalize(packet)).toEqual(capture.parsed);
        expect(raw.packetData.data).toBe(packet);
        expect(raw.message).toEqual(message);
        expect(packet.m_header).not.toHaveProperty('ip');
      } finally {
        const closed = Promise.all([
          once(sender, 'close'),
          once(client.socket!, 'close'),
        ]);
        sender.close();
        client.stop();
        await closed;
      }
    });

    it('skips parsing when skipParsing is true', () => {
      const client = new F1TelemetryClient({skipParsing: true});
      let count = 0;
      client.on(constants.PACKETS.motion, () => count++);
      client.on('raw', () => count++);
      client.handleMessage(message);
      expect(count).toBe(0);
      expect(() => client.handleMessage(message.subarray(0, 1))).not.toThrow();
    });
  });

  for (let year = 2018; year <= 2025; year++) {
    const file = `src/mocks/${year}.json`;
    const liner = new lineByLine(file);
    let line = null;
    let lineNumber = 1;
    describe(`F1 ${year}`, () => {
      while ((line = liner.next())) {
        if (line.length === 0) continue;
        const data = JSON.parse(line.toString());
        it(`L${lineNumber++}: ${data.packetID}`, () => {
          const bufferData = data?.message?.data ?? data?.message;
          const parsed = parseMessage(bufferData);
          expect(parsed.m_header.m_packetFormat).toEqual(year);
          expect(bufferData.length).toEqual(
            F1TelemetryClient.getPacketSize(
              data.parsed.m_header.m_packetFormat,
              data.parsed.m_header.m_packetId
            )
          );
          expect(parsed).toEqual(data.parsed);
        });
      }
    });
  }
});
