import {F1Parser} from '../F1Parser';
import {MotionData} from './types';

export class CarMotionDataParser extends F1Parser<MotionData> {
  constructor() {
    super();
    this.floatle('m_worldPositionX')
      .floatle('m_worldPositionY')
      .floatle('m_worldPositionZ')
      .floatle('m_worldVelocityX')
      .floatle('m_worldVelocityY')
      .floatle('m_worldVelocityZ')
      .uint16le('m_worldForwardDirX')
      .uint16le('m_worldForwardDirY')
      .uint16le('m_worldForwardDirZ')
      .uint16le('m_worldRightDirX')
      .uint16le('m_worldRightDirY')
      .uint16le('m_worldRightDirZ')
      .floatle('m_gForceLateral')
      .floatle('m_gForceLongitudinal')
      .floatle('m_gForceVertical')
      .floatle('m_yaw')
      .floatle('m_pitch')
      .floatle('m_roll');
  }
}
