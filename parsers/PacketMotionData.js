import F1Parser from './F1Parser';
import CarMotionData from './CarMotionData';

export default class PacketMotionData extends F1Parser {
  constructor(buffer) {
    super();
    this.endianess("little")
      .skip(21)
      .array("m_carMotionData", {
        length: 20,
        type: new CarMotionData()
      })
      /*
      .array('m_suspensionPosition', {
        length: 4,
        type: 'float'
      })       // Note: All wheel arrays have the following order:
      .array('m_suspensionVelocity', {
        length: 4,
        type: 'float'
      })       // RL, RR, FL, FR
      .array('m_suspensionAcceleration', {
        length: 4,
        type: 'float'
      })   // RL, RR, FL, FR
      .array('m_wheelSpeed', {
        length: 4,
        type: 'float'
      })               // Speed of each wheel
      .array('m_wheelSlip', {
        length: 4,
        type: 'float'
      })                // Slip ratio for each wheel
      */
      .skip(16 * 5)
      .float('m_localVelocityX')           // Velocity in local space
      .float('m_localVelocityY')           // Velocity in local space
      .float('m_localVelocityZ')           // Velocity in local space
      .float('m_angularVelocityX')         // Angular velocity x-component
      .float('m_angularVelocityY')         // Angular velocity y-component
      .float('m_angularVelocityZ')         // Angular velocity z-component
      .float('m_angularAccelerationX')     // Angular velocity x-component
      .float('m_angularAccelerationY')     // Angular velocity y-component
      .float('m_angularAccelerationZ')     // Angular velocity z-component
      .float('m_frontWheelsAngle')         // Current front wheels angle in radians;

      this.data = this.fromBuffer(buffer);
  }
}
