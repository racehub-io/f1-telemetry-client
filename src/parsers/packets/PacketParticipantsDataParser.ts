import {F1Parser} from '../F1Parser';

import {PacketHeaderParser} from './PacketHeaderParser';
import {ParticipantDataParser} from './ParticipantDataParser';

export class PacketParticipantsDataParser extends F1Parser {
  // tslint:disable-next-line:no-any
  data: any;

  constructor(buffer: Buffer) {
    super();

    this.endianess('little')
        .nest('m_header', {type: new PacketHeaderParser()})
        .uint8('m_numCars')
        .array(
            'm_participants', {length: 20, type: new ParticipantDataParser()});

    this.data = this.fromBuffer(buffer);
  }
}
