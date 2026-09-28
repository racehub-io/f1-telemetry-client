import {F1Parser} from '../F1Parser';

import {PacketHeaderParser} from './PacketHeaderParser';
import type {PacketTimeTrialData, TimeTrialDataSet} from './types';

class TimeTrialDataSetParser extends F1Parser<TimeTrialDataSet> {
  constructor(packetFormat: number) {
    super();
    this.uint8('m_carIdx');

    if (packetFormat >= 2026) {
      this.uint16le('m_teamId');
    } else {
      this.uint8('m_teamId');
    }

    this.uint32le('m_lapTimeInMS')
      .uint32le('m_sector1TimeInMS')
      .uint32le('m_sector2TimeInMS')
      .uint32le('m_sector3TimeInMS')
      .uint8('m_tractionControl')
      .uint8('m_gearboxAssist')
      .uint8('m_antiLockBrakes')
      .uint8('m_equalCarPerformance')
      .uint8('m_customSetup')
      .uint8('m_valid');
  }
}

export class PacketTimeTrialDataParser extends F1Parser<PacketTimeTrialData> {
  data: PacketTimeTrialData;

  constructor(buffer: Buffer, packetFormat: number, bigintEnabled: boolean) {
    super();
    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(packetFormat, bigintEnabled),
      })
      .nest('m_playerSessionBestDataSet', {
        type: new TimeTrialDataSetParser(packetFormat),
      })
      .nest('m_personalBestDataSet', {
        type: new TimeTrialDataSetParser(packetFormat),
      })
      .nest('m_rivalDataSet', {type: new TimeTrialDataSetParser(packetFormat)});

    this.data = this.fromBuffer(buffer);
  }
}
