"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const F1Parser_1 = require("../F1Parser");
const ParticipantData_1 = require("./ParticipantData");
const PacketHeader_1 = require("./PacketHeader");
/*
struct PacketParticipantsData
{
    PacketHeader    m_header;            // Header
    uint8           m_numCars;           // Number of cars in the data
    ParticipantData m_participants[20];
};
*/
class PacketParticipantsData extends F1Parser_1.default {
    constructor(buffer) {
        super();
        this.endianess("little")
            .nest("m_header", {
            type: new PacketHeader_1.default()
        })
            .uint8("m_numCars")
            .array("m_participants", {
            length: 20,
            type: new ParticipantData_1.default()
        });
        this.data = this.fromBuffer(buffer);
    }
}
exports.default = PacketParticipantsData;
//# sourceMappingURL=PacketParticipantsData.js.map