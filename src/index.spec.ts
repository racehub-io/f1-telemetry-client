import {Parser} from 'binary-parser';
import * as EventEmitter from 'events';

import {DEFAULT_PORT, F1TelemetryClient} from './index';
import * as packetHeaderBuffer from './mocks/PacketHeaderBuffer.json';

// import * as packetCarStatusDataBuffer from
// './mocks/PacketCarStatusDataBuffer.json';

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
    // tslint:disable-next-line:no-any
    let parsedPacketHeader: Parser.Parsed<any>;

    beforeAll(() => {
      const buffer = new Buffer(packetHeaderBuffer.data);
      parsedPacketHeader = F1TelemetryClient.parsePacketHeader(buffer);
    });

    it('should parse buffer and return parsed packet header', () => {
      expect(parsedPacketHeader).toEqual({
        m_packetFormat: 2018,
        m_packetVersion: 1,
        m_packetId: 7,
        m_sessionTime: 7.6248016357421875,
        m_frameIdentifier: 157,
        m_playerCarIndex: 0,
      });
    });
  });

  /*
  describe('parseMessage', () => {
    describe('PacketCarStatusData', () => {
      let f1TelemetryClient: F1TelemetryClient;

      beforeAll(() => {
        f1TelemetryClient = new F1TelemetryClient();
        spyOn(EventEmitter.prototype, 'emit');
        const buffer = new Buffer(packetCarStatusDataBuffer.data);
        f1TelemetryClient.parseMessage(buffer);
      });

      it('should parse PacketCarStatusData package', () => {
        expect(EventEmitter.prototype.emit).toHaveBeenCalled();
      });
    });
  });
  */
});
