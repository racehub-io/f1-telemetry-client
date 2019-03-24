function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import F1Parser from "../F1Parser";
import MarshalZone from "./MarshalZone";
import WEATHER from "../../constants/weather";
import PacketHeader from "./PacketHeader";
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
  constructor(buffer) {
    super();

    _defineProperty(this, "data", void 0);

    this.endianess("little").nest("m_header", {
      type: new PacketHeader()
    }).uint8("m_weather").int8("m_trackTemperature").int8("m_airTemperature").uint8("m_totalLaps").uint16("m_trackLength") // meters
    .uint8("m_sessionType").int8("m_trackId").uint8("m_era").uint16("m_sessionTimeLeft").uint16("m_sessionDuration").uint8("m_pitSpeedLimit").uint8("m_gamePaused").uint8("m_isSpectating").uint8("m_spectatorCarIndex").uint8("m_sliProNativeSupport").uint8("m_numMarshalZones").array("m_marshalZones", {
      length: 21,
      type: new MarshalZone()
    }).uint8("m_safetyCarStatus").uint8("m_networkGame");
    this.data = this.fromBuffer(buffer);
  }

  getWeather() {
    return WEATHER[this.data.m_weather];
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXJzL3BhY2tldHMvUGFja2V0U2Vzc2lvbkRhdGEudHMiXSwibmFtZXMiOlsiRjFQYXJzZXIiLCJNYXJzaGFsWm9uZSIsIldFQVRIRVIiLCJQYWNrZXRIZWFkZXIiLCJQYWNrZXRTZXNzaW9uRGF0YSIsImNvbnN0cnVjdG9yIiwiYnVmZmVyIiwiZW5kaWFuZXNzIiwibmVzdCIsInR5cGUiLCJ1aW50OCIsImludDgiLCJ1aW50MTYiLCJhcnJheSIsImxlbmd0aCIsImRhdGEiLCJmcm9tQnVmZmVyIiwiZ2V0V2VhdGhlciIsIm1fd2VhdGhlciJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPQSxRQUFQLE1BQXFCLGFBQXJCO0FBQ0EsT0FBT0MsV0FBUCxNQUF3QixlQUF4QjtBQUNBLE9BQU9DLE9BQVAsTUFBb0IseUJBQXBCO0FBQ0EsT0FBT0MsWUFBUCxNQUF5QixnQkFBekI7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLGVBQWUsTUFBTUMsaUJBQU4sU0FBZ0NKLFFBQWhDLENBQXlDO0FBR3RESyxFQUFBQSxXQUFXLENBQUNDLE1BQUQsRUFBaUI7QUFDMUI7O0FBRDBCOztBQUcxQixTQUFLQyxTQUFMLENBQWUsUUFBZixFQUNHQyxJQURILENBQ1EsVUFEUixFQUNvQjtBQUNoQkMsTUFBQUEsSUFBSSxFQUFFLElBQUlOLFlBQUo7QUFEVSxLQURwQixFQUlHTyxLQUpILENBSVMsV0FKVCxFQUtHQyxJQUxILENBS1Esb0JBTFIsRUFNR0EsSUFOSCxDQU1RLGtCQU5SLEVBT0dELEtBUEgsQ0FPUyxhQVBULEVBUUdFLE1BUkgsQ0FRVSxlQVJWLEVBUTJCO0FBUjNCLEtBU0dGLEtBVEgsQ0FTUyxlQVRULEVBVUdDLElBVkgsQ0FVUSxXQVZSLEVBV0dELEtBWEgsQ0FXUyxPQVhULEVBWUdFLE1BWkgsQ0FZVSxtQkFaVixFQWFHQSxNQWJILENBYVUsbUJBYlYsRUFjR0YsS0FkSCxDQWNTLGlCQWRULEVBZUdBLEtBZkgsQ0FlUyxjQWZULEVBZ0JHQSxLQWhCSCxDQWdCUyxnQkFoQlQsRUFpQkdBLEtBakJILENBaUJTLHFCQWpCVCxFQWtCR0EsS0FsQkgsQ0FrQlMsdUJBbEJULEVBbUJHQSxLQW5CSCxDQW1CUyxtQkFuQlQsRUFvQkdHLEtBcEJILENBb0JTLGdCQXBCVCxFQW9CMkI7QUFDdkJDLE1BQUFBLE1BQU0sRUFBRSxFQURlO0FBRXZCTCxNQUFBQSxJQUFJLEVBQUUsSUFBSVIsV0FBSjtBQUZpQixLQXBCM0IsRUF3QkdTLEtBeEJILENBd0JTLG1CQXhCVCxFQXlCR0EsS0F6QkgsQ0F5QlMsZUF6QlQ7QUEyQkEsU0FBS0ssSUFBTCxHQUFZLEtBQUtDLFVBQUwsQ0FBZ0JWLE1BQWhCLENBQVo7QUFDRDs7QUFFRFcsRUFBQUEsVUFBVSxHQUFHO0FBQ1gsV0FBT2YsT0FBTyxDQUFDLEtBQUthLElBQUwsQ0FBVUcsU0FBWCxDQUFkO0FBQ0Q7O0FBdENxRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGMVBhcnNlciBmcm9tIFwiLi4vRjFQYXJzZXJcIjtcbmltcG9ydCBNYXJzaGFsWm9uZSBmcm9tIFwiLi9NYXJzaGFsWm9uZVwiO1xuaW1wb3J0IFdFQVRIRVIgZnJvbSBcIi4uLy4uL2NvbnN0YW50cy93ZWF0aGVyXCI7XG5pbXBvcnQgUGFja2V0SGVhZGVyIGZyb20gXCIuL1BhY2tldEhlYWRlclwiO1xuXG4vKipcbiAqXG4gKiAgc3RydWN0IFBhY2tldFNlc3Npb25EYXRhXG4gKiAge1xuICogICAgUGFja2V0SGVhZGVyICAgIG1faGVhZGVyOyAgICAgICAgICAgICAgICAgLy8gSGVhZGVyXG4gKlxuICogICAgdWludDggICAgICAgICAgIG1fd2VhdGhlcjsgICAgICAgICAgICAgICAgLy8gY29uc3RhbnRzL3dlYXRoZXIuanNcbiAqICAgIGludDggICAgICAgICAgICBtX3RyYWNrVGVtcGVyYXR1cmU7ICAgICAgIC8vIFRyYWNrIHRlbXAuIGluIGRlZ3JlZXMgY2Vsc2l1c1xuICogICAgaW50OCAgICAgICAgICAgIG1fYWlyVGVtcGVyYXR1cmU7ICAgICAgICAgLy8gQWlyIHRlbXAuIGluIGRlZ3JlZXMgY2Vsc2l1c1xuICogICAgdWludDggICAgICAgICAgIG1fdG90YWxMYXBzOyAgICAgICAgICAgICAgLy8gVG90YWwgbnVtYmVyIG9mIGxhcHMgaW4gdGhpcyByYWNlXG4gKiAgICB1aW50MTYgICAgICAgICAgbV90cmFja0xlbmd0aDsgICAgICAgICAgICAvLyBUcmFjayBsZW5ndGggaW4gbWV0cmVzXG4gKiAgICB1aW50OCAgICAgICAgICAgbV9zZXNzaW9uVHlwZTsgICAgICAgICAgICAvLyBjb25zdGFudHMvc2Vzc2lvblR5cGVzLmpzXG4gKiAgICBpbnQ4ICAgICAgICAgICAgbV90cmFja0lkOyAgICAgICAgICAgICAgICAvLyBjb25zdGFudHMvdHJhY2tzLmpzXG4gKiAgICB1aW50OCAgICAgICAgICAgbV9lcmE7ICAgICAgICAgICAgICAgICAgICAvLyBjb25zdGFudHMvZXJhcy5qc1xuICogICAgdWludDE2ICAgICAgICAgIG1fc2Vzc2lvblRpbWVMZWZ0OyAgICAgICAgLy8gVGltZSBsZWZ0IGluIHNlc3Npb24gaW4gc2Vjb25kc1xuICogICAgdWludDE2ICAgICAgICAgIG1fc2Vzc2lvbkR1cmF0aW9uOyAgICAgICAgLy8gU2Vzc2lvbiBkdXJhdGlvbiBpbiBzZWNvbmRzXG4gKiAgICB1aW50OCAgICAgICAgICAgbV9waXRTcGVlZExpbWl0OyAgICAgICAgICAvLyBQaXQgc3BlZWQgbGltaXQgaW4ga2lsb21ldHJlcyBwZXIgaG91clxuICogICAgdWludDggICAgICAgICAgIG1fZ2FtZVBhdXNlZDsgICAgICAgICAgICAgLy8gV2hldGhlciB0aGUgZ2FtZSBpcyBwYXVzZWRcbiAqICAgIHVpbnQ4ICAgICAgICAgICBtX2lzU3BlY3RhdGluZzsgICAgICAgICAgIC8vIFdoZXRoZXIgdGhlIHBsYXllciBpcyBzcGVjdGF0aW5nXG4gKiAgICB1aW50OCAgICAgICAgICAgbV9zcGVjdGF0b3JDYXJJbmRleDsgICAgICAvLyBJbmRleCBvZiB0aGUgY2FyIGJlaW5nIHNwZWN0YXRlZFxuICogICAgdWludDggICAgICAgICAgIG1fc2xpUHJvTmF0aXZlU3VwcG9ydDsgICAgLy8gU0xJIFBybyBzdXBwb3J0LCAwID0gaW5hY3RpdmUsIDEgPSBhY3RpdmVcbiAqICAgIHVpbnQ4ICAgICAgICAgICBtX251bU1hcnNoYWxab25lczsgICAgICAgIC8vIE51bWJlciBvZiBtYXJzaGFsIHpvbmVzIHRvIGZvbGxvd1xuICogICAgTWFyc2hhbFpvbmUgICAgIG1fbWFyc2hhbFpvbmVzWzIxXTsgICAgICAgLy8gTGlzdCBvZiBtYXJzaGFsIHpvbmVzIOKAkyBtYXggMjFcbiAqICAgIHVpbnQ4ICAgICAgICAgICBtX3NhZmV0eUNhclN0YXR1czsgICAgICAgIC8vIGNvbnN0YW50cy9zYXRlZnlDYXJTdGF0dXNlcy5qc1xuICogICAgdW5pbnQ4ICAgICAgICAgIG1fbmV0d29ya0dhbWU7ICAgICAgICAgICAgLy8gMCA9IG9mZmxpbmUsIDEgPSBvbmxpbmVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFja2V0U2Vzc2lvbkRhdGEgZXh0ZW5kcyBGMVBhcnNlciB7XG4gIGRhdGE6IGFueTtcblxuICBjb25zdHJ1Y3RvcihidWZmZXI6IEJ1ZmZlcikge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmVuZGlhbmVzcyhcImxpdHRsZVwiKVxuICAgICAgLm5lc3QoXCJtX2hlYWRlclwiLCB7XG4gICAgICAgIHR5cGU6IG5ldyBQYWNrZXRIZWFkZXIoKVxuICAgICAgfSlcbiAgICAgIC51aW50OChcIm1fd2VhdGhlclwiKVxuICAgICAgLmludDgoXCJtX3RyYWNrVGVtcGVyYXR1cmVcIilcbiAgICAgIC5pbnQ4KFwibV9haXJUZW1wZXJhdHVyZVwiKVxuICAgICAgLnVpbnQ4KFwibV90b3RhbExhcHNcIilcbiAgICAgIC51aW50MTYoXCJtX3RyYWNrTGVuZ3RoXCIpIC8vIG1ldGVyc1xuICAgICAgLnVpbnQ4KFwibV9zZXNzaW9uVHlwZVwiKVxuICAgICAgLmludDgoXCJtX3RyYWNrSWRcIilcbiAgICAgIC51aW50OChcIm1fZXJhXCIpXG4gICAgICAudWludDE2KFwibV9zZXNzaW9uVGltZUxlZnRcIilcbiAgICAgIC51aW50MTYoXCJtX3Nlc3Npb25EdXJhdGlvblwiKVxuICAgICAgLnVpbnQ4KFwibV9waXRTcGVlZExpbWl0XCIpXG4gICAgICAudWludDgoXCJtX2dhbWVQYXVzZWRcIilcbiAgICAgIC51aW50OChcIm1faXNTcGVjdGF0aW5nXCIpXG4gICAgICAudWludDgoXCJtX3NwZWN0YXRvckNhckluZGV4XCIpXG4gICAgICAudWludDgoXCJtX3NsaVByb05hdGl2ZVN1cHBvcnRcIilcbiAgICAgIC51aW50OChcIm1fbnVtTWFyc2hhbFpvbmVzXCIpXG4gICAgICAuYXJyYXkoXCJtX21hcnNoYWxab25lc1wiLCB7XG4gICAgICAgIGxlbmd0aDogMjEsXG4gICAgICAgIHR5cGU6IG5ldyBNYXJzaGFsWm9uZSgpXG4gICAgICB9KVxuICAgICAgLnVpbnQ4KFwibV9zYWZldHlDYXJTdGF0dXNcIilcbiAgICAgIC51aW50OChcIm1fbmV0d29ya0dhbWVcIik7XG5cbiAgICB0aGlzLmRhdGEgPSB0aGlzLmZyb21CdWZmZXIoYnVmZmVyKTtcbiAgfVxuXG4gIGdldFdlYXRoZXIoKSB7XG4gICAgcmV0dXJuIFdFQVRIRVJbdGhpcy5kYXRhLm1fd2VhdGhlcl07XG4gIH1cbn1cbiJdfQ==