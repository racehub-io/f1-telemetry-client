import {Parser} from 'binary-parser';
import {EventEmitter} from 'events';

import {DEFAULT_PORT, F1TelemetryClient} from './index';
import {packetCarSetupDataBuffer2018, packetCarSetupDataBuffer2019, packetCarSetupDataParsed2018, packetCarSetupDataParsed2019, packetCarStatusDataBuffer2018, packetCarStatusDataBuffer2019, packetCarStatusDataParsed2018, packetCarStatusDataParsed2019, packetCarTelemetryBuffer2018, packetCarTelemetryBuffer2019, packetCarTelemetryParsed2018, packetCarTelemetryParsed2019, packetEventDataBuffer2018, packetEventDataBuffer2019, packetEventDataParsed2018, packetEventDataParsed2019, packetHeaderBuffer2018, packetHeaderBuffer2019, packetHeaderParsed2018, packetHeaderParsed2019, packetLapDataBuffer2018, packetLapDataBuffer2019, packetLapDataParsed2018, packetLapDataParsed2019, packetMotionDataBuffer2018, packetMotionDataBuffer2019, packetMotionDataParsed2018, packetMotionDataParsed2019, packetParticipantsDataBuffer2018, packetParticipantsDataBuffer2019, packetParticipantsDataParsed2018, packetParticipantsDataParsed2019, packetSessionDataBuffer2018, packetSessionDataBuffer2019, packetSessionDataParsed2018, packetSessionDataParsed2019,} from './mocks';

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

  describe('2018 format', () => {
    describe('parsePacketHeader', () => {
      // tslint:disable-next-line:no-any
      let parsedPacketHeader: Parser.Parsed<any>;

      beforeAll(() => {
        const buffer = new Buffer(packetHeaderBuffer2018.data);
        parsedPacketHeader = F1TelemetryClient.parsePacketHeader(buffer);
      });

      it('should parse buffer and return parsed packet header', () => {
        expect(parsedPacketHeader).toEqual(packetHeaderParsed2018);
      });
    });

    describe('parseMessage', () => {
      let f1TelemetryClient: F1TelemetryClient;

      describe('PacketSessionData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(packetSessionDataBuffer2018.data);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketSessionData buffer', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith('session', packetSessionDataParsed2018);
        });
      });

      describe('PacketParticipantsData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(packetParticipantsDataBuffer2018.data);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketParticipantsData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith(
                  'participants', packetParticipantsDataParsed2018);
        });
      });

      describe('PacketCarTelemetryData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(packetCarTelemetryBuffer2018.data);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketCarTelemetryData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith(
                  'carTelemetry', packetCarTelemetryParsed2018);
        });
      });

      describe('PacketCarStatusData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(packetCarStatusDataBuffer2018.data);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketCarStatusData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith('carStatus', packetCarStatusDataParsed2018);
        });
      });

      describe('PacketLapData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(packetLapDataBuffer2018.data);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketLapData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith('lapData', packetLapDataParsed2018);
        });
      });

      describe('PacketMotionData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(packetMotionDataBuffer2018.data);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketMotionData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith('motion', packetMotionDataParsed2018);
        });
      });

      describe('PacketCarSetupData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(packetCarSetupDataBuffer2018.data);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketCarSetupData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith('carSetups', packetCarSetupDataParsed2018);
        });
      });

      describe('PacketEventData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(packetEventDataBuffer2018.data);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketEventData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith('event', packetEventDataParsed2018);
        });
      });
    });
  });

  describe('2019 format', () => {
    describe('parsePacketHeader', () => {
      // tslint:disable-next-line:no-any
      let parsedPacketHeader: Parser.Parsed<any>;

      beforeAll(() => {
        const buffer = new Buffer(packetHeaderBuffer2019.data);
        parsedPacketHeader = F1TelemetryClient.parsePacketHeader(buffer);
      });

      it('should parse buffer and return parsed packet header', () => {
        console.log(packetHeaderParsed2019);
        expect(parsedPacketHeader).toEqual(packetHeaderParsed2019);
      });
    });

    describe('parseMessage', () => {
      let f1TelemetryClient: F1TelemetryClient;

      describe('PacketSessionData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(packetSessionDataBuffer2019.data);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketSessionData buffer', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith('session', packetSessionDataParsed2019);
        });
      });

      describe('PacketParticipantsData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(packetParticipantsDataBuffer2019.data);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketParticipantsData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith(
                  'participants', packetParticipantsDataParsed2019);
        });
      });

      describe('PacketCarTelemetryData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(packetCarTelemetryBuffer2019.data);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketCarTelemetryData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith(
                  'carTelemetry', packetCarTelemetryParsed2019);
        });
      });

      describe('PacketCarStatusData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(packetCarStatusDataBuffer2019.data);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketCarStatusData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith('carStatus', packetCarStatusDataParsed2019);
        });
      });

      describe('PacketLapData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(packetLapDataBuffer2019.data);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketLapData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith('lapData', packetLapDataParsed2019);
        });
      });

      describe('PacketMotionData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(packetMotionDataBuffer2019.data);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketMotionData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith('motion', packetMotionDataParsed2019);
        });
      });

      describe('PacketCarSetupData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(packetCarSetupDataBuffer2019.data);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketCarSetupData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith('carSetups', packetCarSetupDataParsed2019);
        });
      });

      describe('PacketEventData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(packetEventDataBuffer2019.data);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketEventData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith('event', packetEventDataParsed2019);
        });
      });
    });
  });
});
