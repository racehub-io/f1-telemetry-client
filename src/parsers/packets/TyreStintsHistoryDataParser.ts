import {F1Parser} from '../F1Parser';

export class TyreStintsHistoryDataParser extends F1Parser {
  constructor() {
    super();
    this.endianess('little')
      .uint8('m_endLap')
      .uint8('m_tyreActualCompound')
      .uint8('m_tyreVisualCompound');
  }
}
