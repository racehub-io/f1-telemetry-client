import {F1Parser} from '../F1Parser';

export class LapHistoryDataParser extends F1Parser {
  constructor() {
    super();
    this.uint32le('m_lapTimeInMS')
        .uint16le('m_sector1TimeInMS')
        .uint16le('m_sector2TimeInMS')
        .uint16le('m_sector3TimeInMS')
        .uint8('m_lapValidBitFlags');
  }
}
