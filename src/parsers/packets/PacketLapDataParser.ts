import {F1Parser} from '../F1Parser';
import {LapDataParser} from './LapDataParser';
import {PacketHeaderParser} from './PacketHeaderParser';

export class PacketLapDataParser extends F1Parser {
  // tslint:disable-next-line:no-any
  data: any;

  constructor(buffer: Buffer) {
    super();
    this.endianess('little')
        .nest('m_header', {type: new PacketHeaderParser()})
        .array('m_lapData', {length: 20, type: new LapDataParser()});

    this.data = this.fromBuffer(buffer);
  }
}
