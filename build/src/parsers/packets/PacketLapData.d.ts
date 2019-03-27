import F1Parser from "../F1Parser";
export default class PacketLapData extends F1Parser {
    data: any;
    constructor(buffer: Buffer);
}
