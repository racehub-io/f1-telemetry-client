import {F1Parser} from '../F1Parser';
import {CarTelemetryDataParser} from './CarTelemetryDataParser';
import {PacketHeaderParser} from './PacketHeaderParser';
import {PacketCarTelemetryData} from './types';

export class PacketCarTelemetryDataParser extends F1Parser {
  data: PacketCarTelemetryData;

  constructor(buffer: Buffer, packetFormat: number) {
    super();

    this.endianess('little')
        .nest('m_header', {type: new PacketHeaderParser(packetFormat)})
        .array('m_carTelemetryData', {
          length: 20,
          type: new CarTelemetryDataParser(packetFormat),
        })
        .uint32le('m_buttonStatus');

    this.data = this.fromBuffer(buffer);
  }
}
