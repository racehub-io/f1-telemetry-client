import {F1Parser} from '../F1Parser';

import {PacketHeader} from './PacketHeader';
import {ParticipantData} from './ParticipantData';

/*
struct PacketParticipantsData
{
    PacketHeader    m_header;            // Header
    uint8           m_numCars;           // Number of cars in the data
    ParticipantData m_participants[20];
};
*/

export class PacketParticipantsData extends F1Parser {
  // tslint:disable-next-line:no-any
  data: any;

  constructor(buffer: Buffer) {
    super();

    this.endianess('little')
        .nest('m_header', {type: new PacketHeader()})
        .uint8('m_numCars')
        .array('m_participants', {length: 20, type: new ParticipantData()});

    this.data = this.fromBuffer(buffer);
  }
}
