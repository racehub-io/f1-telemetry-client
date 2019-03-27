import { F1Parser } from "../F1Parser";
import { CarSetupData } from "./CarSetupData";
import { PacketHeader } from "./PacketHeader";

/*
struct PacketCarSetupData
{
  PacketHeader    m_header;            // Header
  CarSetupData    m_carSetups[20];
};
*/

export class PacketCarSetupData extends F1Parser {
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
        type: new CarSetupData()
      });

    this.data = this.fromBuffer(buffer);
  }
}
