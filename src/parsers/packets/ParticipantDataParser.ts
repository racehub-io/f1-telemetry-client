import {F1Parser} from '../F1Parser';

export class ParticipantDataParser extends F1Parser {
  constructor(packetFormat: number) {
    super();

    this.uint8('m_aiControlled')
        .uint8('m_driverId')
        .uint8('m_teamId')
        .uint8('m_raceNumber')
        .uint8('m_nationality')
        .string('m_name', {length: 48, stripNull: true});

    if (packetFormat === 2019) {
      this.uint8('m_yourTelemetry');
    }
  }
}
