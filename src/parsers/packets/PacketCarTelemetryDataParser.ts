import {F1Parser} from '../F1Parser';
import {CarTelemetryDataParser} from './CarTelemetryDataParser';
import {PacketHeaderParser} from './PacketHeaderParser';

export class PacketCarTelemetryDataParser extends F1Parser {
  // tslint:disable-next-line:no-any
  data: any;

  constructor(buffer: Buffer) {
    super();
    this.endianess('little')
        .nest('m_header', {type: new PacketHeaderParser()})
        .array('m_carTelemetryData', {
          length: 20,
          type: new CarTelemetryDataParser(),
        })
        .uint32le('m_buttonStatus');

    this.data = this.fromBuffer(buffer);
  }
}
