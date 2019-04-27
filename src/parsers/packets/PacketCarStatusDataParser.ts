import {F1Parser} from '../F1Parser';
import {CarStatusDataParser} from './CarStatusDataParser';
import {PacketHeaderParser} from './PacketHeaderParser';

export class PacketCarStatusDataParser extends F1Parser {
  // tslint:disable-next-line:no-any
  data: any;

  constructor(buffer: Buffer) {
    super();
    this.endianess('little')
        .nest('m_header', {type: new PacketHeaderParser()})
        .array('m_carSetups', {length: 20, type: new CarStatusDataParser()});

    this.data = this.fromBuffer(buffer);
  }
}
