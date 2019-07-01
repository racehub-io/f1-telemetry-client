import {F1Parser} from '../F1Parser';

import {EventDataDetailsParser} from './EventDataDetailsParser';
import {PacketHeaderParser} from './PacketHeaderParser';
import {PacketEventData} from './types';

export class PacketEventDataParser extends F1Parser {
  data: PacketEventData;

  constructor(buffer: Buffer, packetFormat: number) {
    super();

    if (packetFormat === 2018) {
      this.unpack2018Format();
    } else if (packetFormat === 2019) {
      this.unpack2019Format();
    }

    this.data = this.fromBuffer(buffer);
  }

  unpack2018Format = () => {
    this.endianess('little')
        .nest('m_header', {type: new PacketHeaderParser(2018)})
        .string('m_eventStringCode', {length: 4});
  };

  unpack2019Format = () => {
    this.endianess('little')
        .nest('m_header', {type: new PacketHeaderParser(2019)})
        .string('m_eventStringCode', {length: 4})
        .nest('m_eventDetails', {type: new EventDataDetailsParser()});
  };
}
