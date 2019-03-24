import F1Parser from "../F1Parser";
import PacketHeader from "./PacketHeader";

/*
struct PacketEventData
{
  PacketHeader    m_header;               // Header  
  uint8           m_eventStringCode[4];   // Event string code, see above
};
*/

export default class PacketEventData extends F1Parser {
  data: any;

  constructor(buffer: Buffer) {
    super();
    this.endianess("little")
      .nest("m_header", {
        type: new PacketHeader()
      })
      .string("m_eventStringCode", {
        length: 4
      });

    this.data = this.fromBuffer(buffer);
  }
}
