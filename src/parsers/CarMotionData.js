import F1Parser from './F1Parser';

/**
 * struct CarMotionData
 * {
 *   float         m_worldPositionX;           // World space X position
 *   float         m_worldPositionY;           // World space Y position
 *   float         m_worldPositionZ;           // World space Z position
 *   float         m_worldVelocityX;           // Velocity in world space X
 *   float         m_worldVelocityY;           // Velocity in world space Y
 *   float         m_worldVelocityZ;           // Velocity in world space Z
 *   int16         m_worldForwardDirX;         // World space forward X direction (normalised)
 *   int16         m_worldForwardDirY;         // World space forward Y direction (normalised)
 *   int16         m_worldForwardDirZ;         // World space forward Z direction (normalised)
 *   int16         m_worldRightDirX;           // World space right X direction (normalised)
 *   int16         m_worldRightDirY;           // World space right Y direction (normalised)
 *   int16         m_worldRightDirZ;           // World space right Z direction (normalised)
 *   float         m_gForceLateral;            // Lateral G-Force component
 *   float         m_gForceLongitudinal;       // Longitudinal G-Force component
 *   float         m_gForceVertical;           // Vertical G-Force component
 *   float         m_yaw;                      // Yaw angle in radians
 *   float         m_pitch;                    // Pitch angle in radians
 *   float         m_roll;                     // Roll angle in radians
 * };
 */
export default class CarMotionData extends F1Parser {
  constructor() {
    super();
    this.float('m_worldPositionX')
      .float('m_worldPositionY')
      .float('m_worldPositionZ')
      .float('m_worldVelocityX')
      .float('m_worldVelocityY')
      .float('m_worldVelocityZ')
      .uint16('m_worldForwardDirX')
      .uint16('m_worldForwardDirY')
      .uint16('m_worldForwardDirZ')
      .uint16('m_worldRightDirX')
      .uint16('m_worldRightDirY')
      .uint16('m_worldRightDirZ')
      .float('m_gForceLateral')
      .float('m_gForceLongitudinal')
      .float('m_gForceVertical')
      .float('m_yaw')
      .float('m_pitch')
      .float('m_roll');
  }
}