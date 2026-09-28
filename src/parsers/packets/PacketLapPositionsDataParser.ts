import {F1Parser} from '../F1Parser';
import {PacketHeaderParser} from './PacketHeaderParser';
import type {PacketLapPositionsData} from './types';
import {Parser} from 'binary-parser';

export class PacketLapPositionsDataParser extends F1Parser<PacketLapPositionsData> {
  data: PacketLapPositionsData;

  constructor(buffer: Buffer, packetFormat: number, bigintEnabled: boolean) {
    super();

    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(packetFormat, bigintEnabled),
      })
      .uint8('m_numLaps')
      .uint8('m_lapStart')
      .array('m_positionForVehicleIdx', {
        length: 50,
        type: new Parser().array('cars', {
          length: packetFormat >= 2026 ? 24 : 22,
          type: 'uint8',
        }),
        formatter: (laps: {cars: number[]}[]) => laps.map(lap => lap.cars),
      });

    this.data = this.fromBuffer(buffer);
  }
}
