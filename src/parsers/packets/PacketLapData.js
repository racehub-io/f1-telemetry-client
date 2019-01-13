import F1Parser from '../F1Parser';
import LapData from './LapData'

/*
struct PacketLapData
{
    PacketHeader    m_header;              // Header
    LapData         m_lapData[20];         // Lap data for all cars on track
};
*/

export default class PacketLapData extends F1Parser {
  constructor(buffer) {
    super();
    this.endianess('little')
      .skip(21)
      .array('m_lapData', {
        length: 20,
        type: new LapData(),
      })

    this.data = this.fromBuffer(buffer);
  }
}