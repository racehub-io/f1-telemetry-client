import * as dgram from 'dgram';
import {EventEmitter} from 'events';
import {AddressInfo} from 'net';

import * as constants from './constants';
import * as constantsTypes from './constants/types';
import {
  PacketCarDamageDataParser,
  PacketCarTelemetry2DataParser,
  PacketLapPositionsDataParser,
  PacketTimeTrialDataParser,
  PacketCarSetupDataParser,
  PacketCarStatusDataParser,
  PacketCarTelemetryDataParser,
  PacketEventDataParser,
  PacketFinalClassificationDataParser,
  PacketFormatParser,
  PacketHeaderParser,
  PacketLapDataParser,
  PacketLobbyInfoDataParser,
  PacketMotionDataParser,
  PacketParticipantsDataParser,
  PacketSessionDataParser,
  PacketSessionHistoryDataParser,
} from './parsers/packets';
import * as packetTypes from './parsers/packets/types';
import {
  Address,
  F1TelemetryClientEvents,
  Options,
  ParsedMessage,
} from './types';
import {PacketTyreSetsDataParser} from './parsers/packets/PacketTyreSetsDataParser';
import {PacketMotionExDataParser} from './parsers/packets/PacketMotionExDataParser';
import {PacketHeader} from './parsers/packets/types';

const DEFAULT_PORT = 20777;
const FORWARD_ADDRESSES = undefined;
const BIGINT_ENABLED = true;

/**
 *
 */
class F1TelemetryClient extends EventEmitter {
  address?: string;
  port: number;
  bigintEnabled: boolean;
  skipParsing: boolean;
  forwardAddresses?: Address[];
  socket?: dgram.Socket;

  declare on: <K extends string | symbol>(
    event: K,
    listener: K extends keyof F1TelemetryClientEvents
      ? (...args: F1TelemetryClientEvents[K]) => void
      : Parameters<EventEmitter['on']>[1]
  ) => this;
  declare once: <K extends string | symbol>(
    event: K,
    listener: K extends keyof F1TelemetryClientEvents
      ? (...args: F1TelemetryClientEvents[K]) => void
      : Parameters<EventEmitter['once']>[1]
  ) => this;

  constructor(opts: Options = {}) {
    super();

    const {
      address,
      port = DEFAULT_PORT,
      bigintEnabled = BIGINT_ENABLED,
      forwardAddresses = FORWARD_ADDRESSES,
      skipParsing = false,
    } = opts;

    this.address = address;
    this.port = port;
    this.bigintEnabled = bigintEnabled;
    this.skipParsing = skipParsing;
    this.forwardAddresses = forwardAddresses;
    this.socket = dgram.createSocket('udp4');
  }

  /**
   *
   * @param {Buffer} message
   * @param bigintEnabled
   */
  static parseBufferMessage(
    message: Buffer,
    bigintEnabled = false
  ): ParsedMessage | undefined {
    const {m_packetFormat, m_packetId} = F1TelemetryClient.parsePacketHeader(
      message,
      bigintEnabled
    );

    const parser = F1TelemetryClient.getParserByPacketId(m_packetId);

    if (!parser) {
      return;
    }

    const packetData = new parser(message, m_packetFormat, bigintEnabled);
    const packetID = Object.keys(constants.PACKETS)[m_packetId];

    // emit parsed message
    return {packetData, packetID, message};
  }

  /**
   *
   * @param {Buffer} buffer
   * @param {Boolean} bigintEnabled
   */
  static parsePacketHeader(
    buffer: Buffer,
    bigintEnabled: boolean
    // tslint:disable-next-line:no-any
  ): PacketHeader {
    const packetFormatParser = new PacketFormatParser();
    const {m_packetFormat} = packetFormatParser.fromBuffer(buffer);
    const packetHeaderParser = new PacketHeaderParser(
      m_packetFormat,
      bigintEnabled
    );
    return packetHeaderParser.fromBuffer(buffer);
  }

  /**
   *
   * @param {Number} packetFormat
   * @param {Number} packetId
   */
  static getPacketSize(packetFormat: number, packetId: number) {
    const {PACKET_SIZES} = constants;
    const packetValues = Object.values(PACKET_SIZES);
    return packetValues[packetId][packetFormat];
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

      case PACKETS.carDamage:
        return PacketCarDamageDataParser;

      case PACKETS.sessionHistory:
        return PacketSessionHistoryDataParser;

      case PACKETS.tyreSets:
        return PacketTyreSetsDataParser;

      case PACKETS.motionEx:
        return PacketMotionExDataParser;

      case PACKETS.timeTrial:
        return PacketTimeTrialDataParser;

      case PACKETS.lapPositions:
        return PacketLapPositionsDataParser;

      case PACKETS.carTelemetry2:
        return PacketCarTelemetry2DataParser;

      default:
        return null;
    }
  }

  /**
   *
   * @param {Buffer} message
   */
  handleMessage(message: Buffer, rinfo?: dgram.RemoteInfo) {
    if (this.forwardAddresses) {
      // bridge message
      this.bridgeMessage(message);
    }

    if (this.skipParsing) {
      return;
    }

    let parsedMessage: ParsedMessage | undefined;
    try {
      parsedMessage = F1TelemetryClient.parseBufferMessage(
        message,
        this.bigintEnabled
      );
    } catch (error) {
      this.emit(
        'error',
        error instanceof Error ? error : new Error(String(error)),
        message,
        rinfo
      );
      return;
    }

    if (!parsedMessage || !parsedMessage.packetData) {
      return;
    }

    // emit parsed message
    this.emit(parsedMessage.packetID, parsedMessage.packetData.data, rinfo);
    this.emit('raw', parsedMessage, rinfo);
  }

  /**
   *
   * @param {Buffer} message
   */
  bridgeMessage(message: Buffer) {
    if (!this.socket) {
      throw new Error('Socket is not initialized');
    }
    if (!this.forwardAddresses) {
      throw new Error('No ports to bridge over');
    }
    for (const address of this.forwardAddresses) {
      this.socket.send(
        message,
        0,
        message.length,
        address.port,
        address.ip || '0.0.0.0'
      );
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
        `UDP Client listening on ${address.address}:${address.port} 🏎`
      );
      this.socket.setBroadcast(true);
    });

    this.socket.on('message', (m, rinfo) => this.handleMessage(m, rinfo));
    this.socket.bind({
      address: this.address,
      port: this.port,
      exclusive: false,
    });
  }

  /**
   * Method to close the client
   */
  stop() {
    if (!this.socket) {
      return;
    }

    return this.socket.close(() => {
      console.log('UDP Client closed 🏁');
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
  FORWARD_ADDRESSES,
};

export type {
  F1TelemetryClientEvents,
  Options,
  Address,
  ParsedMessage,
} from './types';
