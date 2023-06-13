import {F1Parser} from '../F1Parser';
import {PacketHeader} from './types';

export class PacketHeaderParser extends F1Parser<PacketHeader> {
  constructor(packetFormat: number, bigintEnabled: boolean) {
    super();

    this.endianess('little').uint16le('m_packetFormat');

    if (packetFormat >= 2023) {
      this.uint8('m_gameYear');
    }

    if (packetFormat >= 2019) {
      this.uint8('m_gameMajorVersion').uint8('m_gameMinorVersion');
    }

    if (packetFormat >= 2018) {
      this.uint8('m_packetVersion').uint8('m_packetId');
    }

    if (bigintEnabled) {
      this.uint64('m_sessionUID');
    } else {
      this.skip(8);
    }

    this.floatle('m_sessionTime').uint32('m_frameIdentifier');

    if (packetFormat >= 2023) {
      this.uint32('m_overallFrameIdentifier');
    }

    this.uint8('m_playerCarIndex');

    if (packetFormat >= 2020) {
      this.uint8('m_secondaryPlayerCarIndex');
    }
  }
}
