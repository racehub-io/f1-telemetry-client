import {Parser} from 'binary-parser';

import {F1Parser} from '../F1Parser';
import {ParticipantData} from './types';

export class ParticipantDataParser extends F1Parser<ParticipantData> {
  constructor(packetFormat: number) {
    super();

    this.uint8('m_aiControlled');
    if (packetFormat >= 2026) {
      this.uint16le('m_driverId');
    } else {
      this.uint8('m_driverId');
    }

    if (packetFormat >= 2021) {
      if (packetFormat >= 2026) {
        this.uint16le('m_networkId');
      } else {
        this.uint8('m_networkId');
      }
    }

    if (packetFormat >= 2026) {
      this.uint16le('m_teamId');
    } else {
      this.uint8('m_teamId');
    }

    if (packetFormat >= 2021) {
      this.uint8('m_myTeam');
    }

    this.uint8('m_raceNumber')
      .uint8('m_nationality')
      .string('m_name', {
        length: packetFormat >= 2025 ? 32 : 48,
        stripNull: true,
      });

    if (packetFormat >= 2019) {
      this.uint8('m_yourTelemetry');
    }

    if (packetFormat >= 2023) this.uint8('m_showOnlineNames');
    if (packetFormat >= 2024) this.uint16le('m_techLevel');
    if (packetFormat >= 2023) this.uint8('m_platform');
    if (packetFormat >= 2025) {
      this.uint8('m_numColours').array('m_liveryColours', {
        length: 4,
        type: new Parser().uint8('red').uint8('green').uint8('blue'),
      });
    }
  }
}
