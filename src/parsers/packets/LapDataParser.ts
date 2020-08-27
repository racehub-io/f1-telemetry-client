import {F1Parser} from '../F1Parser';

export class LapDataParser extends F1Parser {
  constructor(packetFormat: number) {
    super();

    this.endianess('little')
        .floatle('m_lastLapTime')
        .floatle('m_currentLapTime');

    if (packetFormat === 2020) {
      this.uint16('m_sector1TimeInMS').uint16('m_sector2TimeInMS');
    }

    this.floatle('m_bestLapTime');

    if (packetFormat === 2018 || packetFormat === 2019) {
      this.floatle('m_sector1Time').floatle('m_sector2Time');
    }

    if (packetFormat === 2020) {
      this.uint8('m_bestLapNum')
          .uint16('m_bestLapSector1TimeInMS')
          .uint16('m_bestLapSector2TimeInMS')
          .uint16('m_bestLapSector3TimeInMS')
          .uint16('m_bestOverallSector1TimeInMS')
          .uint8('m_bestOverallSector1LapNum')
          .uint16('m_bestOverallSector2TimeInMS')
          .uint8('m_bestOverallSector2LapNum')
          .uint16('m_bestOverallSector3TimeInMS')
          .uint8('m_bestOverallSector3LapNum');
    }

    this.floatle('m_lapDistance')
        .floatle('m_totalDistance')
        .floatle('m_safetyCarDelta')
        .uint8('m_carPosition')
        .uint8('m_currentLapNum')
        .uint8('m_pitStatus')
        .uint8('m_sector')
        .uint8('m_currentLapInvalid')
        .uint8('m_penalties')
        .uint8('m_gridPosition')
        .uint8('m_driverStatus')
        .uint8('m_resultStatus');
  }
}
