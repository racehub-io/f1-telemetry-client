import {Parser} from 'binary-parser';

import {F1Parser} from '../F1Parser';

import {CarMotionDataParser} from './CarMotionDataParser';
import {PacketHeaderParser} from './PacketHeaderParser';
import {PacketMotionData} from './types';

export class PacketMotionDataParser extends F1Parser {
  data: PacketMotionData;

  constructor(buffer: Buffer, packetFormat: number) {
    super();
    this.endianess('little')
        .nest('m_header', {type: new PacketHeaderParser(packetFormat)})
        .array('m_carMotionData', {length: 20, type: new CarMotionDataParser()})
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
