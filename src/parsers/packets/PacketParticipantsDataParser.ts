import {F1Parser} from '../F1Parser';

import {PacketHeaderParser} from './PacketHeaderParser';
import {ParticipantDataParser} from './ParticipantDataParser';
import {PacketParticipantsData} from './types';

export class PacketParticipantsDataParser extends F1Parser {
  data: PacketParticipantsData;

  constructor(buffer: Buffer, packetFormat: number, bigintEnabled: boolean) {
    super();

    (this as any).endianess('little').nest('m_header', {
      type: new PacketHeaderParser(packetFormat, bigintEnabled),
    });

    if (packetFormat === 2018) {
      (this as any).uint8('m_numCars');
    }

    if (packetFormat === 2019 || packetFormat === 2020) {
      (this as any).uint8('m_numActiveCars');
    }

    (this as any).array('m_participants', {
      length: packetFormat === 2020 ? 22 : 20,
      type: new ParticipantDataParser(packetFormat),
    });

    this.data = this.fromBuffer(buffer);
  }
}
