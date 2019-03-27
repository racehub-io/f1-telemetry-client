import F1Parser from "../F1Parser";
export default class PacketCarTelemetryData extends F1Parser {
    data: any;
    constructor(buffer: Buffer);
}
