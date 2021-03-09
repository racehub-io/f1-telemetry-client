import {F1Parser} from '../F1Parser';

export class PacketHeaderParser extends F1Parser {
  constructor(packetFormat: number, bigintEnabled: boolean) {
    super();

    (this as any).endianess('little').uint16('m_packetFormat');

    if (packetFormat === 2018) {
      (this as any).uint8('m_packetVersion').uint8('m_packetId');
    }

    if (packetFormat === 2019 || packetFormat === 2020) {
      (this as any)
        .uint8('m_gameMajorVersion')
        .uint8('m_gameMinorVersion')
        .uint8('m_packetVersion')
        .uint8('m_packetId');
    }

    if (bigintEnabled) {
      (this as any).uint64('m_sessionUID');
    } else {
      (this as any).skip(8);
    }

    (this as any)
      .floatle('m_sessionTime')
      .uint32('m_frameIdentifier')
      .uint8('m_playerCarIndex');

    if (packetFormat === 2020) {
      (this as any).uint8('m_secondaryPlayerCarIndex');
    }

    (this as any).saveOffset('offset');
  }
}
