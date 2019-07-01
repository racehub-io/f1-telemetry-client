import {Parser} from 'binary-parser';

import {F1Parser} from '../F1Parser';

export class EventDataDetailsParser extends F1Parser {
  constructor() {
    super();

    // nest depends on eventStringCode

    this.endianess('little').nest('FastestLap', {
      type: new F1Parser().uint8('vehicleIdx').float('lapTime'),
    });
    /*
      .nest('Retirement', {
        type: new F1Parser().uint8('vehicleIdx'),
      });
      .nest('TeamMateInPits', {
        type: new F1Parser().uint8('vehicleIdx'),
      });
      .nest('RaceWinner', {
        type: new F1Parser().uint8('vehicleIdx'),
      });
      */
  }
}
