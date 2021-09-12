import {F1Parser} from '../F1Parser';

export class LapHistoryDataParser extends F1Parser {
  constructor() {
    super();
    this.endianess('little')
      .uint32('m_lapTimeInMS')
      .uint16('m_sector1TimeInMS')
      .uint16('m_sector2TimeInMS')
      .uint16('m_sector3TimeInMS')
      .uint8('m_lapValidBitFlags');
  }
}
