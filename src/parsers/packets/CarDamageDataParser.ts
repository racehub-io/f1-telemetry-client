import {Parser} from 'binary-parser';

import {F1Parser} from '../F1Parser';

export class CarDamageDataParser extends F1Parser {
  constructor() {
    super();
    this.array('m_tyresWear', {
          length: 4,
          type: new Parser().floatle(''),
        })
        .array('m_tyresDamage', {
              length: 4,
              type: new Parser().uint8(''),
        })
        .array('m_brakesDamage', {
              length: 4,
              type: new Parser().uint8(''),
        });

    this.uint8('m_frontLeftWingDamage')
        .uint8('m_frontRightWingDamage')
        .uint8('m_rearWingDamage')
        .uint8('m_floorDamage')
        .uint8('m_diffuserDamage')
        .uint8('m_sidepodDamage')
        .uint8('m_drsFault')
        .uint8('m_gearBoxDamage')
        .uint8('m_engineDamage')
        .uint8('m_engineMGUHWear')
        .uint8('m_engineESWear')
        .uint8('m_engineCEWear')
        .uint8('m_engineICEWear')
        .uint8('m_engineMGUKWear')
        .uint8('m_engineTCWear');
  }
}
