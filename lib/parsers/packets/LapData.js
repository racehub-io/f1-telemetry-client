import F1Parser from '../F1Parser';
/*
struct LapData
{
    float       m_lastLapTime;           // Last lap time in seconds
    float       m_currentLapTime;        // Current time around the lap in seconds
    float       m_bestLapTime;           // Best lap time of the session in seconds
    float       m_sector1Time;           // Sector 1 time in seconds
    float       m_sector2Time;           // Sector 2 time in seconds
    float       m_lapDistance;           // Distance vehicle is around current lap in metres – could
                                         // be negative if line hasn’t been crossed yet
    float       m_totalDistance;         // Total distance travelled in session in metres – could
                                         // be negative if line hasn’t been crossed yet
    float       m_safetyCarDelta;        // Delta in seconds for safety car
    uint8       m_carPosition;           // Car race position
    uint8       m_currentLapNum;         // Current lap number
    uint8       m_pitStatus;             // 0 = none, 1 = pitting, 2 = in pit area
    uint8       m_sector;                // 0 = sector1, 1 = sector2, 2 = sector3
    uint8       m_currentLapInvalid;     // Current lap invalid - 0 = valid, 1 = invalid
    uint8       m_penalties;             // Accumulated time penalties in seconds to be added
    uint8       m_gridPosition;          // Grid position the vehicle started the race in
    uint8       m_driverStatus;          // Status of driver - 0 = in garage, 1 = flying lap
                                         // 2 = in lap, 3 = out lap, 4 = on track
    uint8       m_resultStatus;          // Result status - 0 = invalid, 1 = inactive, 2 = active
                                         // 3 = finished, 4 = disqualified, 5 = not classified
                                         // 6 = retired
};
*/

export default class LapData extends F1Parser {
  constructor() {
    super();
    this.endianess('little').floatle('m_lastLapTime') // Last lap time in seconds
    .floatle('m_currentLapTime') // Current time around the lap in seconds
    .floatle('m_bestLapTime') // Best lap time of the session in seconds
    .floatle('m_sector1Time') // Sector 1 time in seconds
    .floatle('m_sector2Time') // Sector 2 time in seconds
    .floatle('m_lapDistance') // Distance vehicle is around current lap in metres – could be negative if line hasn’t been crossed yet
    .floatle('m_totalDistance') // Total distance travelled in session in metres – could be negative if line hasn’t been crossed yet
    .floatle('m_safetyCarDelta') // Delta in seconds for safety car
    .uint8("m_carPosition") // Car race position
    .uint8("m_currentLapNum") // Current lap number
    .uint8("m_pitStatus") // 0 = none, 1 = pitting, 2 = in pit area
    .uint8("m_sector") // 0 = sector1, 1 = sector2, 2 = sector3
    .uint8("m_currentLapInvalid") // Current lap invalid - 0 = valid, 1 = invalid
    .uint8("m_penalties") // Accumulated time penalties in seconds to be added
    .uint8("m_gridPosition") // Grid position the vehicle started the race in
    .uint8("m_driverStatus") // Status of driver - 0 = in garage, 1 = flying lap 2 = in lap, 3 = out lap, 4 = on track
    .uint8("m_resultStatus"); // Result status - 0 = invalid, 1 = inactive, 2 = active 3 = finished, 4 = disqualified, 5 = not classified 6 = retired
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXJzL3BhY2tldHMvTGFwRGF0YS50cyJdLCJuYW1lcyI6WyJGMVBhcnNlciIsIkxhcERhdGEiLCJjb25zdHJ1Y3RvciIsImVuZGlhbmVzcyIsImZsb2F0bGUiLCJ1aW50OCJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsUUFBUCxNQUFxQixhQUFyQjtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNEJBLGVBQWUsTUFBTUMsT0FBTixTQUFzQkQsUUFBdEIsQ0FBK0I7QUFDNUNFLEVBQUFBLFdBQVcsR0FBRztBQUNaO0FBQ0EsU0FBS0MsU0FBTCxDQUFlLFFBQWYsRUFDR0MsT0FESCxDQUNXLGVBRFgsRUFDNEI7QUFENUIsS0FFR0EsT0FGSCxDQUVXLGtCQUZYLEVBRStCO0FBRi9CLEtBR0dBLE9BSEgsQ0FHVyxlQUhYLEVBRzRCO0FBSDVCLEtBSUdBLE9BSkgsQ0FJVyxlQUpYLEVBSTRCO0FBSjVCLEtBS0dBLE9BTEgsQ0FLVyxlQUxYLEVBSzRCO0FBTDVCLEtBTUdBLE9BTkgsQ0FNVyxlQU5YLEVBTTRCO0FBTjVCLEtBT0dBLE9BUEgsQ0FPVyxpQkFQWCxFQU84QjtBQVA5QixLQVFHQSxPQVJILENBUVcsa0JBUlgsRUFRK0I7QUFSL0IsS0FTR0MsS0FUSCxDQVNTLGVBVFQsRUFTMEI7QUFUMUIsS0FVR0EsS0FWSCxDQVVTLGlCQVZULEVBVTRCO0FBVjVCLEtBV0dBLEtBWEgsQ0FXUyxhQVhULEVBV3dCO0FBWHhCLEtBWUdBLEtBWkgsQ0FZUyxVQVpULEVBWXFCO0FBWnJCLEtBYUdBLEtBYkgsQ0FhUyxxQkFiVCxFQWFnQztBQWJoQyxLQWNHQSxLQWRILENBY1MsYUFkVCxFQWN3QjtBQWR4QixLQWVHQSxLQWZILENBZVMsZ0JBZlQsRUFlMkI7QUFmM0IsS0FnQkdBLEtBaEJILENBZ0JTLGdCQWhCVCxFQWdCMkI7QUFoQjNCLEtBaUJHQSxLQWpCSCxDQWlCUyxnQkFqQlQsRUFGWSxDQW1CZTtBQUM1Qjs7QUFyQjJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEYxUGFyc2VyIGZyb20gJy4uL0YxUGFyc2VyJztcblxuLypcbnN0cnVjdCBMYXBEYXRhXG57XG4gICAgZmxvYXQgICAgICAgbV9sYXN0TGFwVGltZTsgICAgICAgICAgIC8vIExhc3QgbGFwIHRpbWUgaW4gc2Vjb25kc1xuICAgIGZsb2F0ICAgICAgIG1fY3VycmVudExhcFRpbWU7ICAgICAgICAvLyBDdXJyZW50IHRpbWUgYXJvdW5kIHRoZSBsYXAgaW4gc2Vjb25kc1xuICAgIGZsb2F0ICAgICAgIG1fYmVzdExhcFRpbWU7ICAgICAgICAgICAvLyBCZXN0IGxhcCB0aW1lIG9mIHRoZSBzZXNzaW9uIGluIHNlY29uZHNcbiAgICBmbG9hdCAgICAgICBtX3NlY3RvcjFUaW1lOyAgICAgICAgICAgLy8gU2VjdG9yIDEgdGltZSBpbiBzZWNvbmRzXG4gICAgZmxvYXQgICAgICAgbV9zZWN0b3IyVGltZTsgICAgICAgICAgIC8vIFNlY3RvciAyIHRpbWUgaW4gc2Vjb25kc1xuICAgIGZsb2F0ICAgICAgIG1fbGFwRGlzdGFuY2U7ICAgICAgICAgICAvLyBEaXN0YW5jZSB2ZWhpY2xlIGlzIGFyb3VuZCBjdXJyZW50IGxhcCBpbiBtZXRyZXMg4oCTIGNvdWxkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJlIG5lZ2F0aXZlIGlmIGxpbmUgaGFzbuKAmXQgYmVlbiBjcm9zc2VkIHlldFxuICAgIGZsb2F0ICAgICAgIG1fdG90YWxEaXN0YW5jZTsgICAgICAgICAvLyBUb3RhbCBkaXN0YW5jZSB0cmF2ZWxsZWQgaW4gc2Vzc2lvbiBpbiBtZXRyZXMg4oCTIGNvdWxkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJlIG5lZ2F0aXZlIGlmIGxpbmUgaGFzbuKAmXQgYmVlbiBjcm9zc2VkIHlldFxuICAgIGZsb2F0ICAgICAgIG1fc2FmZXR5Q2FyRGVsdGE7ICAgICAgICAvLyBEZWx0YSBpbiBzZWNvbmRzIGZvciBzYWZldHkgY2FyXG4gICAgdWludDggICAgICAgbV9jYXJQb3NpdGlvbjsgICAgICAgICAgIC8vIENhciByYWNlIHBvc2l0aW9uXG4gICAgdWludDggICAgICAgbV9jdXJyZW50TGFwTnVtOyAgICAgICAgIC8vIEN1cnJlbnQgbGFwIG51bWJlclxuICAgIHVpbnQ4ICAgICAgIG1fcGl0U3RhdHVzOyAgICAgICAgICAgICAvLyAwID0gbm9uZSwgMSA9IHBpdHRpbmcsIDIgPSBpbiBwaXQgYXJlYVxuICAgIHVpbnQ4ICAgICAgIG1fc2VjdG9yOyAgICAgICAgICAgICAgICAvLyAwID0gc2VjdG9yMSwgMSA9IHNlY3RvcjIsIDIgPSBzZWN0b3IzXG4gICAgdWludDggICAgICAgbV9jdXJyZW50TGFwSW52YWxpZDsgICAgIC8vIEN1cnJlbnQgbGFwIGludmFsaWQgLSAwID0gdmFsaWQsIDEgPSBpbnZhbGlkXG4gICAgdWludDggICAgICAgbV9wZW5hbHRpZXM7ICAgICAgICAgICAgIC8vIEFjY3VtdWxhdGVkIHRpbWUgcGVuYWx0aWVzIGluIHNlY29uZHMgdG8gYmUgYWRkZWRcbiAgICB1aW50OCAgICAgICBtX2dyaWRQb3NpdGlvbjsgICAgICAgICAgLy8gR3JpZCBwb3NpdGlvbiB0aGUgdmVoaWNsZSBzdGFydGVkIHRoZSByYWNlIGluXG4gICAgdWludDggICAgICAgbV9kcml2ZXJTdGF0dXM7ICAgICAgICAgIC8vIFN0YXR1cyBvZiBkcml2ZXIgLSAwID0gaW4gZ2FyYWdlLCAxID0gZmx5aW5nIGxhcFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAyID0gaW4gbGFwLCAzID0gb3V0IGxhcCwgNCA9IG9uIHRyYWNrXG4gICAgdWludDggICAgICAgbV9yZXN1bHRTdGF0dXM7ICAgICAgICAgIC8vIFJlc3VsdCBzdGF0dXMgLSAwID0gaW52YWxpZCwgMSA9IGluYWN0aXZlLCAyID0gYWN0aXZlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDMgPSBmaW5pc2hlZCwgNCA9IGRpc3F1YWxpZmllZCwgNSA9IG5vdCBjbGFzc2lmaWVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDYgPSByZXRpcmVkXG59O1xuKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGFwRGF0YSBleHRlbmRzIEYxUGFyc2VyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmVuZGlhbmVzcygnbGl0dGxlJylcbiAgICAgIC5mbG9hdGxlKCdtX2xhc3RMYXBUaW1lJykgLy8gTGFzdCBsYXAgdGltZSBpbiBzZWNvbmRzXG4gICAgICAuZmxvYXRsZSgnbV9jdXJyZW50TGFwVGltZScpIC8vIEN1cnJlbnQgdGltZSBhcm91bmQgdGhlIGxhcCBpbiBzZWNvbmRzXG4gICAgICAuZmxvYXRsZSgnbV9iZXN0TGFwVGltZScpIC8vIEJlc3QgbGFwIHRpbWUgb2YgdGhlIHNlc3Npb24gaW4gc2Vjb25kc1xuICAgICAgLmZsb2F0bGUoJ21fc2VjdG9yMVRpbWUnKSAvLyBTZWN0b3IgMSB0aW1lIGluIHNlY29uZHNcbiAgICAgIC5mbG9hdGxlKCdtX3NlY3RvcjJUaW1lJykgLy8gU2VjdG9yIDIgdGltZSBpbiBzZWNvbmRzXG4gICAgICAuZmxvYXRsZSgnbV9sYXBEaXN0YW5jZScpIC8vIERpc3RhbmNlIHZlaGljbGUgaXMgYXJvdW5kIGN1cnJlbnQgbGFwIGluIG1ldHJlcyDigJMgY291bGQgYmUgbmVnYXRpdmUgaWYgbGluZSBoYXNu4oCZdCBiZWVuIGNyb3NzZWQgeWV0XG4gICAgICAuZmxvYXRsZSgnbV90b3RhbERpc3RhbmNlJykgLy8gVG90YWwgZGlzdGFuY2UgdHJhdmVsbGVkIGluIHNlc3Npb24gaW4gbWV0cmVzIOKAkyBjb3VsZCBiZSBuZWdhdGl2ZSBpZiBsaW5lIGhhc27igJl0IGJlZW4gY3Jvc3NlZCB5ZXRcbiAgICAgIC5mbG9hdGxlKCdtX3NhZmV0eUNhckRlbHRhJykgLy8gRGVsdGEgaW4gc2Vjb25kcyBmb3Igc2FmZXR5IGNhclxuICAgICAgLnVpbnQ4KFwibV9jYXJQb3NpdGlvblwiKSAvLyBDYXIgcmFjZSBwb3NpdGlvblxuICAgICAgLnVpbnQ4KFwibV9jdXJyZW50TGFwTnVtXCIpIC8vIEN1cnJlbnQgbGFwIG51bWJlclxuICAgICAgLnVpbnQ4KFwibV9waXRTdGF0dXNcIikgLy8gMCA9IG5vbmUsIDEgPSBwaXR0aW5nLCAyID0gaW4gcGl0IGFyZWFcbiAgICAgIC51aW50OChcIm1fc2VjdG9yXCIpIC8vIDAgPSBzZWN0b3IxLCAxID0gc2VjdG9yMiwgMiA9IHNlY3RvcjNcbiAgICAgIC51aW50OChcIm1fY3VycmVudExhcEludmFsaWRcIikgLy8gQ3VycmVudCBsYXAgaW52YWxpZCAtIDAgPSB2YWxpZCwgMSA9IGludmFsaWRcbiAgICAgIC51aW50OChcIm1fcGVuYWx0aWVzXCIpIC8vIEFjY3VtdWxhdGVkIHRpbWUgcGVuYWx0aWVzIGluIHNlY29uZHMgdG8gYmUgYWRkZWRcbiAgICAgIC51aW50OChcIm1fZ3JpZFBvc2l0aW9uXCIpIC8vIEdyaWQgcG9zaXRpb24gdGhlIHZlaGljbGUgc3RhcnRlZCB0aGUgcmFjZSBpblxuICAgICAgLnVpbnQ4KFwibV9kcml2ZXJTdGF0dXNcIikgLy8gU3RhdHVzIG9mIGRyaXZlciAtIDAgPSBpbiBnYXJhZ2UsIDEgPSBmbHlpbmcgbGFwIDIgPSBpbiBsYXAsIDMgPSBvdXQgbGFwLCA0ID0gb24gdHJhY2tcbiAgICAgIC51aW50OChcIm1fcmVzdWx0U3RhdHVzXCIpIC8vIFJlc3VsdCBzdGF0dXMgLSAwID0gaW52YWxpZCwgMSA9IGluYWN0aXZlLCAyID0gYWN0aXZlIDMgPSBmaW5pc2hlZCwgNCA9IGRpc3F1YWxpZmllZCwgNSA9IG5vdCBjbGFzc2lmaWVkIDYgPSByZXRpcmVkXG4gIH1cbn0iXX0=