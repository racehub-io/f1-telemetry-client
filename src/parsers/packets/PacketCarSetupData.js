import F1Parser from '../F1Parser';
import CarSetupData from './CarSetupData';

/*
struct PacketCarSetupData
{
  PacketHeader    m_header;            // Header
  CarSetupData    m_carSetups[20];
};
*/

export default class PacketCarSetupData extends F1Parser {
  constructor(buffer) {
    super();
    this.endianess('little')
      // skips the header
      .skip(21)
      .array('m_carSetups', {
        length: 20,
        type: new CarSetupData()
      })

    this.data = this.fromBuffer(buffer);
  }
}