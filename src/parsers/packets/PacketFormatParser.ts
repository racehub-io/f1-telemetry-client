import {F1Parser} from '../F1Parser';

export class PacketFormatParser extends F1Parser {
  constructor() {
    super();
    (this as any).endianess('little').uint16('m_packetFormat');
  }
}
