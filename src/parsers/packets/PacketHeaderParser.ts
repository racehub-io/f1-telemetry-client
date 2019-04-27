import {F1Parser} from '../F1Parser';

export class PacketHeaderParser extends F1Parser {
  constructor() {
    super();
    this.endianess('little')
        .uint16('m_packetFormat')
        .uint8('m_packetVersion')
        .uint8('m_packetId')
        // skips 'm_sessionUID'
        .skip(8)
        //.buffer('m_sessionUID', {
        //  length: 8,
        //  clone: true,
        //  formatter: buf => buf.toString('ascii'),
        //})
        .floatle('m_sessionTime')
        .uint32('m_frameIdentifier')
        .uint8('m_playerCarIndex');
  }
}
