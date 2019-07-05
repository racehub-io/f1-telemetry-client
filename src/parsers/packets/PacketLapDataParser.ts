import {F1Parser} from '../F1Parser';
import {LapDataParser} from './LapDataParser';
import {PacketHeaderParser} from './PacketHeaderParser';
import {PacketLapData} from './types';

export class PacketLapDataParser extends F1Parser {
  data: PacketLapData;

  constructor(buffer: Buffer, packetFormat: number) {
    super();

    this.endianess('little')
        .nest('m_header', {type: new PacketHeaderParser(packetFormat)})
        .array('m_lapData', {length: 20, type: new LapDataParser()});

    this.data = this.fromBuffer(buffer);
  }
}
