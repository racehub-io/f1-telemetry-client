import { F1Parser } from "../F1Parser";
import { Parser } from "binary-parser";

/*
struct CarStatusData
{
    uint8       m_tractionControl;          // 0 (off) - 2 (high)
    uint8       m_antiLockBrakes;           // 0 (off) - 1 (on)
    uint8       m_fuelMix;                  // Fuel mix - 0 = lean, 1 = standard, 2 = rich, 3 = max
    uint8       m_frontBrakeBias;           // Front brake bias (percentage)
    uint8       m_pitLimiterStatus;         // Pit limiter status - 0 = off, 1 = on
    float       m_fuelInTank;               // Current fuel mass
    float       m_fuelCapacity;             // Fuel capacity
    uint16      m_maxRPM;                   // Cars max RPM, point of rev limiter
    uint16      m_idleRPM;                  // Cars idle RPM
    uint8       m_maxGears;                 // Maximum number of gears
    uint8       m_drsAllowed;               // 0 = not allowed, 1 = allowed, -1 = unknown
    uint8       m_tyresWear[4];             // Tyre wear percentage
    uint8       m_tyreCompound;             // Modern - 0 = hyper soft, 1 = ultra soft
                                            // 2 = super soft, 3 = soft, 4 = medium, 5 = hard
                                            // 6 = super hard, 7 = inter, 8 = wet
                                            // Classic - 0-6 = dry, 7-8 = wet
    uint8       m_tyresDamage[4];           // Tyre damage (percentage)
    uint8       m_frontLeftWingDamage;      // Front left wing damage (percentage)
    uint8       m_frontRightWingDamage;     // Front right wing damage (percentage)

    uint8       m_rearWingDamage;           // Rear wing damage (percentage)
    uint8       m_engineDamage;             // Engine damage (percentage)
    uint8       m_gearBoxDamage;            // Gear box damage (percentage)
    uint8       m_exhaustDamage;            // Exhaust damage (percentage)
    int8        m_vehicleFiaFlags;          // -1 = invalid/unknown, 0 = none, 1 = green
                                            // 2 = blue, 3 = yellow, 4 = red
    float       m_ersStoreEnergy;           // ERS energy store in Joules
    uint8       m_ersDeployMode;            // ERS deployment mode, 0 = none, 1 = low, 2 = medium
                                            // 3 = high, 4 = overtake, 5 = hotlap
    float       m_ersHarvestedThisLapMGUK;  // ERS energy harvested this lap by MGU-K
    float       m_ersHarvestedThisLapMGUH;  // ERS energy harvested this lap by MGU-H
    float       m_ersDeployedThisLap;       // ERS energy deployed this lap
};
*/

export class CarSetupData extends F1Parser {
  constructor() {
    super();
    this.uint8("m_tractionControl")
      .uint8("m_antiLockBrakes")
      .uint8("m_fuelMix")
      .uint8("m_frontBrakeBias")
      .uint8("m_pitLimiterStatus")
      .floatle("m_fuelInTank")
      .floatle("m_fuelCapacity")
      .uint16le("m_maxRPM")
      .uint16le("m_idleRPM")
      .uint8("m_maxGears")
      .uint8("m_drsAllowed")
      .array("m_tyresWear", {
        length: 4,
        type: new Parser().uint8("m_tyresWear")
      })
      .uint8("m_tyreCompound")
      .array("m_tyresDamage", {
        length: 4,
        type: new Parser().uint8("m_tyresDamage")
      })
      .uint8("m_frontLeftWingDamage")
      .uint8("m_frontRightWingDamage")
      .uint8("m_rearWingDamage")
      .uint8("m_engineDamage")
      .uint8("m_gearBoxDamage")
      .uint8("m_exhaustDamage")
      .int8("m_vehicleFiaFlags")
      .floatle("m_ersStoreEnergy")
      .uint8("m_ersDeployMode")
      .floatle("m_ersHarvestedThisLapMGUK")
      .floatle("m_ersHarvestedThisLapMGUH")
      .floatle("m_ersDeployedThisLap");
  }
}
