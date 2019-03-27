"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line
const dgram = require("dgram");
const EventEmitter = require("events");
const packets_1 = require("./parsers/packets");
const constants_1 = require("./constants");
exports.constants = constants_1.default;
const constantsTypes = require("./constants/types");
exports.constantsTypes = constantsTypes;
/**
 *
 */
class F1TelemetryClient extends EventEmitter {
    constructor(opts = {}) {
        super();
        const { port = 20777 } = opts;
        this.port = port;
        this.client = dgram.createSocket("udp4");
    }
    /**
     *
     * @param {Buffer} buffer
     */
    // tslint:disable-next-line:no-any
    static parsePacketHeader(buffer) {
        const ph = new packets_1.PacketHeader();
        return ph.fromBuffer(buffer);
    }
    /**
     *
     * @param {Number} packetId
     */
    static getParserByPacketId(packetId) {
        const { PACKETS } = constants_1.default;
        const packetKeys = Object.keys(PACKETS);
        const packetType = packetKeys[packetId];
        switch (packetType) {
            case PACKETS.session:
                return packets_1.PacketSessionData;
            case PACKETS.motion:
                return packets_1.PacketMotionData;
            case PACKETS.lapData:
                return packets_1.PacketLapData;
            case PACKETS.event:
                return packets_1.PacketEventData;
            case PACKETS.participants:
                return packets_1.PacketParticipantsData;
            case PACKETS.carSetups:
                return packets_1.PacketCarSetupData;
            case PACKETS.carTelemetry:
                return packets_1.PacketCarTelemetryData;
            case PACKETS.carStatus:
                return packets_1.PacketCarStatusData;
            default:
                return null;
        }
    }
    /**
     *
     * @param {Buffer} message
     */
    parseMessage(message) {
        const buffer = Buffer.from(message.buffer);
        const { m_packetId } = F1TelemetryClient.parsePacketHeader(buffer); // eslint-disable-line
        const parser = F1TelemetryClient.getParserByPacketId(m_packetId);
        if (parser !== null) {
            const packetData = new parser(buffer);
            const packetKeys = Object.keys(constants_1.default.PACKETS);
            this.emit(packetKeys[m_packetId], packetData.data);
        }
    }
    /**
     * Method to start listening for packets
     */
    start() {
        if (!this.client) {
            return;
        }
        this.client.on("listening", () => {
            if (!this.client) {
                return;
            }
            const address = this.client.address();
            console.log(`UDP Client listening on ${address.address}:${address.port} 🏎`);
            this.client.setBroadcast(true);
        });
        this.client.on("message", m => this.parseMessage(m));
        this.client.bind(this.port);
    }
    /**
     * Method to close the client
     */
    stop() {
        if (!this.client) {
            return;
        }
        return this.client.close(() => {
            console.log(`UDP Client closed 🏁`);
            this.client = undefined;
        });
    }
}
exports.F1TelemetryClient = F1TelemetryClient;
//# sourceMappingURL=index.js.map