import {Parser} from 'binary-parser';

import {F1Parser} from '../F1Parser';
import {FinalClassificationData} from './types';

export class FinalClassificationDataParser extends F1Parser<FinalClassificationData> {
  constructor(packetFormat: number) {
    super();

    this.uint8('m_position')
      .uint8('m_numLaps')
      .uint8('m_gridPosition')
      .uint8('m_points')
      .uint8('m_numPitStops')
      .uint8('m_resultStatus');

    if (packetFormat >= 2021) {
      this.uint32le('m_bestLapTimeInMS');
    } else {
      this.floatle('m_bestLapTime');
    }

    this.doublele('m_totalRaceTime')
      .uint8('m_penaltiesTime')
      .uint8('m_numPenalties')
      .uint8('m_numTyreStints')
      .array('m_tyreStintsActual', {
        length: 8,
        type: new Parser().uint8(''),
      })
      .array('m_tyreStintsVisual', {
        length: 8,
        type: new Parser().uint8(''),
      });

    if (packetFormat >= 2022) {
      this.array('m_tyreStintsEndLaps', {
        length: 8,
        type: new Parser().uint8(''),
      });
    }
  }
}
