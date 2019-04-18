import {DEFAULT_PORT, F1TelemetryClient} from './index';

describe('F1TelemetryClient', () => {
  describe('constructor', () => {
    describe('when no port is passed through parameters', () => {
      let f1TelemetryClient: F1TelemetryClient;

      beforeAll(() => {
        f1TelemetryClient = new F1TelemetryClient();
      });

      it('should set default port and should set up client', () => {
        expect(f1TelemetryClient.port).toBe(DEFAULT_PORT);
      });

      it('should set up client as udp4 client', () => {
        expect(f1TelemetryClient.client).toBeDefined();
        // tslint:disable-next-line:no-any
        expect((f1TelemetryClient.client as any).type).toBe('udp4');
      });
    });

    describe('when a custom port is passed through parameters', () => {
      let f1TelemetryClient: F1TelemetryClient;

      beforeAll(() => {
        f1TelemetryClient = new F1TelemetryClient({port: 20778});
      });

      it('should set custom port and should set up client', () => {
        expect(f1TelemetryClient.port).toBe(20778);
      });

      it('should set up client as udp4 client', () => {
        expect(f1TelemetryClient.client).toBeDefined();
        // tslint:disable-next-line:no-any
        expect((f1TelemetryClient.client as any).type).toBe('udp4');
      });
    });
  });

  describe('parsePacketHeader', () => {
    beforeAll(
        () => {
            // const buffer = new Buffer(bufferMocks.data);
            // F1TelemetryClient.parsePacketHeader(buffer);
            // console.log(buffer);
        });
  });
});
