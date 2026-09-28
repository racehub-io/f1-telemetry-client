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

    it.each([undefined, '127.0.0.1'])(
      'receives UDP packets after a parse error with address %s',
      async address => {
        const client = new F1TelemetryClient({port: 0, address});
        const sender = createSocket('udp4');
        try {
          const listening = once(client.socket!, 'listening');
          client.start();
          await listening;
          const local = client.socket!.address() as AddressInfo;
          expect(local.address).toBe(address ?? '0.0.0.0');
          let packetCount = 0;
          let rawCount = 0;
          client.on(constants.PACKETS.motion, () => packetCount++);
          client.on('raw', () => rawCount++);
          const malformed = message.subarray(0, 1);
          const parseError = once(client, 'error');
          const datagram = once(client.socket!, 'message');
          sender.send(malformed, local.port, '127.0.0.1');
          const [
            [error, failedBuffer, failedRemote],
            [received, receivedRemote],
          ] = await Promise.all([parseError, datagram]);
          expect(error).toBeInstanceOf(RangeError);
          expect(failedBuffer).toBe(received);
          expect(failedBuffer).toEqual(malformed);
          expect(failedRemote).toBe(receivedRemote);
          expect(failedRemote).toEqual({
            address: '127.0.0.1',
            port: (sender.address() as AddressInfo).port,
            family: 'IPv4',
            size: malformed.length,
          });
          expect(packetCount).toBe(0);
          expect(rawCount).toBe(0);
          const packetEvent = once(client, constants.PACKETS.motion);
          const rawEvent = once(client, 'raw');
          sender.send(message, local.port, '127.0.0.1');
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
          expect(packetCount).toBe(1);
          expect(rawCount).toBe(1);
        } finally {
          const closed = Promise.all([
            once(sender, 'close'),
            once(client.socket!, 'close'),
          ]);
          sender.close();
          client.stop();
          await closed;
        }
      }
    );

    it('throws parse errors without an error listener and from direct parsing', () => {
      const malformed = message.subarray(0, 1);
      const client = new F1TelemetryClient();
      expect(() => client.handleMessage(malformed)).toThrow();
      expect(() => F1TelemetryClient.parseBufferMessage(malformed)).toThrow(
        RangeError
      );
      let errorCount = 0;
      client.on('error', (error, buffer, remote) => {
        errorCount++;
        expect(error).toBeInstanceOf(RangeError);
        expect(buffer).toBe(malformed);
        expect(remote).toBeUndefined();
      });
      client.handleMessage(malformed);
      expect(errorCount).toBe(1);
    });

    it.each([constants.PACKETS.motion, 'raw'])(
      'keeps exceptions from %s listeners unchanged',
      event => {
        const client = new F1TelemetryClient();
        const failure = new Error('Listener failed');
        let errorCount = 0;
        client.on('error', () => errorCount++);
        client.on(event, () => {
          throw failure;
        });
        expect(() => client.handleMessage(message)).toThrow(failure);
        expect(errorCount).toBe(0);
      }
    );

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
