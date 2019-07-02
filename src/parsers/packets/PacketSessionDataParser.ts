import {F1Parser} from '../F1Parser';

import {MarshalZoneParser} from './MarshalZoneParser';
import {PacketHeaderParser} from './PacketHeaderParser';
import {PacketSessionData} from './types';

export class PacketSessionDataParser extends F1Parser {
  data: PacketSessionData;

  constructor(buffer: Buffer, packetFormat: number) {
    super();

    if (packetFormat === 2018) {
      this.unpack2018Format();
    } else if (packetFormat === 2019) {
      this.unpack2019Format();
    }

    this.data = this.fromBuffer(buffer);
  }

  unpack2018Format = () => {
    this.endianess('little')
        .nest('m_header', {type: new PacketHeaderParser()})
        .uint8('m_weather')
        .int8('m_trackTemperature')
        .int8('m_airTemperature')
        .uint8('m_totalLaps')
        .uint16('m_trackLength')  // meters
        .uint8('m_sessionType')
        .int8('m_trackId')
        .uint8('m_era')
        .uint16('m_sessionTimeLeft')
        .uint16('m_sessionDuration')
        .uint8('m_pitSpeedLimit')
        .uint8('m_gamePaused')
        .uint8('m_isSpectating')
        .uint8('m_spectatorCarIndex')
        .uint8('m_sliProNativeSupport')
        .uint8('m_numMarshalZones')
        .array('m_marshalZones', {length: 21, type: new MarshalZoneParser()})
        .uint8('m_safetyCarStatus')
        .uint8('m_networkGame');
  };

  unpack2019Format = () => {
    this.endianess('little')
        .nest('m_header', {type: new PacketHeaderParser()})
        .uint8('m_weather')
        .int8('m_trackTemperature')
        .int8('m_airTemperature')
        .uint8('m_totalLaps')
        .uint16('m_trackLength')  // meters
        .uint8('m_sessionType')
        .int8('m_trackId')
        .uint8('m_formula')
        .uint16('m_sessionTimeLeft')
        .uint16('m_sessionDuration')
        .uint8('m_pitSpeedLimit')
        .uint8('m_gamePaused')
        .uint8('m_isSpectating')
        .uint8('m_spectatorCarIndex')
        .uint8('m_sliProNativeSupport')
        .uint8('m_numMarshalZones')
        .array('m_marshalZones', {length: 21, type: new MarshalZoneParser()})
        .uint8('m_safetyCarStatus')
        .uint8('m_networkGame');
  };
}
