"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const F1Parser_1 = require("../F1Parser");
const MarshalZone_1 = require("./MarshalZone");
const weather_1 = require("../../constants/weather");
const PacketHeader_1 = require("./PacketHeader");
/**
 *
 *  struct PacketSessionData
 *  {
 *    PacketHeader    m_header;                 // Header
 *
 *    uint8           m_weather;                // constants/weather.js
 *    int8            m_trackTemperature;       // Track temp. in degrees celsius
 *    int8            m_airTemperature;         // Air temp. in degrees celsius
 *    uint8           m_totalLaps;              // Total number of laps in this race
 *    uint16          m_trackLength;            // Track length in metres
 *    uint8           m_sessionType;            // constants/sessionTypes.js
 *    int8            m_trackId;                // constants/tracks.js
 *    uint8           m_era;                    // constants/eras.js
 *    uint16          m_sessionTimeLeft;        // Time left in session in seconds
 *    uint16          m_sessionDuration;        // Session duration in seconds
 *    uint8           m_pitSpeedLimit;          // Pit speed limit in kilometres per hour
 *    uint8           m_gamePaused;             // Whether the game is paused
 *    uint8           m_isSpectating;           // Whether the player is spectating
 *    uint8           m_spectatorCarIndex;      // Index of the car being spectated
 *    uint8           m_sliProNativeSupport;    // SLI Pro support, 0 = inactive, 1 = active
 *    uint8           m_numMarshalZones;        // Number of marshal zones to follow
 *    MarshalZone     m_marshalZones[21];       // List of marshal zones – max 21
 *    uint8           m_safetyCarStatus;        // constants/satefyCarStatuses.js
 *    unint8          m_networkGame;            // 0 = offline, 1 = online
 */
class PacketSessionData extends F1Parser_1.default {
    constructor(buffer) {
        super();
        this.endianess("little")
            .nest("m_header", {
            type: new PacketHeader_1.default()
        })
            .uint8("m_weather")
            .int8("m_trackTemperature")
            .int8("m_airTemperature")
            .uint8("m_totalLaps")
            .uint16("m_trackLength") // meters
            .uint8("m_sessionType")
            .int8("m_trackId")
            .uint8("m_era")
            .uint16("m_sessionTimeLeft")
            .uint16("m_sessionDuration")
            .uint8("m_pitSpeedLimit")
            .uint8("m_gamePaused")
            .uint8("m_isSpectating")
            .uint8("m_spectatorCarIndex")
            .uint8("m_sliProNativeSupport")
            .uint8("m_numMarshalZones")
            .array("m_marshalZones", {
            length: 21,
            type: new MarshalZone_1.default()
        })
            .uint8("m_safetyCarStatus")
            .uint8("m_networkGame");
        this.data = this.fromBuffer(buffer);
    }
    getWeather() {
        return weather_1.default[this.data.m_weather];
    }
}
exports.default = PacketSessionData;
//# sourceMappingURL=PacketSessionData.js.map