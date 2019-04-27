import {Parser} from 'binary-parser';

import {F1Parser} from '../F1Parser';

export class CarTelemetryDataParser extends F1Parser {
  constructor() {
    super();
    this.uint16le('m_speed')
        .uint8('m_throttle')
        .int8('m_steer')
        .uint8('m_brake')
        .uint8('m_clutch')
        .int8('m_gear')
        .uint16le('m_engineRPM')
        .uint8('m_drs')
        .uint8('m_revLightsPercent')
        .array('m_brakesTemperature', {
          length: 4,
          type: new Parser().uint16le('m_brakesTemperature'),
        })
        .array('m_tyresSurfaceTemperature', {
          length: 4,
          type: new Parser().uint16le('m_tyresSurfaceTemperature'),
        })
        .array('m_tyresInnerTemperature', {
          length: 4,
          type: new Parser().uint16le('m_tyresInnerTemperature'),
        })
        .uint16le('m_engineTemperature')
        .array('m_tyresPressure', {
          length: 4,
          type: new Parser().floatle('m_tyresPressure'),
        });
  }
}
