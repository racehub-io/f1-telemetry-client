// tslint:disable-next-line
import base64Encoder from 'base64-arraybuffer';
import {Parser} from 'binary-parser';
import * as dgram from 'dgram';
import {EventEmitter} from 'events';
import {AddressInfo} from 'net';

import * as constants from './constants';
import * as constantsTypes from './constants/types';
import {PacketCarSetupDataParser, PacketCarStatusDataParser, PacketCarTelemetryDataParser, PacketEventDataParser, PacketFinalClassificationDataParser, PacketFormatParser, PacketHeaderParser, PacketLapDataParser, PacketLobbyInfoDataParser, PacketMotionDataParser, PacketParticipantsDataParser, PacketSessionDataParser,} from './parsers/packets';
import * as packetTypes from './parsers/packets/types';
import {Options, ParsedMessage} from './types';

const DEFAULT_PORT = 20777;
const DEFAULT_FORWARD_PORT = undefined;
const BIGINT_ENABLED = true;
const PARSER_ENABLED = true;

/**
 *
 */
class F1TelemetryClient extends EventEmitter {
  port: number;
  forwardPort?: number;
  bigintEnabled: boolean;
  parserEnabled: boolean;
  socket?: dgram.Socket;

  constructor(opts: Options = {}) {
    super();

    const {
      port = DEFAULT_PORT,
      forwardPort = DEFAULT_FORWARD_PORT,
      bigintEnabled = BIGINT_ENABLED,
      parserEnabled = PARSER_ENABLED,
    } = opts;

    this.port = port;
    this.forwardPort = forwardPort;
    this.bigintEnabled = bigintEnabled;
    this.parserEnabled = parserEnabled;
    this.socket = dgram.createSocket('udp4');
  }

  /**
   *
   * @param {Buffer} buffer
   * @param {Boolean} bigIntEnabled
   */
  static parsePacketHeader(
      buffer: Buffer, bigintEnabled: boolean
      // tslint:disable-next-line:no-any
      ): Parser.Parsed<any> {
    const packetFormatParser = new PacketFormatParser();
    const {m_packetFormat} = packetFormatParser.fromBuffer(buffer);
    const packetHeaderParser =
        new PacketHeaderParser(m_packetFormat, bigintEnabled);
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

      case PACKETS.finalClassification:
        return PacketFinalClassificationDataParser;

      case PACKETS.lobbyInfo:
        return PacketLobbyInfoDataParser;

      default:
        return null;
    }
  }

  /**
   *
   * @param {Buffer} message
   */
  handleMessage(message: Buffer) {
    if (this.socket && this.forwardPort) {
      // forward message to port
      this.socket.send(message, 0, message.length, this.forwardPort, '0.0.0.0');
    }

    if (!this.parserEnabled) {
      // bridge message
      this.bridgeMessage(message);
      return;
    }

    const parsedMessage = this.parseBufferMessage(message);

    if (!parsedMessage || !parsedMessage.packetData) {
      return;
    }

    // emit parsed message
    this.emit(parsedMessage.packetID, parsedMessage.packetData.data);
  }

  /**
   *
   * @param {Buffer} message
   */
  parseBufferMessage(message: Buffer): ParsedMessage|undefined {
    const {m_packetFormat, m_packetId} =
        F1TelemetryClient.parsePacketHeader(message, this.bigintEnabled);

    const parser = F1TelemetryClient.getParserByPacketId(m_packetId);

    if (!parser) {
      return;
    }

    const packetData = new parser(message, m_packetFormat, this.bigintEnabled);
    const packetID = Object.keys(constants.PACKETS)[m_packetId];

    // emit parsed message
    return {packetData, packetID};
  }

  /**
   *
   * @param {string} message
   */
  parseStringMessage(message: string): ParsedMessage|undefined {
    const decodedMessage = base64Encoder.decode(message);
    return this.parseBufferMessage(Buffer.from(decodedMessage));
  }

  /**
   *
   * @param {Buffer} message
   */
  bridgeMessage(message: Buffer) {
    // TODO: compare performance of .encode against .toString('base64')
    //       maybe use this.socket.send instead?
    this.emit(base64Encoder.encode(message));
  }

  /**
   * Method to start listening for packets
   */
  start() {
    if (!this.socket) {
      return;
    }

    this.socket.on('listening', () => {
      if (!this.socket) {
        return;
      }

      const address = this.socket.address() as AddressInfo;
      console.log(
          `UDP Client listening on ${address.address}:${address.port} 🏎`);
      this.socket.setBroadcast(true);
    });

    this.socket.on('message', (m) => this.handleMessage(m));
    this.socket.bind(this.port);
  }

  /**
   * Method to close the client
   */
  stop() {
    if (!this.socket) {
      return;
    }

    return this.socket.close(() => {
      console.log(`UDP Client closed 🏁`);
      this.socket = undefined;
    });
  }
}

export {
  F1TelemetryClient,
  constants,
  constantsTypes,
  packetTypes,
  DEFAULT_PORT,
  DEFAULT_FORWARD_PORT,
  BIGINT_ENABLED,
  PARSER_ENABLED,
};
