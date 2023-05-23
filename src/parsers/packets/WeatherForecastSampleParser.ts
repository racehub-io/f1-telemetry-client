import {F1Parser} from '../F1Parser';
import {WeatherForecastSample} from './types';

export class WeatherForecastSampleParser extends F1Parser<WeatherForecastSample> {
  constructor(packetFormat: number) {
    super();

    this.endianess('little')
      .uint8('m_sessionType')
      .uint8('m_timeOffset')
      .uint8('m_weather')
      .int8('m_trackTemperature');

    if (packetFormat === 2020) {
      this.int8('m_airTemperature');
    }

    if (packetFormat >= 2021) {
      this.int8('m_trackTemperatureChange')
        .int8('m_airTemperature')
        .int8('m_airTemperatureChange')
        .uint8('m_rainPercentage');
    }
  }
}
