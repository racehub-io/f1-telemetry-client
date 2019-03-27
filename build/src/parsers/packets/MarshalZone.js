"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const F1Parser_1 = require("../F1Parser");
/**
 *  struct MarshalZone
 *  {
 *    float  m_zoneStart;   // Fraction (0..1) of way through the lap the marshal zone starts
 *    int8   m_zoneFlag;    // -1 = invalid/unknown
 *                          // 0 = none
 *                          // 1 = green
 *                          // 2 = blue
 *                          // 3 = yellow
 *                          // 4 = red
 *  };
 */
class MarshalZone extends F1Parser_1.default {
    constructor() {
        super();
        this.endianess('little')
            .floatle('m_zoneStart')
            .int8('m_zoneFlag');
    }
}
exports.default = MarshalZone;
//# sourceMappingURL=MarshalZone.js.map