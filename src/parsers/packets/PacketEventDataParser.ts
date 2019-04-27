import {F1Parser} from '../F1Parser';
import {PacketHeaderParser} from './PacketHeaderParser';

export class PacketEventDataParser extends F1Parser {
  // tslint:disable-next-line:no-any
  data: any;

  constructor(buffer: Buffer) {
    super();
    this.endianess('little')
        .nest('m_header', {type: new PacketHeaderParser()})
        .string('m_eventStringCode', {length: 4});

    this.data = this.fromBuffer(buffer);
  }
}
