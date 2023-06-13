import {F1Parser} from '../F1Parser';
import {PacketHeaderParser} from './PacketHeaderParser';
import {PacketTyreSetsData} from './types';
import {TyreSetDataParser} from './TyreSetDataParser';

export class PacketTyreSetsDataParser extends F1Parser<PacketTyreSetsData> {
  data: PacketTyreSetsData;

  constructor(buffer: Buffer, packetFormat: number, bigintEnabled: boolean) {
    super();

    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(packetFormat, bigintEnabled),
      })
      .uint8('m_carIdx')
      .array('m_tyreSetData', {
        length: 20,
        type: new TyreSetDataParser(),
      })
      .uint8('m_fittedIdx');

    this.data = this.fromBuffer(buffer);
  }
}
