"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const F1Parser_1 = require("../F1Parser");
const CarStatusData_1 = require("./CarStatusData");
const PacketHeader_1 = require("./PacketHeader");
/*
struct PacketCarStatusData
{
  PacketHeader        m_header;            // Header
  CarStatusData       m_carStatusData[20];
};
*/
class PacketCarStatusData extends F1Parser_1.default {
    constructor(buffer) {
        super();
        this.endianess("little")
            .nest("m_header", {
            type: new PacketHeader_1.default()
        })
            .array("m_carSetups", {
            length: 20,
            type: new CarStatusData_1.default()
        });
        this.data = this.fromBuffer(buffer);
    }
}
exports.default = PacketCarStatusData;
//# sourceMappingURL=PacketCarStatusData.js.map