import {Parser} from 'binary-parser';

import {F1Parser} from '../F1Parser';

export class CarTelemetryDataParser extends F1Parser {
  constructor(packetFormat: number) {
    super();
    this.uint16le('m_speed');

    if (packetFormat === 2018) {
      this.uint8('m_throttle').int8('m_steer').uint8('m_brake');
    } else if (packetFormat === 2019) {
      this.floatle('m_throttle').floatle('m_steer').floatle('m_brake');
    }

    this.uint8('m_clutch')
        .int8('m_gear')
        .uint16le('m_engineRPM')
        .uint8('m_drs')
        .uint8('m_revLightsPercent')
        .array('m_brakesTemperature', {
          length: 4,
          type: new Parser().uint16le(''),
        })
        .array('m_tyresSurfaceTemperature', {
          length: 4,
          type: new Parser().uint16le(''),
        })
        .array('m_tyresInnerTemperature', {
          length: 4,
          type: new Parser().uint16le(''),
        })
        .uint16le('m_engineTemperature')
        .array('m_tyresPressure', {
          length: 4,
          type: new Parser().floatle(''),
        });

    if (packetFormat === 2019) {
      this.array('m_surfaceType', {
        length: 4,
        type: new Parser().uint8(''),
      });
    }
  }
}
