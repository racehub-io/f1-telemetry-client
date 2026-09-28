import {F1Parser} from '../F1Parser';
import {MotionData} from './types';

export class CarMotionDataParser extends F1Parser<MotionData> {
  constructor(packetFormat = 2023) {
    super();
    this.floatle('m_worldPositionX')
      .floatle('m_worldPositionY')
      .floatle('m_worldPositionZ')
      .floatle('m_worldVelocityX')
      .floatle('m_worldVelocityY')
      .floatle('m_worldVelocityZ')
      .int16le('m_worldForwardDirX')
      .int16le('m_worldForwardDirY')
      .int16le('m_worldForwardDirZ')
      .int16le('m_worldRightDirX')
      .int16le('m_worldRightDirY')
      .int16le('m_worldRightDirZ');

    if (packetFormat >= 2026) {
      // Divide each raw G-force value by 1000 to get G units.
      this.int16le('m_gForceLateral')
        .int16le('m_gForceLongitudinal')
        .int16le('m_gForceVertical');
    } else {
      this.floatle('m_gForceLateral')
        .floatle('m_gForceLongitudinal')
        .floatle('m_gForceVertical');
    }

    this.floatle('m_yaw').floatle('m_pitch').floatle('m_roll');
  }
}
