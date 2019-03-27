"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const F1Parser_1 = require("../F1Parser");
const CarSetupData_1 = require("./CarSetupData");
const PacketHeader_1 = require("./PacketHeader");
/*
struct PacketCarSetupData
{
  PacketHeader    m_header;            // Header
  CarSetupData    m_carSetups[20];
};
*/
class PacketCarSetupData extends F1Parser_1.default {
    constructor(buffer) {
        super();
        this.endianess("little")
            .nest("m_header", {
            type: new PacketHeader_1.default()
        })
            .array("m_carSetups", {
            length: 20,
            type: new CarSetupData_1.default()
        });
        this.data = this.fromBuffer(buffer);
    }
}
exports.default = PacketCarSetupData;
//# sourceMappingURL=PacketCarSetupData.js.map