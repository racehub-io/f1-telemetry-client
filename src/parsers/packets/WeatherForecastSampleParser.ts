import {F1Parser} from '../F1Parser';

export class WeatherForecastSampleParser extends F1Parser {
  constructor() {
    super();

    this.endianess('little')
        .uint8('m_sessionType')
        .uint8('m_timeOffset')
        .uint8('m_weather')
        .int8('m_trackTemperature')
        .int8('m_airTemperature');
  }
}
