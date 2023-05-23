import {F1Parser} from '../F1Parser';
import {ParticipantData} from './types';

export class ParticipantDataParser extends F1Parser<ParticipantData> {
  constructor(packetFormat: number) {
    super();

    this.uint8('m_aiControlled').uint8('m_driverId');

    if (packetFormat >= 2021) {
      this.uint8('m_networkId');
    }

    this.uint8('m_teamId');

    if (packetFormat >= 2021) {
      this.uint8('m_myTeam');
    }

    this.uint8('m_raceNumber').uint8('m_nationality').string('m_name', {
      length: 48,
      stripNull: true,
    });

    if (packetFormat >= 2019) {
      this.uint8('m_yourTelemetry');
    }

    if (packetFormat >= 2023) {
      this.uint8('m_showOnlineNames').uint8('m_platform');
    }
  }
}
