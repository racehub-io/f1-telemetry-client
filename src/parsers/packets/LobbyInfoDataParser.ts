import {F1Parser} from '../F1Parser';

export class LobbyInfoDataParser extends F1Parser {
  constructor(packetFormat: number) {
    super();
    this.uint8('m_aiControlled')
        .uint8('m_teamId')
        .uint8('m_nationality')
        .string('m_name', {length: 48, stripNull: true});

    if (packetFormat === 2021 || packetFormat === 2022) {
      this.uint8('m_carNumber');
    }

    this.uint8('m_readyStatus');
  }
}
