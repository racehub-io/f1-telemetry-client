"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const F1Parser_1 = require("../F1Parser");
const PacketHeader_1 = require("./PacketHeader");
/*
struct PacketEventData
{
  PacketHeader    m_header;               // Header
  uint8           m_eventStringCode[4];   // Event string code, see above
};
*/
class PacketEventData extends F1Parser_1.default {
    constructor(buffer) {
        super();
        this.endianess("little")
            .nest("m_header", {
            type: new PacketHeader_1.default()
        })
            .string("m_eventStringCode", {
            length: 4
        });
        this.data = this.fromBuffer(buffer);
    }
}
exports.default = PacketEventData;
//# sourceMappingURL=PacketEventData.js.map