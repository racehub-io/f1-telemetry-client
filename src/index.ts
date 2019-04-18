// tslint:disable-next-line
import {Parser} from 'binary-parser';
import * as dgram from 'dgram';
import * as EventEmitter from 'events';
import {AddressInfo} from 'net';

import * as constants from './constants';
import * as constantsTypes from './constants/types';
import {
  PacketCarSetupData,
  PacketCarStatusData,
  PacketCarTelemetryData,
  PacketEventData,
  PacketHeader,
  PacketLapData,
  PacketMotionData,
  PacketParticipantsData,
  PacketSessionData,
} from './parsers/packets';
import {Options} from './types';

/**
 *
 */
class F1TelemetryClient extends EventEmitter {
  port: number;
  client?: dgram.Socket;

  constructor(opts: Options = {}) {
    super();

    const {port = 20777} = opts;

    this.port = port;
    this.client = dgram.createSocket('udp4');
  }

  /**
   *
   * @param {Buffer} buffer
   */
  // tslint:disable-next-line:no-any
  static parsePacketHeader(buffer: Buffer): Parser.Parsed<any> {
    const ph = new PacketHeader();
    return ph.fromBuffer(buffer);
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
        return PacketSessionData;

      case PACKETS.motion:
        return PacketMotionData;

      case PACKETS.lapData:
        return PacketLapData;

      case PACKETS.event:
        return PacketEventData;

      case PACKETS.participants:
        return PacketParticipantsData;

      case PACKETS.carSetups:
        return PacketCarSetupData;

      case PACKETS.carTelemetry:
        return PacketCarTelemetryData;

      case PACKETS.carStatus:
        return PacketCarStatusData;

      default:
        return null;
    }
  }

  /**
   *
   * @param {Buffer} message
   */
  parseMessage(message: Buffer) {
    const buffer = Buffer.from(message.buffer);

    const {m_packetId} = F1TelemetryClient.parsePacketHeader(buffer); // eslint-disable-line
    const parser = F1TelemetryClient.getParserByPacketId(m_packetId);

    if (parser !== null) {
      const packetData = new parser(buffer);
      const packetKeys = Object.keys(constants.PACKETS);
      this.emit(packetKeys[m_packetId], packetData.data);
    }
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
        `UDP Client listening on ${address.address}:${address.port} 🏎`
      );
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

export {F1TelemetryClient, constants, constantsTypes};
