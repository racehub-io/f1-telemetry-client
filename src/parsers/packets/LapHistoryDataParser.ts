import {F1Parser} from '../F1Parser';
import {LapHistoryData} from './types';

export class LapHistoryDataParser extends F1Parser<LapHistoryData> {
  constructor(packetFormat: number) {
    super();

    this.endianess('little')
      .uint32('m_lapTimeInMS')
      .uint16('m_sector1TimeInMS');

    if (packetFormat >= 2023) {
      this.uint8('m_sector1TimeMinutes');
    }

    this.uint16('m_sector2TimeInMS');

    if (packetFormat >= 2023) {
      this.uint8('m_sector2TimeMinutes');
    }

    this.uint16('m_sector3TimeInMS');

    if (packetFormat >= 2023) {
      this.uint8('m_sector3TimeMinutes');
    }

    this.uint8('m_lapValidBitFlags');
  }
}
