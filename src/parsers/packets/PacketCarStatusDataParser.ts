import {F1Parser} from '../F1Parser';
import {CarStatusDataParser} from './CarStatusDataParser';
import {PacketHeaderParser} from './PacketHeaderParser';
import {PacketCarStatusData} from './types';

export class PacketCarStatusDataParser extends F1Parser {
  data: PacketCarStatusData;

  constructor(buffer: Buffer, packetFormat: number, bigintEnabled: boolean) {
    super();

    this.endianess('little')
        .nest('m_header', {
          type: new PacketHeaderParser(packetFormat, bigintEnabled),
        })
        .array('m_carStatusData', {
          length: packetFormat === 2020 ? 22 : 20,
          type: new CarStatusDataParser(packetFormat),
        });

    this.data = this.fromBuffer(buffer);
  }
}
