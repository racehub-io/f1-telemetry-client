import {F1Parser} from '../F1Parser';

export class ParticipantDataParser extends F1Parser {
  constructor(packetFormat: number) {
    super();

    if (packetFormat === 2018) {
      this.unpack2018Format();
    } else if (packetFormat === 2019) {
      this.unpack2019Format();
    }
  }

  unpack2018Format = () => {
    this.uint8('m_aiControlled')
        .uint8('m_driverId')
        .uint8('m_teamId')
        .uint8('m_raceNumber')
        .uint8('m_nationality')
        .string('m_name', {length: 48, stripNull: true});
  };

  unpack2019Format = () => {
    this.uint8('m_aiControlled')
        .uint8('m_driverId')
        .uint8('m_teamId')
        .uint8('m_raceNumber')
        .uint8('m_nationality')
        .string('m_name', {length: 48, stripNull: true})
        .uint8('m_yourTelemetry');
  };
}
