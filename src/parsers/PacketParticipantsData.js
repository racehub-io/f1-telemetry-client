import F1Parser from './F1Parser';
import ParticipantData from './ParticipantData';

/*
struct PacketParticipantsData
{
    PacketHeader    m_header;            // Header
    uint8           m_numCars;           // Number of cars in the data
    ParticipantData m_participants[20];
};
*/

export default class PacketParticipantsData extends F1Parser {
  constructor(buffer) {
    super(buffer);
    this.endianess('little')
      // skips the header
      .skip(21)
      .uint8('m_numCars')
      .array('m_participants', {
        length: 20,
        type: new ParticipantData()
      })

    this.data = this.fromBuffer(buffer);
  }
}