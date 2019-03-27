import * as dgram from "dgram";
import * as EventEmitter from "events";
import { PacketMotionData } from "./parsers/packets";
import constants from "./constants";
import * as constantsTypes from "./constants/types";
import { Options } from "./types";
import { Parser } from "binary-parser";
/**
 *
 */
declare class F1TelemetryClient extends EventEmitter {
    port: number;
    client?: dgram.Socket;
    constructor(opts?: Options);
    /**
     *
     * @param {Buffer} buffer
     */
    static parsePacketHeader(buffer: Buffer): Parser.Parsed<any>;
    /**
     *
     * @param {Number} packetId
     */
    static getParserByPacketId(packetId: number): typeof PacketMotionData | null;
    /**
     *
     * @param {Buffer} message
     */
    parseMessage(message: Buffer): void;
    /**
     * Method to start listening for packets
     */
    start(): void;
    /**
     * Method to close the client
     */
    stop(): void;
}
export { F1TelemetryClient, constants, constantsTypes };
