"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const F1Parser_1 = require("../F1Parser");
const CarMotionData_1 = require("./CarMotionData");
const PacketHeader_1 = require("./PacketHeader");
const binary_parser_1 = require("binary-parser");
/*
struct PacketMotionData
{
    PacketHeader    m_header;               // Header

    CarMotionData   m_carMotionData[20];    // Data for all cars on track

    // Extra player car ONLY data
    float         m_suspensionPosition[4];       // Note: All wheel arrays have the following order:
    float         m_suspensionVelocity[4];       // RL, RR, FL, FR
    float         m_suspensionAcceleration[4];   // RL, RR, FL, FR
    float         m_wheelSpeed[4];               // Speed of each wheel
    float         m_wheelSlip[4];                // Slip ratio for each wheel
    float         m_localVelocityX;              // Velocity in local space
    float         m_localVelocityY;              // Velocity in local space
    float         m_localVelocityZ;              // Velocity in local space
    float         m_angularVelocityX;            // Angular velocity x-component
    float         m_angularVelocityY;            // Angular velocity y-component
    float         m_angularVelocityZ;            // Angular velocity z-component
    float         m_angularAccelerationX;        // Angular velocity x-component
    float         m_angularAccelerationY;        // Angular velocity y-component
    float         m_angularAccelerationZ;        // Angular velocity z-component
    float         m_frontWheelsAngle;            // Current front wheels angle in radians
};
*/
class PacketMotionData extends F1Parser_1.default {
    constructor(buffer) {
        super();
        this.endianess("little")
            .nest("m_header", {
            type: new PacketHeader_1.default()
        })
            .array("m_carMotionData", {
            length: 20,
            type: new CarMotionData_1.default()
        })
            .array("m_suspensionPosition", {
            length: 4,
            type: new binary_parser_1.Parser().floatle("m_suspensionPosition")
        })
            .array("m_suspensionVelocity", {
            length: 4,
            type: new binary_parser_1.Parser().floatle("m_suspensionVelocity")
        })
            .array("m_suspensionAcceleration", {
            length: 4,
            type: new binary_parser_1.Parser().floatle("m_suspensionAcceleration")
        })
            .array("m_wheelSpeed", {
            length: 4,
            type: new binary_parser_1.Parser().floatle("m_wheelSpeed")
        })
            .array("m_wheelSlip", {
            length: 4,
            type: new binary_parser_1.Parser().floatle("m_wheelSlip")
        })
            .floatle("m_localVelocityX") // Velocity in local space
            .floatle("m_localVelocityY") // Velocity in local space
            .floatle("m_localVelocityZ") // Velocity in local space
            .floatle("m_angularVelocityX") // Angular velocity x-component
            .floatle("m_angularVelocityY") // Angular velocity y-component
            .floatle("m_angularVelocityZ") // Angular velocity z-component
            .floatle("m_angularAccelerationX") // Angular velocity x-component
            .floatle("m_angularAccelerationY") // Angular velocity y-component
            .floatle("m_angularAccelerationZ") // Angular velocity z-component
            .floatle("m_frontWheelsAngle"); // Current front wheels angle in radians;
        this.data = this.fromBuffer(buffer);
    }
}
exports.default = PacketMotionData;
//# sourceMappingURL=PacketMotionData.js.map