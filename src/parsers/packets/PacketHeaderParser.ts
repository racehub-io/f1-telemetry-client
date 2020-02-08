import {F1Parser} from '../F1Parser';

export class PacketHeaderParser extends F1Parser {
  constructor(packetFormat: number) {
    super();

    this.endianess('little').uint16('m_packetFormat');

    if (packetFormat === 2018) {
      this.uint8('m_packetVersion').uint8('m_packetId');
    } else if (packetFormat === 2019) {
      this.uint8('m_gameMajorVersion')
          .uint8('m_gameMinorVersion')
          .uint8('m_packetVersion')
          .uint8('m_packetId')
          .uint64('m_sessionID');
    }

    this.floatle('m_sessionTime')
        .uint32('m_frameIdentifier')
        .uint8('m_playerCarIndex');
  }
}
