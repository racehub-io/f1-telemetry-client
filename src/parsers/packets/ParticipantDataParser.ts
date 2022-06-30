import {F1Parser} from '../F1Parser';

export class ParticipantDataParser extends F1Parser {
  constructor(packetFormat: number) {
    super();

    if (packetFormat === 2022) {
      this.uint8('m_yourTelemetry')
          .uint8('m_aiControlled')
          .uint8('m_driverId')
          .uint8('m_myTeam')
          .uint8('m_teamId')
          .uint8('m_networkId')
          .uint8('m_raceNumber')
          .uint8('m_nationality')
          .string('m_name', {
            length: 48,
            stripNull: true,
          });
    } else {
      this.uint8('m_aiControlled').uint8('m_driverId');

      if (packetFormat === 2021) {
        this.uint8('m_networkId');
      }

      this.uint8('m_teamId');

      if (packetFormat === 2021) {
        this.uint8('m_myTeam');
      }

      this.uint8('m_raceNumber').uint8('m_nationality').string('m_name', {
        length: 48,
        stripNull: true
      });

      if (packetFormat === 2019 || packetFormat === 2020 ||
          packetFormat === 2021) {
        this.uint8('m_yourTelemetry');
      }
    }
  }
}
