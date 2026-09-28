import {F1Parser} from '../F1Parser';
import type {CarTelemetry2Data} from './types';

export class CarTelemetry2DataParser extends F1Parser<CarTelemetry2Data> {
  constructor() {
    super();
    this.endianess('little')
      .uint8('m_activeAeroMode')
      .uint8('m_activeAeroAvailable')
      .uint16le('m_activeAeroActivationDistance')
      .uint8('m_overtakeAvailable')
      .uint8('m_overtakeActive')
      .uint16le('m_overtakeActivationDistance')
      .uint8('m_2026Regulations')
      .uint8('m_drivingWrongWay');
  }
}
