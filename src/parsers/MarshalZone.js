import F1Parser from './F1Parser';

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
export default class MarshalZone extends F1Parser {
  constructor() {
    super();
    this.endianess('little')
      .float('m_zoneStart')
      .int8('m_zoneFlag');
  }
}
