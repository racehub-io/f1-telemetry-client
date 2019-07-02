import {Parser} from 'binary-parser';

import {EVENT_CODES} from '../../constants';
import {F1Parser} from '../F1Parser';

import {PacketHeaderParser} from './PacketHeaderParser';
import {PacketEventData} from './types';

export class PacketEventDataParser extends F1Parser {
  data: PacketEventData;

  constructor(buffer: Buffer, packetFormat: number) {
    super();

    if (packetFormat === 2018) {
      this.unpack2018Format();
    } else if (packetFormat === 2019) {
      this.unpack2019Format(buffer);
    }

    this.data = this.fromBuffer(buffer);
  }

  unpack2018Format = () => {
    this.endianess('little')
        .nest('m_header', {type: new PacketHeaderParser()})
        .string('m_eventStringCode', {length: 4});
  };

  unpack2019Format = (buffer: Buffer) => {
    const headerParser = new Parser()
                             .endianess('little')
                             .nest('m_header', {type: new PacketHeaderParser()})
                             .string('m_eventStringCode', {length: 4});

    const {m_eventStringCode} = headerParser.parse(buffer);

    if (m_eventStringCode === EVENT_CODES.FastestLap) {
      this.endianess('little')
          .nest('m_header', {type: new PacketHeaderParser()})
          .string('m_eventStringCode', {length: 4})
          .uint8('vehicleIdx')
          .float('lapTime');
    } else if (
        m_eventStringCode === EVENT_CODES.Retirement ||
        m_eventStringCode === EVENT_CODES.TeammateInPits ||
        m_eventStringCode === EVENT_CODES.RaceWinner) {
      this.endianess('little')
          .nest('m_header', {type: new PacketHeaderParser()})
          .string('m_eventStringCode', {length: 4})
          .uint8('vehicleIdx');
    } else {
      this.endianess('little')
          .nest('m_header', {type: new PacketHeaderParser()})
          .string('m_eventStringCode', {length: 4});
    }
  };
}
