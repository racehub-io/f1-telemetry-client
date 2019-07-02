import {Parser} from 'binary-parser';

import {F1Parser} from '../F1Parser';

export class PacketHeaderParser extends F1Parser {
  constructor() {
    super();

    const parserFor2018 = new Parser()
                              .uint8('m_packetVersion')
                              .uint8('m_packetId')
                              .skip(8)  // skips 'm_sessionUID'
                              .floatle('m_sessionTime')
                              .uint32('m_frameIdentifier')
                              .uint8('m_playerCarIndex');

    const parserFor2019 = new Parser()
                              .uint8('m_gameMajorVersion')
                              .uint8('m_gameMinorVersion')
                              .uint8('m_packetVersion')
                              .uint8('m_packetId')
                              .skip(8)  // skips 'm_sessionUID'
                              .floatle('m_sessionTime')
                              .uint32('m_frameIdentifier')
                              .uint8('m_playerCarIndex');

    this.endianess('little').uint16('m_packetFormat').choice('', {
      tag: 'm_packetFormat',
      choices: {
        2018: parserFor2018,
        2019: parserFor2019,
      },
    });
  }
}
