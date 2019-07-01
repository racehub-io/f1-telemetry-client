import {F1Parser} from '../F1Parser';

export class PacketHeaderParser extends F1Parser {
  constructor(packetFormat: number) {
    super();

    if (packetFormat === 2018) {
      this.unpack2018Format();
    } else if (packetFormat === 2019) {
      this.unpack2019Format();
    }
  }

  unpack2018Format = () => {
    this.endianess('little')
        .uint16('m_packetFormat')
        .uint8('m_packetVersion')
        .uint8('m_packetId')
        // skips 'm_sessionUID'
        .skip(8)
        .floatle('m_sessionTime')
        .uint32('m_frameIdentifier')
        .uint8('m_playerCarIndex');
  };

  unpack2019Format = () => {
    this.endianess('little')
        .uint16('m_packetFormat')
        .uint8('m_gameMajorVersion')
        .uint8('m_gameMinorVersion')
        .uint8('m_packetVersion')
        .uint8('m_packetId')
        // skips 'm_sessionUID'
        .skip(8)
        .floatle('m_sessionTime')
        .uint32('m_frameIdentifier')
        .uint8('m_playerCarIndex');
  };
}
