import {Parser} from 'binary-parser';

import {F1Parser} from '../F1Parser';

import {PacketHeaderParser} from './PacketHeaderParser';
import {PacketMotionExData} from './types';

export class PacketMotionExDataParser extends F1Parser<PacketMotionExData> {
  data: PacketMotionExData;

  constructor(buffer: Buffer, packetFormat: number, bigintEnabled: boolean) {
    super();

    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(packetFormat, bigintEnabled),
      })
      .array('m_suspensionPosition', {
        length: 4,
        type: new Parser().floatle(''),
      })
      .array('m_suspensionVelocity', {
        length: 4,
        type: new Parser().floatle(''),
      })
      .array('m_suspensionAcceleration', {
        length: 4,
        type: new Parser().floatle(''),
      })
      .array('m_wheelSpeed', {
        length: 4,
        type: new Parser().floatle(''),
      })
      .array('m_wheelSlipRatio', {
        length: 4,
        type: new Parser().floatle(''),
      })
      .array('m_wheelSlipAngle', {
        length: 4,
        type: new Parser().floatle(''),
      })
      .array('m_wheelLatForce', {
        length: 4,
        type: new Parser().floatle(''),
      })
      .array('m_wheelLongForce', {
        length: 4,
        type: new Parser().floatle(''),
      })
      .floatle('m_heightOfCOGAboveGround')
      .floatle('m_localVelocityX')
      .floatle('m_localVelocityY')
      .floatle('m_localVelocityZ')
      .floatle('m_angularVelocityX')
      .floatle('m_angularVelocityY')
      .floatle('m_angularVelocityZ')
      .floatle('m_angularAccelerationX')
      .floatle('m_angularAccelerationY')
      .floatle('m_angularAccelerationZ')
      .floatle('m_frontWheelsAngle')
      .array('m_wheelVertForce', {
        length: 4,
        type: new Parser().floatle(''),
      });
    this.data = this.fromBuffer(buffer);
  }
}
