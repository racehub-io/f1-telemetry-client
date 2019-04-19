import {Parser} from 'binary-parser';
import {EventEmitter} from 'events';
import {DEFAULT_PORT, F1TelemetryClient} from './index';
import {packetCarSetupDataBuffer, packetCarSetupDataParsed, packetCarStatusDataBuffer, packetCarStatusDataParsed, packetCarTelemetryBuffer, packetCarTelemetryParsed, packetEventDataBuffer, packetEventDataParsed, packetHeaderBuffer, packetHeaderParsed, packetLapDataBuffer, packetLapDataParsed, packetMotionDataBuffer, packetMotionDataParsed, packetParticipantsDataBuffer, packetParticipantsDataParsed, packetSessionDataBuffer, packetSessionDataParsed,} from './mocks';

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
      expect(parsedPacketHeader).toEqual(packetHeaderParsed);
    });
  });

  describe('parseMessage', () => {
    let f1TelemetryClient: F1TelemetryClient;

    describe('PacketSessionData', () => {
      beforeAll(() => {
        f1TelemetryClient = new F1TelemetryClient();
        spyOn(EventEmitter.prototype, 'emit');
        const buffer = new Buffer(packetSessionDataBuffer.data);
        f1TelemetryClient.parseMessage(buffer);
      });

      it('should parse PacketSessionData buffer', () => {
        expect(EventEmitter.prototype.emit)
            .toHaveBeenCalledWith('session', packetSessionDataParsed);
      });
    });

    describe('PacketParticipantsData', () => {
      beforeAll(() => {
        f1TelemetryClient = new F1TelemetryClient();
        spyOn(EventEmitter.prototype, 'emit');
        const buffer = new Buffer(packetParticipantsDataBuffer.data);
        f1TelemetryClient.parseMessage(buffer);
      });

      it('should parse PacketParticipantsData buffer and emit result', () => {
        expect(EventEmitter.prototype.emit)
            .toHaveBeenCalledWith('participants', packetParticipantsDataParsed);
      });
    });

    describe('PacketCarTelemetryData', () => {
      beforeAll(() => {
        f1TelemetryClient = new F1TelemetryClient();
        spyOn(EventEmitter.prototype, 'emit');
        const buffer = new Buffer(packetCarTelemetryBuffer.data);
        f1TelemetryClient.parseMessage(buffer);
      });

      it('should parse PacketCarTelemetryData buffer and emit result', () => {
        expect(EventEmitter.prototype.emit)
            .toHaveBeenCalledWith('carTelemetry', packetCarTelemetryParsed);
      });
    });

    describe('PacketCarStatusData', () => {
      beforeAll(() => {
        f1TelemetryClient = new F1TelemetryClient();
        spyOn(EventEmitter.prototype, 'emit');
        const buffer = new Buffer(packetCarStatusDataBuffer.data);
        f1TelemetryClient.parseMessage(buffer);
      });

      it('should parse PacketCarStatusData buffer and emit result', () => {
        expect(EventEmitter.prototype.emit)
            .toHaveBeenCalledWith('carStatus', packetCarStatusDataParsed);
      });
    });

    describe('PacketLapData', () => {
      beforeAll(() => {
        f1TelemetryClient = new F1TelemetryClient();
        spyOn(EventEmitter.prototype, 'emit');
        const buffer = new Buffer(packetLapDataBuffer.data);
        f1TelemetryClient.parseMessage(buffer);
      });

      it('should parse PacketLapData buffer and emit result', () => {
        expect(EventEmitter.prototype.emit)
            .toHaveBeenCalledWith('lapData', packetLapDataParsed);
      });
    });

    describe('PacketMotionData', () => {
      beforeAll(() => {
        f1TelemetryClient = new F1TelemetryClient();
        spyOn(EventEmitter.prototype, 'emit');
        const buffer = new Buffer(packetMotionDataBuffer.data);
        f1TelemetryClient.parseMessage(buffer);
      });

      it('should parse PacketMotionData buffer and emit result', () => {
        expect(EventEmitter.prototype.emit)
            .toHaveBeenCalledWith('motion', packetMotionDataParsed);
      });
    });

    describe('PacketCarSetupData', () => {
      beforeAll(() => {
        f1TelemetryClient = new F1TelemetryClient();
        spyOn(EventEmitter.prototype, 'emit');
        const buffer = new Buffer(packetCarSetupDataBuffer.data);
        f1TelemetryClient.parseMessage(buffer);
      });

      it('should parse PacketCarSetupData buffer and emit result', () => {
        expect(EventEmitter.prototype.emit)
            .toHaveBeenCalledWith('carSetups', packetCarSetupDataParsed);
      });
    });

    describe('PacketEventData', () => {
      beforeAll(() => {
        f1TelemetryClient = new F1TelemetryClient();
        spyOn(EventEmitter.prototype, 'emit');
        const buffer = new Buffer(packetEventDataBuffer.data);
        f1TelemetryClient.parseMessage(buffer);
      });

      it('should parse PacketEventData buffer and emit result', () => {
        expect(EventEmitter.prototype.emit)
            .toHaveBeenCalledWith('event', packetEventDataParsed);
      });
    });
  });
});
