import {F1Parser} from '../F1Parser';
import {CarTelemetryDataParser} from './CarTelemetryDataParser';
import {PacketHeaderParser} from './PacketHeaderParser';
import {PacketCarTelemetryData} from './types';

export class PacketCarTelemetryDataParser extends F1Parser {
  data: PacketCarTelemetryData;

  constructor(buffer: Buffer, packetFormat: number, bigintEnabled: boolean) {
    super();

    this.endianess('little')
        .nest('m_header', {
          type: new PacketHeaderParser(packetFormat, bigintEnabled),
        })
        .array('m_carTelemetryData', {
          length: packetFormat === 2020 ? 22 : 20,
          type: new CarTelemetryDataParser(packetFormat),
        });

    if (packetFormat === 2018 || packetFormat === 2019) {
      this.uint32le('m_buttonStatus');
    }

    if (packetFormat === 2020) {
      this.uint32le('m_buttonStatus')
          .uint8('m_mfdPanelIndex')
          .uint8('m_mfdPanelIndexSecondaryPlayer')
          .int8('m_suggestedGear');
    }

    this.data = this.fromBuffer(buffer);
  }
}
