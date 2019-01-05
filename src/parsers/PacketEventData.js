import F1Parser from './F1Parser';
import {
  Parser
} from 'binary-parser';

/*
struct PacketEventData
{
  PacketHeader    m_header;               // Header  
  uint8           m_eventStringCode[4];   // Event string code, see above
};
*/

// not working?
export default class PacketEventData extends F1Parser {
  constructor(buffer) {
    super();
    this.endianess('little')
      // skips the header
      .skip(21)
      .array('m_eventStringCode', {
        length: 4,
        type: new Parser().uint8()
      })

    this.data = this.fromBuffer(buffer);
  }
}