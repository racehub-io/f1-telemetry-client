import F1Parser from './F1Parser';
import CarMotionData from './CarMotionData';
import {
  Parser
} from 'binary-parser';

/*
struct PacketMotionData
{
    PacketHeader    m_header;               // Header

    CarMotionData   m_carMotionData[20];    // Data for all cars on track

    // Extra player car ONLY data
    float         m_suspensionPosition[4];       // Note: All wheel arrays have the following order:
    float         m_suspensionVelocity[4];       // RL, RR, FL, FR
    float         m_suspensionAcceleration[4];   // RL, RR, FL, FR
    float         m_wheelSpeed[4];               // Speed of each wheel
    float         m_wheelSlip[4];                // Slip ratio for each wheel
    float         m_localVelocityX;              // Velocity in local space
    float         m_localVelocityY;              // Velocity in local space
    float         m_localVelocityZ;              // Velocity in local space
    float         m_angularVelocityX;            // Angular velocity x-component
    float         m_angularVelocityY;            // Angular velocity y-component
    float         m_angularVelocityZ;            // Angular velocity z-component
    float         m_angularAccelerationX;        // Angular velocity x-component
    float         m_angularAccelerationY;        // Angular velocity y-component
    float         m_angularAccelerationZ;        // Angular velocity z-component
    float         m_frontWheelsAngle;            // Current front wheels angle in radians
};
*/

export default class PacketMotionData extends F1Parser {
  constructor(buffer) {
    super();
    this.endianess('little')
      .skip(21)
      .array('m_carMotionData', {
        length: 20,
        type: new CarMotionData(),
      })
      .array('m_suspensionPosition', {
        length: 4,
        type: new Parser().floatle()
      })
      .array('m_suspensionVelocity', {
        length: 4,
        type: new Parser().floatle()
      })
      .array('m_suspensionAcceleration', {
        length: 4,
        type: new Parser().floatle()
      })
      .array('m_wheelSpeed', {
        length: 4,
        type: new Parser().floatle()
      })
      .array('m_wheelSlip', {
        length: 4,
        type: new Parser().floatle()
      })
      .float('m_localVelocityX') // Velocity in local space
      .float('m_localVelocityY') // Velocity in local space
      .float('m_localVelocityZ') // Velocity in local space
      .float('m_angularVelocityX') // Angular velocity x-component
      .float('m_angularVelocityY') // Angular velocity y-component
      .float('m_angularVelocityZ') // Angular velocity z-component
      .float('m_angularAccelerationX') // Angular velocity x-component
      .float('m_angularAccelerationY') // Angular velocity y-component
      .float('m_angularAccelerationZ') // Angular velocity z-component
      .float('m_frontWheelsAngle'); // Current front wheels angle in radians;

    this.data = this.fromBuffer(buffer);
  }
}