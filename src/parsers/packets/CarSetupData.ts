import F1Parser from "../F1Parser";

/*
struct CarSetupData
{
  uint8     m_frontWing;                // Front wing aero
  uint8     m_rearWing;                 // Rear wing aero
  uint8     m_onThrottle;               // Differential adjustment on throttle (percentage)
  uint8     m_offThrottle;              // Differential adjustment off throttle (percentage)
  float     m_frontCamber;              // Front camber angle (suspension geometry)
  float     m_rearCamber;               // Rear camber angle (suspension geometry)
  float     m_frontToe;                 // Front toe angle (suspension geometry)
  float     m_rearToe;                  // Rear toe angle (suspension geometry)
  uint8     m_frontSuspension;          // Front suspension
  uint8     m_rearSuspension;           // Rear suspension
  uint8     m_frontAntiRollBar;         // Front anti-roll bar
  uint8     m_rearAntiRollBar;          // Front anti-roll bar
  uint8     m_frontSuspensionHeight;    // Front ride height
  uint8     m_rearSuspensionHeight;     // Rear ride height
  uint8     m_brakePressure;            // Brake pressure (percentage)
  uint8     m_brakeBias;                // Brake bias (percentage)
  float     m_frontTyrePressure;        // Front tyre pressure (PSI)
  float     m_rearTyrePressure;         // Rear tyre pressure (PSI)
  uint8     m_ballast;                  // Ballast
  float     m_fuelLoad;                 // Fuel load
};
*/

export default class CarSetupData extends F1Parser {
  constructor() {
    super();
    this.uint8("m_frontWing")
      .uint8("m_rearWing")
      .uint8("m_onThrottle")
      .uint8("m_offThrottle")
      .floatle("m_frontCamber")
      .floatle("m_rearCamber")
      .floatle("m_frontToe")
      .floatle("m_rearToe")
      .uint8("m_frontSuspension")
      .uint8("m_rearSuspension")
      .uint8("m_frontAntiRollBar")
      .uint8("m_rearAntiRollBar")
      .uint8("m_frontSuspensionHeight")
      .uint8("m_rearSuspensionHeight")
      .uint8("m_brakePressure")
      .uint8("m_brakeBias")
      .floatle("m_frontTyrePressure")
      .floatle("m_rearTyrePressure")
      .uint8("m_ballast")
      .floatle("m_fuelLoad");
  }
}
