import dgram from 'dgram';
import EventEmitter from 'events';
import PacketHeader from './parsers/PacketHeader';
import PacketSessionData from './parsers/PacketSessionData';
import PacketMotionData from './parsers/PacketMotionData';
import { 
  MOTION,
  SESSION,
  LAP_DATA,
  EVENT,
  PARTICIPENTS,
  CAR_SETUPS,
  CAR_TELEMETRY,
  CAR_STATUS,
  PACKET_TYPES
} from './constants/packetTypes';

/**
 *
 */
class F12018UDP extends EventEmitter {
  constructor(opts = {}) {
    super(opts);
    const {
      port = 20777,
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
    if(packetId === SESSION) {
      return PacketSessionData;
    } else if (packetId === MOTION) {
      return PacketMotionData;
    } else if (packetId === LAP_DATA) {
      return null;
    } else if (packetId === EVENT) {
      return null;
    } else if (packetId === PARTICIPENTS) {
      return null;
    } else if (packetId === CAR_SETUPS) {
      return null;
    } else if (packetId === CAR_TELEMETRY) {
      return null;
    } else if (packetId === CAR_STATUS) {
      return null;
    }

    return null;
  }

  /**
   * 
   * @param {Buffer} message 
   */
  parseMessage(message) {
    const buffer = Buffer.from(message.buffer);

    const { m_packetId } = F12018UDP.parsePacketHeader(buffer);
    const Parser = F12018UDP.getParserByPacketId(m_packetId);

    if (Parser !== null) {
      const emitData = {
        type: PACKET_TYPES[m_packetId],
        data: {},
      };

      const packetData = new Parser(buffer);
      emitData.data = packetData.data;
      this.emit('data', emitData);
    }
  }

  /**
   * Method to start listening for packets
   */
  start() {
    this.client.on('listening', () => {
      const address = this.client.address();
      console.log('UDP Client listening on ' + address.address + ":" + address.port);
      this.client.setBroadcast(true);
    });

    this.client.on('message', (m) => this.parseMessage(m));
    this.client.bind(this.port);
  }

  /**
   * Method to close the client
   */
  stop() {
    return this.client.close();
  }
}

export default F12018UDP;
