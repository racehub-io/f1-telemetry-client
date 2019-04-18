import {Parser} from 'binary-parser';

import {F1Parser} from '../F1Parser';

import {CarMotionData} from './CarMotionData';
import {PacketHeader} from './PacketHeader';

/*
struct PacketMotionData
{
    PacketHeader    m_header;               // Header

    CarMotionData   m_carMotionData[20];    // Data for all cars on track

    // Extra player car ONLY data
    float         m_suspensionPosition[4];       // Note: All wheel arrays have
the following order: float         m_suspensionVelocity[4];       // RL, RR, FL,
FR float         m_suspensionAcceleration[4];   // RL, RR, FL, FR float
m_wheelSpeed[4];               // Speed of each wheel float m_wheelSlip[4]; //
Slip ratio for each wheel float         m_localVelocityX;              //
Velocity in local space float         m_localVelocityY;              // Velocity
in local space float         m_localVelocityZ;              // Velocity in local
space float         m_angularVelocityX;            // Angular velocity
x-component float         m_angularVelocityY;            // Angular velocity
y-component float         m_angularVelocityZ;            // Angular velocity
z-component float         m_angularAccelerationX;        // Angular velocity
x-component float         m_angularAccelerationY;        // Angular velocity
y-component float         m_angularAccelerationZ;        // Angular velocity
z-component float         m_frontWheelsAngle;            // Current front wheels
angle in radians
};
*/

export class PacketMotionData extends F1Parser {
  // tslint:disable-next-line:no-any
  data: any;

  constructor(buffer: Buffer) {
    super();
    this.endianess('little')
        .nest('m_header', {type: new PacketHeader()})
        .array('m_carMotionData', {length: 20, type: new CarMotionData()})
        .array('m_suspensionPosition', {
          length: 4,
          type: new Parser().floatle('m_suspensionPosition'),
        })
        .array('m_suspensionVelocity', {
          length: 4,
          type: new Parser().floatle('m_suspensionVelocity'),
        })
        .array('m_suspensionAcceleration', {
          length: 4,
          type: new Parser().floatle('m_suspensionAcceleration'),
        })
        .array('m_wheelSpeed', {
          length: 4,
          type: new Parser().floatle('m_wheelSpeed'),
        })
        .array('m_wheelSlip', {
          length: 4,
          type: new Parser().floatle('m_wheelSlip'),
        })
        .floatle('m_localVelocityX')        // Velocity in local space
        .floatle('m_localVelocityY')        // Velocity in local space
        .floatle('m_localVelocityZ')        // Velocity in local space
        .floatle('m_angularVelocityX')      // Angular velocity x-component
        .floatle('m_angularVelocityY')      // Angular velocity y-component
        .floatle('m_angularVelocityZ')      // Angular velocity z-component
        .floatle('m_angularAccelerationX')  // Angular velocity x-component
        .floatle('m_angularAccelerationY')  // Angular velocity y-component
        .floatle('m_angularAccelerationZ')  // Angular velocity z-component
        .floatle(
            'm_frontWheelsAngle');  // Current front wheels angle in radians;

    this.data = this.fromBuffer(buffer);
  }
}
