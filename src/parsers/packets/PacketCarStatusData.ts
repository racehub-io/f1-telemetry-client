import { F1Parser } from "../F1Parser";
import { CarStatusData } from "./CarStatusData";
import { PacketHeader } from "./PacketHeader";

/*
struct PacketCarStatusData
{
  PacketHeader        m_header;            // Header
  CarStatusData       m_carStatusData[20];
};
*/

export class PacketCarStatusData extends F1Parser {
  // tslint:disable-next-line:no-any
  data: any;

  constructor(buffer: Buffer) {
    super();
    this.endianess("little")
      .nest("m_header", {
        type: new PacketHeader()
      })
      .array("m_carSetups", {
        length: 20,
        type: new CarStatusData()
      });

    this.data = this.fromBuffer(buffer);
  }
}
