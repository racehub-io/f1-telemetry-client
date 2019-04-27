export interface PacketMotionData {
  m_header: PacketHeader;
  m_carMotionData: MotionData[];
}

export interface MotionData {
  m_worldPositionX: number;
  m_worldPositionY: number;
  m_worldPositionZ: number;
  m_worldVelocityX: number;
  m_worldVelocityY: number;
  m_worldVelocityZ: number;
  m_worldForwardDirX: number;
  m_worldForwardDirY: number;
  m_worldForwardDirZ: number;
  m_worldRightDirX: number;
  m_worldRightDirY: number;
  m_worldRightDirZ: number;
  m_gForceLateral: number;
  m_gForceLongitudinal: number;
  m_gForceVertical: number;
  m_yaw: number;
  m_pitch: number;
  m_roll: number;
}

export interface PacketLapData {
  m_header: PacketHeader;
  m_lapData: LapData[];
}

export interface LapData {
  m_lastLapTime: number;
  m_currentLapTime: number;
  m_bestLapTime: number;
  m_sector1Time: number;
  m_sector2Time: number;
  m_lapDistance: number;
  m_totalDistance: number;
  m_safetyCarDelta: number;
  m_carPosition: number;
  m_currentLapNum: number;
  m_pitStatus: number;
  m_sector: number;
  m_currentLapInvalid: number;
  m_penalties: number;
  m_gridPosition: number;
  m_driverStatus: number;
  m_resultStatus: number;
}

export interface PacketParticipantsData {
  m_header: PacketHeader;
  m_numCars: number;
  m_participants: ParticipantData[];
}

export interface PacketCarTelemetryData {
  m_header: PacketHeader;
  m_buttonStatus: number;
  m_carTelemetryData: CarTelemetryData[];
}

export interface PacketHeader {
  m_packetFormat: number;
  m_packetVersion: number;
  m_packetId: number;
  m_sessionUID: number;
  m_sessionTime: number;
  m_frameIdentifier: number;
  m_playerCarIndex: number;
}

export interface CarTelemetryData {
  m_speed: number;
  m_throttle: number;
  m_steer: number;
  m_brake: number;
  m_clutch: number;
  m_gear: number;
  m_tyresPressure: number[];
  m_brakesTemperature: number[];
  m_tyresSurfaceTemperature: number[];
  m_tyresInnerTemperature: number[];
  m_engineRPM: number;
  m_drs: number;
  m_revLightsPercent: number;
  m_engineTemperature: number;
}

export interface ParticipantData {
  m_aiControlled: number;
  m_driverId: number;
  m_name: string;
  m_nationality: number;
  m_raceNumber: number;
  m_teamId: number;
}
