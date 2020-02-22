// tslint:disable-next-line
import {Parser} from 'binary-parser';
import * as dgram from 'dgram';
import {EventEmitter} from 'events';
import {AddressInfo} from 'net';

import * as constants from './constants';
import * as constantsTypes from './constants/types';
import {PacketCarSetupDataParser, PacketCarStatusDataParser, PacketCarTelemetryDataParser, PacketEventDataParser, PacketFormatParser, PacketHeaderParser, PacketLapDataParser, PacketMotionDataParser, PacketParticipantsDataParser, PacketSessionDataParser,} from './parsers/packets';
import * as packetTypes from './parsers/packets/types';
import {Options} from './types';

const DEFAULT_PORT = 20777;

/**
 *
 */
class F1TelemetryClient extends EventEmitter {
  port: number;
  client?: dgram.Socket;

  constructor(opts: Options = {}) {
    super();

    const {port = DEFAULT_PORT} = opts;

    this.port = port;
    this.client = dgram.createSocket('udp4');
  }

  /**
   *
   * @param {Buffer} buffer
   */
  // tslint:disable-next-line:no-any
  static parsePacketHeader(buffer: Buffer): Parser.Parsed<any> {
    const packetFormatParser = new PacketFormatParser();
    const {m_packetFormat} = packetFormatParser.fromBuffer(buffer);
    const packetHeaderParser = new PacketHeaderParser(m_packetFormat);
    return packetHeaderParser.fromBuffer(buffer);
  }

  /**
   *
   * @param {Number} packetId
   */
  static getParserByPacketId(packetId: number) {
    const {PACKETS} = constants;

    const packetKeys = Object.keys(PACKETS);
    const packetType = packetKeys[packetId];

    switch (packetType) {
      case PACKETS.session:
        return PacketSessionDataParser;

      case PACKETS.motion:
        return PacketMotionDataParser;

      case PACKETS.lapData:
        return PacketLapDataParser;

      case PACKETS.event:
        return PacketEventDataParser;

      case PACKETS.participants:
        return PacketParticipantsDataParser;

      case PACKETS.carSetups:
        return PacketCarSetupDataParser;

      case PACKETS.carTelemetry:
        return PacketCarTelemetryDataParser;

      case PACKETS.carStatus:
        return PacketCarStatusDataParser;

      default:
        return null;
    }
  }

  /**
   *
   * @param {Buffer} message
   */
  parseMessage(message: Buffer) {
    const {m_packetFormat, m_packetId} =
        F1TelemetryClient.parsePacketHeader(message);

    const parser = F1TelemetryClient.getParserByPacketId(m_packetId);

    if (!parser) {
      return;
    }

    const packetData = new parser(message, m_packetFormat);
    const packetKeys = Object.keys(constants.PACKETS);

    this.emit(packetKeys[m_packetId], packetData.data);
  }

  /**
   * Method to start listening for packets
   */
  start() {
    if (!this.client) {
      return;
    }

    this.client.on('listening', () => {
      if (!this.client) {
        return;
      }

      const address = this.client.address() as AddressInfo;
      console.log(
          `UDP Client listening on ${address.address}:${address.port} 🏎`);
      this.client.setBroadcast(true);
    });

    this.client.on('message', m => this.parseMessage(m));
    this.client.bind(this.port);
  }

  /**
   * Method to close the client
   */
  stop() {
    if (!this.client) {
      return;
    }

    return this.client.close(() => {
      console.log(`UDP Client closed 🏁`);
      this.client = undefined;
    });
  }
}

export {
  F1TelemetryClient,
  constants,
  constantsTypes,
  packetTypes,
  DEFAULT_PORT,
};
