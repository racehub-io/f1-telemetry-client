import {F1Parser} from '../F1Parser';

export class TyreStintHistoryDataParser extends F1Parser {
  constructor() {
    super();
    this.uint8('m_endLap')
        .uint8('m_tyreActualCompound')
        .uint8('m_tyreVisualCompound');
  }
}
