"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const F1Parser_1 = require("../F1Parser");
const CarTelemetryData_1 = require("./CarTelemetryData");
const PacketHeader_1 = require("./PacketHeader");
/*
struct PacketCarTelemetryData
{
  PacketHeader        m_header;                // Header
  CarTelemetryData    m_carTelemetryData[20];
  uint32              m_buttonStatus;          // Bit flags specifying which buttons are being
                                               // pressed currently - see appendices
};
*/
class PacketCarTelemetryData extends F1Parser_1.default {
    constructor(buffer) {
        super();
        this.endianess("little")
            .nest("m_header", {
            type: new PacketHeader_1.default()
        })
            .array("m_carTelemetryData", {
            length: 20,
            type: new CarTelemetryData_1.default()
        })
            .uint32le("m_buttonStatus");
        this.data = this.fromBuffer(buffer);
    }
}
exports.default = PacketCarTelemetryData;
//# sourceMappingURL=PacketCarTelemetryData.js.map