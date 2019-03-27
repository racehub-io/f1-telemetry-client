import { F1Parser } from "../F1Parser";
import CarTelemetryData from "./CarTelemetryData";
import PacketHeader from "./PacketHeader";

/*
struct PacketCarTelemetryData
{
  PacketHeader        m_header;                // Header
  CarTelemetryData    m_carTelemetryData[20];
  uint32              m_buttonStatus;          // Bit flags specifying which buttons are being
                                               // pressed currently - see appendices
};
*/

export class PacketCarTelemetryData extends F1Parser {
  data: any;

  constructor(buffer: Buffer) {
    super();
    this.endianess("little")
      .nest("m_header", {
        type: new PacketHeader()
      })
      .array("m_carTelemetryData", {
        length: 20,
        type: new CarTelemetryData()
      })
      .uint32le("m_buttonStatus");

    this.data = this.fromBuffer(buffer);
  }
}
