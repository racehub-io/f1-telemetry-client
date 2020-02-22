import {Parser} from 'binary-parser';
import {EventEmitter} from 'events';

import {DEFAULT_PORT, F1TelemetryClient} from './index';
import {PACKET_CAR_SETUP_DATA_BUFFER_2018, PACKET_CAR_SETUP_DATA_BUFFER_2019, PACKET_CAR_SETUP_DATA_PARSED_2018, PACKET_CAR_SETUP_DATA_PARSED_2019, PACKET_CAR_STATUS_DATA_BUFFER_2018, PACKET_CAR_STATUS_DATA_BUFFER_2019, PACKET_CAR_STATUS_DATA_PARSED_2018, PACKET_CAR_STATUS_DATA_PARSED_2019, PACKET_CAR_TELEMETRY_DATA_BUFFER_2018, PACKET_CAR_TELEMETRY_DATA_BUFFER_2019, PACKET_CAR_TELEMETRY_DATA_PARSED_2018, PACKET_CAR_TELEMETRY_DATA_PARSED_2019, PACKET_EVENT_DATA_BUFFER_2018, PACKET_EVENT_DATA_BUFFER_2019, PACKET_EVENT_DATA_PARSED_2018, PACKET_EVENT_DATA_PARSED_2019, PACKET_HEADER_BUFFER_2018, PACKET_HEADER_BUFFER_2019, PACKET_HEADER_PARSED_2018, PACKET_HEADER_PARSED_2019, PACKET_LAP_DATA_BUFFER_2018, PACKET_LAP_DATA_BUFFER_2019, PACKET_LAP_DATA_PARSED_2018, PACKET_LAP_DATA_PARSED_2019, PACKET_MOTION_DATA_BUFFER_2018, PACKET_MOTION_DATA_BUFFER_2019, PACKET_MOTION_DATA_PARSED_2018, PACKET_MOTION_DATA_PARSED_2019, PACKET_PARTICIPANTS_DATA_BUFFER_2018, PACKET_PARTICIPANTS_DATA_BUFFER_2019, PACKET_PARTICIPANTS_DATA_PARSED_2018, PACKET_PARTICIPANTS_DATA_PARSED_2019, PACKET_SESSION_DATA_BUFFER_2018, PACKET_SESSION_DATA_BUFFER_2019, PACKET_SESSION_DATA_PARSED_2018, PACKET_SESSION_DATA_PARSED_2019,} from './mocks';

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
        const buffer = new Buffer(PACKET_HEADER_BUFFER_2018);
        parsedPacketHeader = F1TelemetryClient.parsePacketHeader(buffer);
      });

      it('should parse buffer and return parsed packet header', () => {
        expect(parsedPacketHeader).toEqual(PACKET_HEADER_PARSED_2018);
      });
    });

    describe('parseMessage', () => {
      let f1TelemetryClient: F1TelemetryClient;

      describe('PacketSessionData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(PACKET_SESSION_DATA_BUFFER_2018);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketSessionData buffer', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith('session', PACKET_SESSION_DATA_PARSED_2018);
        });
      });

      describe('PacketParticipantsData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(PACKET_PARTICIPANTS_DATA_BUFFER_2018);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketParticipantsData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith(
                  'participants', PACKET_PARTICIPANTS_DATA_PARSED_2018);
        });
      });

      describe('PacketCarTelemetryData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(PACKET_CAR_TELEMETRY_DATA_BUFFER_2018);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketCarTelemetryData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith(
                  'carTelemetry', PACKET_CAR_TELEMETRY_DATA_PARSED_2018);
        });
      });

      describe('PacketCarStatusData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(PACKET_CAR_STATUS_DATA_BUFFER_2018);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketCarStatusData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith(
                  'carStatus', PACKET_CAR_STATUS_DATA_PARSED_2018);
        });
      });

      describe('PacketLapData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(PACKET_LAP_DATA_BUFFER_2018);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketLapData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith('lapData', PACKET_LAP_DATA_PARSED_2018);
        });
      });

      describe('PacketMotionData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(PACKET_MOTION_DATA_BUFFER_2018);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketMotionData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith('motion', PACKET_MOTION_DATA_PARSED_2018);
        });
      });

      describe('PacketCarSetupData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(PACKET_CAR_SETUP_DATA_BUFFER_2018);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketCarSetupData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith(
                  'carSetups', PACKET_CAR_SETUP_DATA_PARSED_2018);
        });
      });

      describe('PacketEventData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(PACKET_EVENT_DATA_BUFFER_2018);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketEventData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith('event', PACKET_EVENT_DATA_PARSED_2018);
        });
      });
    });
  });

  describe('2019 format', () => {
    describe('parsePacketHeader', () => {
      // tslint:disable-next-line:no-any
      let parsedPacketHeader: Parser.Parsed<any>;

      beforeAll(() => {
        const buffer = new Buffer(PACKET_HEADER_BUFFER_2019);
        parsedPacketHeader = F1TelemetryClient.parsePacketHeader(buffer);
      });

      it('should parse buffer and return parsed packet header', () => {
        expect(parsedPacketHeader).toEqual(PACKET_HEADER_PARSED_2019);
      });
    });

    describe('parseMessage', () => {
      let f1TelemetryClient: F1TelemetryClient;

      describe('PacketSessionData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(PACKET_SESSION_DATA_BUFFER_2019);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketSessionData buffer', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith('session', PACKET_SESSION_DATA_PARSED_2019);
        });
      });

      describe('PacketParticipantsData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(PACKET_PARTICIPANTS_DATA_BUFFER_2019);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketParticipantsData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith(
                  'participants', PACKET_PARTICIPANTS_DATA_PARSED_2019);
        });
      });

      describe('PacketCarTelemetryData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(PACKET_CAR_TELEMETRY_DATA_BUFFER_2019);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketCarTelemetryData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith(
                  'carTelemetry', PACKET_CAR_TELEMETRY_DATA_PARSED_2019);
        });
      });

      describe('PacketCarStatusData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(PACKET_CAR_STATUS_DATA_BUFFER_2019);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketCarStatusData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith(
                  'carStatus', PACKET_CAR_STATUS_DATA_PARSED_2019);
        });
      });

      describe('PacketLapData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(PACKET_LAP_DATA_BUFFER_2019);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketLapData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith('lapData', PACKET_LAP_DATA_PARSED_2019);
        });
      });

      describe('PacketMotionData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(PACKET_MOTION_DATA_BUFFER_2019);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketMotionData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith('motion', PACKET_MOTION_DATA_PARSED_2019);
        });
      });

      describe('PacketCarSetupData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(PACKET_CAR_SETUP_DATA_BUFFER_2019);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketCarSetupData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith(
                  'carSetups', PACKET_CAR_SETUP_DATA_PARSED_2019);
        });
      });

      describe('PacketEventData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = new Buffer(PACKET_EVENT_DATA_BUFFER_2019);
          f1TelemetryClient.parseMessage(buffer);
        });

        it('should parse PacketEventData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith('event', PACKET_EVENT_DATA_PARSED_2019);
        });
      });
    });
  });
});
