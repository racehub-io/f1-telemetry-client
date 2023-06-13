import {
  BIGINT_ENABLED,
  DEFAULT_PORT,
  F1TelemetryClient,
  FORWARD_ADDRESSES,
} from './index';
import lineByLine from 'n-readlines';
import * as fs from 'fs';

const normalize = (v: unknown) =>
  JSON.parse(
    JSON.stringify(v, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )
  );

const parseMessage = (data: number[]) => {
  const parsed = F1TelemetryClient.parseBufferMessage(Buffer.from(data), true);
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

  for (let year = 2018; year <= 2023; year++) {
    const file = `src/mocks/${year}.json`;
    const liner = fs.existsSync(file) ? new lineByLine(file) : null;
    let line = null;
    let lineNumber = 1;
    describe(`F1 ${year}`, () => {
      while (liner !== null && (line = liner.next())) {
        const data = JSON.parse(line.toString());
        it(`L${lineNumber++}: ${data.packetID}`, () => {
          expect(true).toBeTruthy();
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
