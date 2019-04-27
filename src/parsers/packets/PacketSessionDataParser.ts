import {WEATHER} from '../../constants/weather';
import {F1Parser} from '../F1Parser';

import {MarshalZoneParser} from './MarshalZoneParser';
import {PacketHeaderParser} from './PacketHeaderParser';

export class PacketSessionDataParser extends F1Parser {
  // tslint:disable-next-line:no-any
  data: any;

  constructor(buffer: Buffer) {
    super();

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

    this.data = this.fromBuffer(buffer);
  }

  getWeather() {
    return WEATHER[this.data.m_weather];
  }
}
