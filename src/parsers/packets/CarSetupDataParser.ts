import {F1Parser} from '../F1Parser';
import {CarSetupData} from './types';

export class CarSetupDataParser extends F1Parser<CarSetupData> {
  constructor(packetFormat: number) {
    super();
    this.uint8('m_frontWing')
      .uint8('m_rearWing')
      .uint8('m_onThrottle')
      .uint8('m_offThrottle')
      .floatle('m_frontCamber')
      .floatle('m_rearCamber')
      .floatle('m_frontToe')
      .floatle('m_rearToe')
      .uint8('m_frontSuspension')
      .uint8('m_rearSuspension')
      .uint8('m_frontAntiRollBar')
      .uint8('m_rearAntiRollBar')
      .uint8('m_frontSuspensionHeight')
      .uint8('m_rearSuspensionHeight')
      .uint8('m_brakePressure')
      .uint8('m_brakeBias');

    if (packetFormat >= 2024) {
      this.uint8('m_engineBraking');
    }

    if (packetFormat >= 2020) {
      this.floatle('m_rearLeftTyrePressure')
        .floatle('m_rearRightTyrePressure')
        .floatle('m_frontLeftTyrePressure')
        .floatle('m_frontRightTyrePressure');
    } else {
      this.floatle('m_frontTyrePressure').floatle('m_rearTyrePressure');
    }

    this.uint8('m_ballast').floatle('m_fuelLoad');
  }
}
