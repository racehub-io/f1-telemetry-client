import F1Parser from '../F1Parser';

/*
struct PacketEventData
{
  PacketHeader    m_header;               // Header  
  uint8           m_eventStringCode[4];   // Event string code, see above
};
*/

export default class PacketEventData extends F1Parser {
  constructor(buffer) {
    super();
    this.endianess('little')
      // skips the header
      .skip(21)
      .string('m_eventStringCode', {
        length: 4
      })

    this.data = this.fromBuffer(buffer);
  }
}