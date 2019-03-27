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
    constructor();
}
