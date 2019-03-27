import F1Parser from "../F1Parser";
export default class PacketEventData extends F1Parser {
    data: any;
    constructor(buffer: Buffer);
}
