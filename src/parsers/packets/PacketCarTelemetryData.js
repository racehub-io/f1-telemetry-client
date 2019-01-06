import F1Parser from "../F1Parser";
import CarTelemetryData from "./CarTelemetryData";

/*
struct PacketCarTelemetryData
{
  PacketHeader        m_header;                // Header
  CarTelemetryData    m_carTelemetryData[20];
  uint32              m_buttonStatus;          // Bit flags specifying which buttons are being
                                               // pressed currently - see appendices
};
*/

export default class PacketCarTelemetryData extends F1Parser {
  constructor(buffer) {
    super();
    this.endianess("little")
      // skips the header
      .skip(21)
      .array("m_carTelemetryData", {
        length: 20,
        type: new CarTelemetryData()
      })
      .uint32le('m_buttonStatus')

    this.data = this.fromBuffer(buffer);
  }
}