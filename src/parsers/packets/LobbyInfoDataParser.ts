import {F1Parser} from '../F1Parser';
import {LobbyInfoData} from './types';

export class LobbyInfoDataParser extends F1Parser<LobbyInfoData> {
  constructor(packetFormat: number) {
    super();
    this.uint8('m_aiControlled');
    if (packetFormat >= 2026) {
      this.uint16le('m_teamId');
    } else {
      this.uint8('m_teamId');
    }
    this.uint8('m_nationality');

    if (packetFormat >= 2023) {
      this.uint8('m_platform');
    }

    this.string('m_name', {
      length: packetFormat >= 2025 ? 32 : 48,
      stripNull: true,
    });

    if (packetFormat >= 2021) {
      this.uint8('m_carNumber');
    }

    if (packetFormat >= 2024) {
      this.uint8('m_yourTelemetry')
        .uint8('m_showOnlineNames')
        .uint16le('m_techLevel');
    }

    this.uint8('m_readyStatus');
  }
}
