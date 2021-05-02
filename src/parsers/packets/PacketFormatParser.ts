import {F1Parser} from '../F1Parser';

export class PacketFormatParser extends F1Parser {
  constructor() {
    super();
    this.endianess('little').uint16le('m_packetFormat');
  }
}
