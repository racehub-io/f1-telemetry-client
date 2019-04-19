import {Parser} from 'binary-parser';
import * as EventEmitter from 'events';

import {DEFAULT_PORT, F1TelemetryClient} from './index';
import * as packetCarStatusDataBuffer from './mocks/PacketCarStatusDataBuffer.json';
import * as packetCarStatusDataParsed from './mocks/PacketCarStatusDataParsed.json';
import * as packetCarTelemetryBuffer from './mocks/PacketCarTelemetryDataBuffer.json';
import * as packetCarTelemetryParsed from './mocks/PacketCarTelemetryDataParsed.json';
import * as packetHeaderBuffer from './mocks/PacketHeaderBuffer.json';
import * as packetHeaderParsed from './mocks/PacketHeaderParsed.json';
import * as packetLapDataBuffer from './mocks/PacketLapDataBuffer.json';
import * as packetLapDataParsed from './mocks/PacketLapDataParsed.json';
import * as packetMotionDataBuffer from './mocks/PacketMotionDataBuffer.json';
import * as packetMotionDataParsed from './mocks/PacketMotionDataParsed.json';

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

    describe('PacketCarTelemetryData', () => {
      beforeAll(() => {
        f1TelemetryClient = new F1TelemetryClient();
        spyOn(EventEmitter.prototype, 'emit');
        const buffer = new Buffer(packetCarTelemetryBuffer.data);
        f1TelemetryClient.parseMessage(buffer);
      });

      it('should parse PacketCarTelemetryData package', () => {
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

      it('should parse PacketCarStatusData package', () => {
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

      it('should parse PacketLapData package', () => {
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

      it('should parse PacketMotionData package', () => {
        expect(EventEmitter.prototype.emit)
            .toHaveBeenCalledWith('motion', packetMotionDataParsed);
      });
    });
  });
});
