import { F1Parser } from "../F1Parser";
import LapData from "./LapData";
import PacketHeader from "./PacketHeader";

/*
struct PacketLapData
{
    PacketHeader    m_header;              // Header
    LapData         m_lapData[20];         // Lap data for all cars on track
};
*/

export class PacketLapData extends F1Parser {
  data: any;

  constructor(buffer: Buffer) {
    super();
    this.endianess("little")
      .nest("m_header", {
        type: new PacketHeader()
      })
      .array("m_lapData", {
        length: 20,
        type: new LapData()
      });

    this.data = this.fromBuffer(buffer);
  }
}
