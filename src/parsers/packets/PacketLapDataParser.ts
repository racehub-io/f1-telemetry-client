import {F1Parser} from '../F1Parser';
import {LapDataParser} from './LapDataParser';
import {PacketHeaderParser} from './PacketHeaderParser';
import {PacketLapData} from './types';

export class PacketLapDataParser extends F1Parser {
  data: PacketLapData;

  constructor(buffer: Buffer, packetFormat: number, bigintEnabled: boolean) {
    super();

    this.endianess('little')
        .nest('m_header', {
          type: new PacketHeaderParser(packetFormat, bigintEnabled),
        })
        .array('m_lapData', {
          length: packetFormat === 2020 || packetFormat === 2021 ||
                  packetFormat === 2022 ?
              22 :
              20,
          type: new LapDataParser(packetFormat),
        });

    if (packetFormat === 2022) {
      this.uint8('m_timeTrialPBCarIdx').uint8('m_timeTrialRivalCarIdx');
    }

    this.data = this.fromBuffer(buffer);
  }
}
