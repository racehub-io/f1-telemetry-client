import dgram from "dgram";
import EventEmitter from "events";

import {
  PacketHeader,
  PacketSessionData,
  PacketMotionData,
  PacketLapData,
  PacketEventData,
  PacketParticipantsData,
  PacketCarSetupData,
  PacketCarTelemetryData,
  PacketCarStatusData
} from "./parsers/packets";

import {
  Packets,
  PACKETS,
  DRIVERS,
  TRACKS,
  TEAMS
} from "./constants";

/**
 *
 */
class F1TelemetryClient extends EventEmitter {
  constructor(opts = {}) {
    super(opts);
    const {
      port = 20777
    } = opts;

    this.port = port;
    this.client = dgram.createSocket("udp4");
  }

  /**
   *
   * @param {Buffer} buffer
   */
  static parsePacketHeader(buffer) {
    const ph = new PacketHeader();
    return ph.fromBuffer(buffer);
  }

  /**
   *
   * @param {Number} packetId
   */
  static getParserByPacketId(packetId) {
    const packetType = PACKETS[packetId];

    if (packetType === Packets.SESSION) {
      return PacketSessionData;
    }

    if (packetType === Packets.MOTION) {
      return PacketMotionData;
    }

    if (packetType === Packets.LAP_DATA) {
      return PacketLapData;
    }

    if (packetType === Packets.EVENT) {
      return PacketEventData;
    }

    if (packetType === Packets.PARTICIPANTS) {
      return PacketParticipantsData;
    }

    if (packetType === Packets.CAR_SETUPS) {
      return PacketCarSetupData;
    }

    if (packetType === Packets.CAR_TELEMETRY) {
      return PacketCarTelemetryData;
    }

    if (packetType === Packets.CAR_STATUS) {
      return PacketCarStatusData;
    }

    return null;
  }

  /**
   *
   * @param {Buffer} message
   */
  parseMessage(message) {
    const buffer = Buffer.from(message.buffer);

    const {
      m_packetId
    } = F1TelemetryClient.parsePacketHeader(buffer); // eslint-disable-line
    const Parser = F1TelemetryClient.getParserByPacketId(m_packetId);

    if (Parser !== null) {
      const packetData = new Parser(buffer);
      this.emit(PACKET_TYPES[m_packetId], packetData.data);
    }
  }

  /**
   * Method to start listening for packets
   */
  start() {
    this.client.on("listening", () => {
      const address = this.client.address();
      console.log(`UDP Client listening on ${address.address}:${address.port} 🏎`);
      this.client.setBroadcast(true);
    });

    this.client.on("message", m => this.parseMessage(m));
    this.client.bind(this.port);
  }

  /**
   * Method to close the client
   */
  stop() {
    return this.client.close(() => {
      console.log(`UDP Client closed 🏁`);
    });
  }
}

export {
  F1TelemetryClient,
  Packets,
  DRIVERS,
  TRACKS,
  TEAMS
};