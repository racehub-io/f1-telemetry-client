import {Parser} from 'binary-parser';
import {EventEmitter} from 'events';

import {BIGINT_ENABLED, DEFAULT_PORT, F1TelemetryClient, FORWARD_ADDRESSES,} from './index';
import {PACKET_CAR_SETUP_DATA_BUFFER_2018, PACKET_CAR_SETUP_DATA_BUFFER_2019, PACKET_CAR_SETUP_DATA_BUFFER_2020, PACKET_CAR_SETUP_DATA_BUFFER_2021, PACKET_CAR_SETUP_DATA_PARSED_2018, PACKET_CAR_SETUP_DATA_PARSED_2019, PACKET_CAR_SETUP_DATA_PARSED_2020, PACKET_CAR_SETUP_DATA_PARSED_2021, PACKET_CAR_STATUS_DATA_BUFFER_2018, PACKET_CAR_STATUS_DATA_BUFFER_2019, PACKET_CAR_STATUS_DATA_BUFFER_2020, PACKET_CAR_STATUS_DATA_BUFFER_2021, PACKET_CAR_STATUS_DATA_PARSED_2018, PACKET_CAR_STATUS_DATA_PARSED_2019, PACKET_CAR_STATUS_DATA_PARSED_2020, PACKET_CAR_STATUS_DATA_PARSED_2021, PACKET_CAR_TELEMETRY_DATA_BUFFER_2018, PACKET_CAR_TELEMETRY_DATA_BUFFER_2019, PACKET_CAR_TELEMETRY_DATA_BUFFER_2020, PACKET_CAR_TELEMETRY_DATA_BUFFER_2021, PACKET_CAR_TELEMETRY_DATA_PARSED_2018, PACKET_CAR_TELEMETRY_DATA_PARSED_2019, PACKET_CAR_TELEMETRY_DATA_PARSED_2020, PACKET_CAR_TELEMETRY_DATA_PARSED_2021, PACKET_EVENT_DATA_BUFFER_2018, PACKET_EVENT_DATA_BUFFER_2019, PACKET_EVENT_DATA_BUFFER_2020, PACKET_EVENT_DATA_BUFFER_2021, PACKET_EVENT_DATA_PARSED_2018, PACKET_EVENT_DATA_PARSED_2019, PACKET_EVENT_DATA_PARSED_2020, PACKET_EVENT_DATA_PARSED_2021, PACKET_FINAL_CLASSIFICATION_DATA_BUFFER_2020, PACKET_FINAL_CLASSIFICATION_DATA_PARSED_2020, PACKET_HEADER_BUFFER_2018, PACKET_HEADER_BUFFER_2019, PACKET_HEADER_BUFFER_2020, PACKET_HEADER_BUFFER_2021, PACKET_HEADER_PARSED_2018, PACKET_HEADER_PARSED_2019, PACKET_HEADER_PARSED_2020, PACKET_HEADER_PARSED_2021, PACKET_LAP_DATA_BUFFER_2018, PACKET_LAP_DATA_BUFFER_2019, PACKET_LAP_DATA_BUFFER_2020, PACKET_LAP_DATA_BUFFER_2021, PACKET_LAP_DATA_PARSED_2018, PACKET_LAP_DATA_PARSED_2019, PACKET_LAP_DATA_PARSED_2020, PACKET_LAP_DATA_PARSED_2021, PACKET_LOBBY_INFO_DATA_BUFFER_2020, PACKET_LOBBY_INFO_DATA_PARSED_2020, PACKET_MOTION_DATA_BUFFER_2018, PACKET_MOTION_DATA_BUFFER_2019, PACKET_MOTION_DATA_BUFFER_2020, PACKET_MOTION_DATA_BUFFER_2021, PACKET_MOTION_DATA_PARSED_2018, PACKET_MOTION_DATA_PARSED_2019, PACKET_MOTION_DATA_PARSED_2020, PACKET_MOTION_DATA_PARSED_2021, PACKET_PARTICIPANTS_DATA_BUFFER_2018, PACKET_PARTICIPANTS_DATA_BUFFER_2019, PACKET_PARTICIPANTS_DATA_BUFFER_2020, PACKET_PARTICIPANTS_DATA_BUFFER_2021, PACKET_PARTICIPANTS_DATA_PARSED_2018, PACKET_PARTICIPANTS_DATA_PARSED_2019, PACKET_PARTICIPANTS_DATA_PARSED_2020, PACKET_PARTICIPANTS_DATA_PARSED_2021, PACKET_SESSION_DATA_BUFFER_2018, PACKET_SESSION_DATA_BUFFER_2019, PACKET_SESSION_DATA_BUFFER_2020, PACKET_SESSION_DATA_BUFFER_2021, PACKET_SESSION_DATA_PARSED_2018, PACKET_SESSION_DATA_PARSED_2019, PACKET_SESSION_DATA_PARSED_2020, PACKET_SESSION_DATA_PARSED_2021,} from './mocks';

describe('F1TelemetryClient', () => {
  describe('constructor', () => {
    describe('default settings', () => {
      describe('when no parameters are passed', () => {
        let f1TelemetryClient: F1TelemetryClient;

        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
        });

        it('should set default port, forwardAddresses and bigintEnabled to default values',
           () => {
             expect(f1TelemetryClient.port).toBe(DEFAULT_PORT);
             expect(f1TelemetryClient.forwardAddresses).toBe(FORWARD_ADDRESSES);
             expect(f1TelemetryClient.bigintEnabled).toBe(BIGINT_ENABLED);
           });

        it('should set up client as udp4 client', () => {
          expect(f1TelemetryClient.socket).toBeDefined();
          // tslint:disable-next-line:no-any
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

        it('should set forwardAddresses, forward port and bigintEnabled to default values',
           () => {
             expect(f1TelemetryClient.forwardAddresses).toBe(FORWARD_ADDRESSES);
             expect(f1TelemetryClient.bigintEnabled).toBe(BIGINT_ENABLED);
           });

        it('should set up client as udp4 client', () => {
          expect(f1TelemetryClient.socket).toBeDefined();
          // tslint:disable-next-line:no-any
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

        it('should set port, forward port and bigintEnabled to default values',
           () => {
             expect(f1TelemetryClient.port).toBe(DEFAULT_PORT);
             expect(f1TelemetryClient.bigintEnabled).toBe(BIGINT_ENABLED);
           });

        it('should set up client as udp4 client', () => {
          expect(f1TelemetryClient.socket).toBeDefined();
          // tslint:disable-next-line:no-any
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

        it('should set forwardAddresses, forward port and port to default values',
           () => {
             expect(f1TelemetryClient.forwardAddresses).toBe(FORWARD_ADDRESSES);
             expect(f1TelemetryClient.port).toBe(DEFAULT_PORT);
           });

        it('should set up client as udp4 client', () => {
          expect(f1TelemetryClient.socket).toBeDefined();
          // tslint:disable-next-line:no-any
          expect((f1TelemetryClient.socket as any).type).toBe('udp4');
        });
      });
    });
  });

  describe('2018 format', () => {
    describe('parsePacketHeader', () => {
      // tslint:disable-next-line:no-any
      let parsedPacketHeader: Parser.Parsed<any>;

      beforeAll(() => {
        const buffer = Buffer.from(PACKET_HEADER_BUFFER_2018);
        parsedPacketHeader = F1TelemetryClient.parsePacketHeader(buffer, true);
      });

      it('should parse buffer and return parsed packet header', () => {
        expect(parsedPacketHeader).toEqual(PACKET_HEADER_PARSED_2018);
      });
    });

    describe('handleMessage', () => {
      let f1TelemetryClient: F1TelemetryClient;

      describe('PacketSessionData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = Buffer.from(PACKET_SESSION_DATA_BUFFER_2018);
          f1TelemetryClient.handleMessage(buffer);
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
          const buffer = Buffer.from(PACKET_PARTICIPANTS_DATA_BUFFER_2018);
          f1TelemetryClient.handleMessage(buffer);
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
          const buffer = Buffer.from(PACKET_CAR_TELEMETRY_DATA_BUFFER_2018);
          f1TelemetryClient.handleMessage(buffer);
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
          const buffer = Buffer.from(PACKET_CAR_STATUS_DATA_BUFFER_2018);
          f1TelemetryClient.handleMessage(buffer);
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
          const buffer = Buffer.from(PACKET_LAP_DATA_BUFFER_2018);
          f1TelemetryClient.handleMessage(buffer);
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
          const buffer = Buffer.from(PACKET_MOTION_DATA_BUFFER_2018);
          f1TelemetryClient.handleMessage(buffer);
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
          const buffer = Buffer.from(PACKET_CAR_SETUP_DATA_BUFFER_2018);
          f1TelemetryClient.handleMessage(buffer);
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
          const buffer = Buffer.from(PACKET_EVENT_DATA_BUFFER_2018);
          f1TelemetryClient.handleMessage(buffer);
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
        const buffer = Buffer.from(PACKET_HEADER_BUFFER_2019);
        parsedPacketHeader = F1TelemetryClient.parsePacketHeader(buffer, true);
      });

      it('should parse buffer and return parsed packet header', () => {
        expect(parsedPacketHeader).toEqual(PACKET_HEADER_PARSED_2019);
      });
    });

    describe('handleMessage', () => {
      let f1TelemetryClient: F1TelemetryClient;

      describe('PacketSessionData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = Buffer.from(PACKET_SESSION_DATA_BUFFER_2019);
          f1TelemetryClient.handleMessage(buffer);
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
          const buffer = Buffer.from(PACKET_PARTICIPANTS_DATA_BUFFER_2019);
          f1TelemetryClient.handleMessage(buffer);
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
          const buffer = Buffer.from(PACKET_CAR_TELEMETRY_DATA_BUFFER_2019);
          f1TelemetryClient.handleMessage(buffer);
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
          const buffer = Buffer.from(PACKET_CAR_STATUS_DATA_BUFFER_2019);
          f1TelemetryClient.handleMessage(buffer);
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
          const buffer = Buffer.from(PACKET_LAP_DATA_BUFFER_2019);
          f1TelemetryClient.handleMessage(buffer);
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
          const buffer = Buffer.from(PACKET_MOTION_DATA_BUFFER_2019);
          f1TelemetryClient.handleMessage(buffer);
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
          const buffer = Buffer.from(PACKET_CAR_SETUP_DATA_BUFFER_2019);
          f1TelemetryClient.handleMessage(buffer);
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
          const buffer = Buffer.from(PACKET_EVENT_DATA_BUFFER_2019);
          f1TelemetryClient.handleMessage(buffer);
        });

        it('should parse PacketEventData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith('event', PACKET_EVENT_DATA_PARSED_2019);
        });
      });
    });
  });

  describe('2020 format', () => {
    describe('parsePacketHeader', () => {
      // tslint:disable-next-line:no-any
      let parsedPacketHeader: Parser.Parsed<any>;

      beforeAll(() => {
        const buffer = Buffer.from(PACKET_HEADER_BUFFER_2020);
        parsedPacketHeader = F1TelemetryClient.parsePacketHeader(buffer, true);
      });

      it('should parse buffer and return parsed packet header', () => {
        expect(parsedPacketHeader).toEqual(PACKET_HEADER_PARSED_2020);
      });
    });

    describe('handleMessage', () => {
      let f1TelemetryClient: F1TelemetryClient;

      describe('PacketSessionData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = Buffer.from(PACKET_SESSION_DATA_BUFFER_2020);
          f1TelemetryClient.handleMessage(buffer);
        });

        it('should parse PacketSessionData buffer', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith('session', PACKET_SESSION_DATA_PARSED_2020);
        });
      });

      describe('PacketParticipantsData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = Buffer.from(PACKET_PARTICIPANTS_DATA_BUFFER_2020);
          f1TelemetryClient.handleMessage(buffer);
        });

        it('should parse PacketParticipantsData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith(
                  'participants', PACKET_PARTICIPANTS_DATA_PARSED_2020);
        });
      });

      describe('PacketCarTelemetryData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = Buffer.from(PACKET_CAR_TELEMETRY_DATA_BUFFER_2020);
          f1TelemetryClient.handleMessage(buffer);
        });

        it('should parse PacketCarTelemetryData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith(
                  'carTelemetry', PACKET_CAR_TELEMETRY_DATA_PARSED_2020);
        });
      });

      describe('PacketCarStatusData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = Buffer.from(PACKET_CAR_STATUS_DATA_BUFFER_2020);
          f1TelemetryClient.handleMessage(buffer);
        });

        it('should parse PacketCarStatusData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith(
                  'carStatus', PACKET_CAR_STATUS_DATA_PARSED_2020);
        });
      });

      describe('PacketLapData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = Buffer.from(PACKET_LAP_DATA_BUFFER_2020);
          f1TelemetryClient.handleMessage(buffer);
        });

        it('should parse PacketLapData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith('lapData', PACKET_LAP_DATA_PARSED_2020);
        });
      });

      describe('PacketMotionData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = Buffer.from(PACKET_MOTION_DATA_BUFFER_2020);
          f1TelemetryClient.handleMessage(buffer);
        });

        it('should parse PacketMotionData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith('motion', PACKET_MOTION_DATA_PARSED_2020);
        });
      });

      describe('PacketCarSetupData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = Buffer.from(PACKET_CAR_SETUP_DATA_BUFFER_2020);
          f1TelemetryClient.handleMessage(buffer);
        });

        it('should parse PacketCarSetupData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith(
                  'carSetups', PACKET_CAR_SETUP_DATA_PARSED_2020);
        });
      });

      describe('PacketEventData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient({bigintEnabled: false});
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = Buffer.from(PACKET_EVENT_DATA_BUFFER_2020);
          f1TelemetryClient.handleMessage(buffer);
        });

        it('should parse PacketEventData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith('event', PACKET_EVENT_DATA_PARSED_2020);
        });
      });

      describe('PacketLobbyInfoData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = Buffer.from(PACKET_LOBBY_INFO_DATA_BUFFER_2020);
          f1TelemetryClient.handleMessage(buffer);
        });

        it('should parse PacketLobbyInfoData buffer', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith(
                  'lobbyInfo', PACKET_LOBBY_INFO_DATA_PARSED_2020);
        });
      });

      describe('PacketFinalClassificationData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient();
          spyOn(EventEmitter.prototype, 'emit');
          const buffer =
              Buffer.from(PACKET_FINAL_CLASSIFICATION_DATA_BUFFER_2020);
          f1TelemetryClient.handleMessage(buffer);
        });

        it('should parse PacketFinalClassificationData buffer', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith(
                  'finalClassification',
                  PACKET_FINAL_CLASSIFICATION_DATA_PARSED_2020);
        });
      });
    });
  });

  describe('2021 format', () => {
    describe('parsePacketHeader', () => {
      // tslint:disable-next-line:no-any
      let parsedPacketHeader: Parser.Parsed<any>;

      beforeAll(() => {
        const buffer = Buffer.from(PACKET_HEADER_BUFFER_2021);
        parsedPacketHeader = F1TelemetryClient.parsePacketHeader(buffer, false);
      });

      it('should parse buffer and return parsed packet header', () => {
        expect(parsedPacketHeader).toEqual(PACKET_HEADER_PARSED_2021);
      });
    });

    describe('handleMessage', () => {
      let f1TelemetryClient: F1TelemetryClient;

      describe('PacketSessionData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient({bigintEnabled: false});
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = Buffer.from(PACKET_SESSION_DATA_BUFFER_2021);
          f1TelemetryClient.handleMessage(buffer);
        });

        it('should parse PacketSessionData buffer', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith('session', PACKET_SESSION_DATA_PARSED_2021);
        });
      });

      describe('PacketParticipantsData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient({bigintEnabled: false});
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = Buffer.from(PACKET_PARTICIPANTS_DATA_BUFFER_2021);
          f1TelemetryClient.handleMessage(buffer);
        });

        it('should parse PacketParticipantsData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith(
                  'participants', PACKET_PARTICIPANTS_DATA_PARSED_2021);
        });
      });

      describe('PacketCarTelemetryData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient({bigintEnabled: false});
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = Buffer.from(PACKET_CAR_TELEMETRY_DATA_BUFFER_2021);
          f1TelemetryClient.handleMessage(buffer);
        });

        it('should parse PacketCarTelemetryData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith(
                  'carTelemetry', PACKET_CAR_TELEMETRY_DATA_PARSED_2021);
        });
      });

      describe('PacketCarStatusData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient({bigintEnabled: false});
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = Buffer.from(PACKET_CAR_STATUS_DATA_BUFFER_2021);
          f1TelemetryClient.handleMessage(buffer);
        });

        it('should parse PacketCarStatusData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith(
                  'carStatus', PACKET_CAR_STATUS_DATA_PARSED_2021);
        });
      });

      describe('PacketLapData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient({bigintEnabled: false});
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = Buffer.from(PACKET_LAP_DATA_BUFFER_2021);
          f1TelemetryClient.handleMessage(buffer);
        });

        it('should parse PacketLapData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith('lapData', PACKET_LAP_DATA_PARSED_2021);
        });
      });

      describe('PacketMotionData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient({bigintEnabled: false});
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = Buffer.from(PACKET_MOTION_DATA_BUFFER_2021);
          f1TelemetryClient.handleMessage(buffer);
        });

        it('should parse PacketMotionData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith('motion', PACKET_MOTION_DATA_PARSED_2021);
        });
      });

      describe('PacketCarSetupData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient({bigintEnabled: false});
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = Buffer.from(PACKET_CAR_SETUP_DATA_BUFFER_2021);
          f1TelemetryClient.handleMessage(buffer);
        });

        it('should parse PacketCarSetupData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith(
                  'carSetups', PACKET_CAR_SETUP_DATA_PARSED_2021);
        });
      });

      describe('PacketEventData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient({bigintEnabled: false});
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = Buffer.from(PACKET_EVENT_DATA_BUFFER_2021);
          f1TelemetryClient.handleMessage(buffer);
        });

        it('should parse PacketEventData buffer and emit result', () => {
          expect(EventEmitter.prototype.emit)
              .toHaveBeenCalledWith('event', PACKET_EVENT_DATA_PARSED_2021);
        });
      });

      /*

      // TODO: CAR DAMAGE, LOBBY INFO, FINAL CLASSIFICATION, SESSION HISTORY

      describe('PacketLobbyInfoData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient({bigintEnabled: false});
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = Buffer.from(PACKET_LOBBY_INFO_DATA_BUFFER_2020);
          f1TelemetryClient.handleMessage(buffer);
        });

        it('should parse PacketLobbyInfoData buffer', () => {
          expect(EventEmitter.prototype.emit).toHaveBeenCalledWith(
            'lobbyInfo',
            PACKET_LOBBY_INFO_DATA_PARSED_2020
          );
        });
      });

      describe('PacketFinalClassificationData', () => {
        beforeAll(() => {
          f1TelemetryClient = new F1TelemetryClient({bigintEnabled: false});
          spyOn(EventEmitter.prototype, 'emit');
          const buffer = Buffer.from(
            PACKET_FINAL_CLASSIFICATION_DATA_BUFFER_2021
          );
          f1TelemetryClient.handleMessage(buffer);
        });

        it('should parse PacketFinalClassificationData buffer', () => {
          expect(EventEmitter.prototype.emit).toHaveBeenCalledWith(
            'finalClassification',
            PACKET_FINAL_CLASSIFICATION_DATA_PARSED_2021
          );
        });
      });

      */
    });
  });
});
