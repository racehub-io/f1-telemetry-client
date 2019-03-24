import F1Parser from '../F1Parser';
/**
 *   struct PacketHeader
 *   {
 *     uint16    m_packetFormat;         // 2018
 *     uint8     m_packetVersion;        // Version of this packet type, all start from 1
 *     uint8     m_packetId;             // Identifier for the packet type, see below
 *     uint64    m_sessionUID;           // Unique identifier for the session
 *     float     m_sessionTime;          // Session timestamp
 *     uint      m_frameIdentifier;      // Identifier for the frame the data was retrieved on
 *     uint8     m_playerCarIndex;       // Index of player's car in the array
 *   };
 */

export default class PacketHeader extends F1Parser {
  constructor() {
    super();
    this.endianess('little').uint16('m_packetFormat').uint8('m_packetVersion').uint8('m_packetId') // skips 'm_sessionUID'
    .skip(8) //.buffer('m_sessionUID', {
    //  length: 8,
    //  clone: true,
    //  formatter: buf => buf.toString('ascii'),
    //})
    .floatle('m_sessionTime').uint32('m_frameIdentifier').uint8('m_playerCarIndex');
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXJzL3BhY2tldHMvUGFja2V0SGVhZGVyLnRzIl0sIm5hbWVzIjpbIkYxUGFyc2VyIiwiUGFja2V0SGVhZGVyIiwiY29uc3RydWN0b3IiLCJlbmRpYW5lc3MiLCJ1aW50MTYiLCJ1aW50OCIsInNraXAiLCJmbG9hdGxlIiwidWludDMyIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxRQUFQLE1BQXFCLGFBQXJCO0FBRUE7Ozs7Ozs7Ozs7Ozs7QUFhQSxlQUFlLE1BQU1DLFlBQU4sU0FBMkJELFFBQTNCLENBQW9DO0FBQ2pERSxFQUFBQSxXQUFXLEdBQUc7QUFDWjtBQUNBLFNBQUtDLFNBQUwsQ0FBZSxRQUFmLEVBQ0dDLE1BREgsQ0FDVSxnQkFEVixFQUVHQyxLQUZILENBRVMsaUJBRlQsRUFHR0EsS0FISCxDQUdTLFlBSFQsRUFJRTtBQUpGLEtBS0dDLElBTEgsQ0FLUSxDQUxSLEVBTUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVZGLEtBV0dDLE9BWEgsQ0FXVyxlQVhYLEVBWUdDLE1BWkgsQ0FZVSxtQkFaVixFQWFHSCxLQWJILENBYVMsa0JBYlQ7QUFjRDs7QUFqQmdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEYxUGFyc2VyIGZyb20gJy4uL0YxUGFyc2VyJztcblxuLyoqXG4gKiAgIHN0cnVjdCBQYWNrZXRIZWFkZXJcbiAqICAge1xuICogICAgIHVpbnQxNiAgICBtX3BhY2tldEZvcm1hdDsgICAgICAgICAvLyAyMDE4XG4gKiAgICAgdWludDggICAgIG1fcGFja2V0VmVyc2lvbjsgICAgICAgIC8vIFZlcnNpb24gb2YgdGhpcyBwYWNrZXQgdHlwZSwgYWxsIHN0YXJ0IGZyb20gMVxuICogICAgIHVpbnQ4ICAgICBtX3BhY2tldElkOyAgICAgICAgICAgICAvLyBJZGVudGlmaWVyIGZvciB0aGUgcGFja2V0IHR5cGUsIHNlZSBiZWxvd1xuICogICAgIHVpbnQ2NCAgICBtX3Nlc3Npb25VSUQ7ICAgICAgICAgICAvLyBVbmlxdWUgaWRlbnRpZmllciBmb3IgdGhlIHNlc3Npb25cbiAqICAgICBmbG9hdCAgICAgbV9zZXNzaW9uVGltZTsgICAgICAgICAgLy8gU2Vzc2lvbiB0aW1lc3RhbXBcbiAqICAgICB1aW50ICAgICAgbV9mcmFtZUlkZW50aWZpZXI7ICAgICAgLy8gSWRlbnRpZmllciBmb3IgdGhlIGZyYW1lIHRoZSBkYXRhIHdhcyByZXRyaWV2ZWQgb25cbiAqICAgICB1aW50OCAgICAgbV9wbGF5ZXJDYXJJbmRleDsgICAgICAgLy8gSW5kZXggb2YgcGxheWVyJ3MgY2FyIGluIHRoZSBhcnJheVxuICogICB9O1xuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhY2tldEhlYWRlciBleHRlbmRzIEYxUGFyc2VyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmVuZGlhbmVzcygnbGl0dGxlJylcbiAgICAgIC51aW50MTYoJ21fcGFja2V0Rm9ybWF0JylcbiAgICAgIC51aW50OCgnbV9wYWNrZXRWZXJzaW9uJylcbiAgICAgIC51aW50OCgnbV9wYWNrZXRJZCcpXG4gICAgICAvLyBza2lwcyAnbV9zZXNzaW9uVUlEJ1xuICAgICAgLnNraXAoOClcbiAgICAgIC8vLmJ1ZmZlcignbV9zZXNzaW9uVUlEJywge1xuICAgICAgLy8gIGxlbmd0aDogOCxcbiAgICAgIC8vICBjbG9uZTogdHJ1ZSxcbiAgICAgIC8vICBmb3JtYXR0ZXI6IGJ1ZiA9PiBidWYudG9TdHJpbmcoJ2FzY2lpJyksXG4gICAgICAvL30pXG4gICAgICAuZmxvYXRsZSgnbV9zZXNzaW9uVGltZScpXG4gICAgICAudWludDMyKCdtX2ZyYW1lSWRlbnRpZmllcicpXG4gICAgICAudWludDgoJ21fcGxheWVyQ2FySW5kZXgnKTtcbiAgfVxufSJdfQ==