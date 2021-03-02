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
const FORWARD_PORTS = undefined;
const SKIP_PARSING = false;
const BIGINT_ENABLED = true;

/**
 *
 */
class F1TelemetryClient extends EventEmitter {
  port: number;
  bigintEnabled: boolean;
  skipParsing?: boolean;
  forwardPorts?: number[];
  socket?: dgram.Socket;

  constructor(opts: Options = {}) {
    super();

    const {
      port = DEFAULT_PORT,
      bigintEnabled = BIGINT_ENABLED,
      skipParsing = SKIP_PARSING,
      forwardPorts = FORWARD_PORTS,
    } = opts;

    this.port = port;
    this.bigintEnabled = bigintEnabled;
    this.forwardPorts = forwardPorts;
    this.skipParsing = skipParsing;
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
    if (this.forwardPorts) {
      // bridge message
      this.bridgeMessage(message);
    }

    if (this.skipParsing) {
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
    if (!this.socket) {
      throw new Error('Socket is not initialized');
    }
    if (!this.forwardPorts) {
      throw new Error('No ports to bridge over');
    }
    for (const port of this.forwardPorts) {
      this.socket.send(message, 0, message.length, port, '0.0.0.0');
    }
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
  BIGINT_ENABLED,
  FORWARD_PORTS,
};
