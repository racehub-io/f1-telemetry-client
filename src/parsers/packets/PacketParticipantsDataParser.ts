import {F1Parser} from '../F1Parser';

import {PacketHeaderParser} from './PacketHeaderParser';
import {ParticipantDataParser} from './ParticipantDataParser';
import {PacketParticipantsData} from './types';

export class PacketParticipantsDataParser extends F1Parser {
  data: PacketParticipantsData;

  constructor(buffer: Buffer, packetFormat: number) {
    super();

    this.endianess('little')
        .nest('m_header', {type: new PacketHeaderParser()})
        .uint8('m_numCars')
        .array(
            'm_participants', {length: 20, type: new ParticipantDataParser()});

    this.data = this.fromBuffer(buffer);
  }
}
