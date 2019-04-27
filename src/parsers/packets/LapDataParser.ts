import {F1Parser} from '../F1Parser';

export class LapDataParser extends F1Parser {
  constructor() {
    super();
    this.endianess('little')
        .floatle('m_lastLapTime')     // Last lap time in seconds
        .floatle('m_currentLapTime')  // Current time around the lap in seconds
        .floatle('m_bestLapTime')     // Best lap time of the session in seconds
        .floatle('m_sector1Time')     // Sector 1 time in seconds
        .floatle('m_sector2Time')     // Sector 2 time in seconds
        .floatle('m_lapDistance')  // Distance vehicle is around current lap in
        // metres – could be negative if line hasn’t
        // been crossed yet
        .floatle('m_totalDistance')  // Total distance travelled in session in
        // metres – could be negative if line
        // hasn’t been crossed yet
        .floatle('m_safetyCarDelta')   // Delta in seconds for safety car
        .uint8('m_carPosition')        // Car race position
        .uint8('m_currentLapNum')      // Current lap number
        .uint8('m_pitStatus')          // 0 = none, 1 = pitting, 2 = in pit area
        .uint8('m_sector')             // 0 = sector1, 1 = sector2, 2 = sector3
        .uint8('m_currentLapInvalid')  // Current lap invalid - 0 = valid, 1 =
        // invalid
        .uint8(
            'm_penalties')  // Accumulated time penalties in seconds to be added
        .uint8(
            'm_gridPosition')  // Grid position the vehicle started the race in
        .uint8(
            'm_driverStatus')  // Status of driver - 0 = in garage, 1 = flying
        // lap 2 = in lap, 3 = out lap, 4 = on track
        .uint8('m_resultStatus');  // Result status - 0 = invalid, 1 = inactive,
    // 2 = active 3 = finished, 4 = disqualified,
    // 5 = not classified 6 = retired
  }
}
