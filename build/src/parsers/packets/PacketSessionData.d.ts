import F1Parser from "../F1Parser";
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
export default class PacketSessionData extends F1Parser {
    data: any;
    constructor(buffer: Buffer);
    getWeather(): string;
}
