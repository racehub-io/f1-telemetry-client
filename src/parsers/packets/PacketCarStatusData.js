import F1Parser from '../F1Parser';
import CarStatusData from './CarStatusData';

/*
struct PacketCarStatusData
{
  PacketHeader        m_header;            // Header
  CarStatusData       m_carStatusData[20];
};
*/

export default class PacketCarStatusData extends F1Parser {
  constructor(buffer) {
    super();
    this.endianess('little')
      // skips the header
      .skip(21)
      .array('m_carSetups', {
        length: 20,
        type: new CarStatusData()
      })

    this.data = this.fromBuffer(buffer);
  }
}