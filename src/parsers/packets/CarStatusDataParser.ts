import {Parser} from 'binary-parser';

import {F1Parser} from '../F1Parser';

export class CarStatusDataParser extends F1Parser {
  constructor() {
    super();
    this.uint8('m_tractionControl')
        .uint8('m_antiLockBrakes')
        .uint8('m_fuelMix')
        .uint8('m_frontBrakeBias')
        .uint8('m_pitLimiterStatus')
        .floatle('m_fuelInTank')
        .floatle('m_fuelCapacity')
        .uint16le('m_maxRPM')
        .uint16le('m_idleRPM')
        .uint8('m_maxGears')
        .uint8('m_drsAllowed')
        .array('m_tyresWear', {
          length: 4,
          type: new Parser().uint8('m_tyresWear'),
        })
        .uint8('m_tyreCompound')
        .array('m_tyresDamage', {
          length: 4,
          type: new Parser().uint8('m_tyresDamage'),
        })
        .uint8('m_frontLeftWingDamage')
        .uint8('m_frontRightWingDamage')
        .uint8('m_rearWingDamage')
        .uint8('m_engineDamage')
        .uint8('m_gearBoxDamage')
        .uint8('m_exhaustDamage')
        .int8('m_vehicleFiaFlags')
        .floatle('m_ersStoreEnergy')
        .uint8('m_ersDeployMode')
        .floatle('m_ersHarvestedThisLapMGUK')
        .floatle('m_ersHarvestedThisLapMGUH')
        .floatle('m_ersDeployedThisLap');
  }
}
