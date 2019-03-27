"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const F1Parser_1 = require("../F1Parser");
const LapData_1 = require("./LapData");
const PacketHeader_1 = require("./PacketHeader");
/*
struct PacketLapData
{
    PacketHeader    m_header;              // Header
    LapData         m_lapData[20];         // Lap data for all cars on track
};
*/
class PacketLapData extends F1Parser_1.default {
    constructor(buffer) {
        super();
        this.endianess("little")
            .nest("m_header", {
            type: new PacketHeader_1.default()
        })
            .array("m_lapData", {
            length: 20,
            type: new LapData_1.default()
        });
        this.data = this.fromBuffer(buffer);
    }
}
exports.default = PacketLapData;
//# sourceMappingURL=PacketLapData.js.map