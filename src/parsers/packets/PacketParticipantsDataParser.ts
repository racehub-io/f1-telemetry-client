import {F1Parser} from '../F1Parser';

import {PacketHeaderParser} from './PacketHeaderParser';
import {ParticipantDataParser} from './ParticipantDataParser';
import {PacketParticipantsData} from './types';

export class PacketParticipantsDataParser extends F1Parser {
  data: PacketParticipantsData;

  constructor(buffer: Buffer, packetFormat: number) {
    super();

    if (packetFormat === 2018) {
      this.unpack2018Format();
    } else if (packetFormat === 2019) {
      this.unpack2019Format();
    }

    this.data = this.fromBuffer(buffer);
  }

  unpack2018Format = () => {
    this.endianess('little')
        .nest('m_header', {type: new PacketHeaderParser()})
        .uint8('m_numCars')
        .array('m_participants', {
          length: 20,
          type: new ParticipantDataParser(2018),
        });
  };

  unpack2019Format = () => {
    this.endianess('little')
        .nest('m_header', {type: new PacketHeaderParser()})
        .uint8('m_numActiveCars')
        .array('m_participants', {
          length: 20,
          type: new ParticipantDataParser(2019),
        });
  };
}
