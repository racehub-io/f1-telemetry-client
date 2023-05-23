export interface PacketHeaderBase {
  m_packetFormat: number;
}

export interface PacketHeader extends PacketHeaderBase {
  m_gameYear?: number;
  m_gameMajorVersion?: number;
  m_gameMinorVersion?: number;
  m_packetVersion: number;
  m_packetId: number;
  m_sessionUID: bigint;
  m_sessionTime: number;
  m_frameIdentifier: number;
  m_overallFrameIdentifier?: number;
  m_playerCarIndex: number;
  m_secondaryPlayerCarIndex?: number;
}

export interface PacketBase {
  m_header: PacketHeader;
}

export interface PacketMotionData extends PacketBase {
  m_carMotionData: MotionData[];
  m_suspensionPosition?: number[];
  m_suspensionVelocity?: number[];
  m_suspensionAcceleration?: number[];
  m_wheelSpeed?: number[];
  m_wheelSlip?: number[];
  m_localVelocityX?: number;
  m_localVelocityY?: number;
  m_localVelocityZ?: number;
  m_angularVelocityX?: number;
  m_angularVelocityY?: number;
  m_angularVelocityZ?: number;
  m_angularAccelerationX?: number;
  m_angularAccelerationY?: number;
  m_angularAccelerationZ?: number;
  m_frontWheelsAngle?: number;
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

export interface PacketMotionExData extends PacketBase {
  m_suspensionPosition: number[];
  m_suspensionVelocity: number[];
  m_suspensionAcceleration: number[];
  m_wheelSpeed: number[];
  m_wheelSlipRatio: number[];
  m_wheelSlipAngle: number[];
  m_wheelLatForce: number[];
  m_wheelLongForce: number[];
  m_heightOfCOGAboveGround: number;
  m_localVelocityX: number;
  m_localVelocityY: number;
  m_localVelocityZ: number;
  m_angularVelocityX: number;
  m_angularVelocityY: number;
  m_angularVelocityZ: number;
  m_angularAccelerationX: number;
  m_angularAccelerationY: number;
  m_angularAccelerationZ: number;
  m_frontWheelsAngle: number;
  m_wheelVertForce: number[];
}

export interface PacketLapData extends PacketBase {
  m_lapData: LapData[];
  m_timeTrialPBCarIdx?: number;
  m_timeTrialRivalCarIdx?: number;
}

export interface PacketSessionData extends PacketBase {
  m_weather: number;
  m_trackTemperature: number;
  m_airTemperature: number;
  m_totalLaps: number;
  m_trackLength: number;
  m_sessionType: number;
  m_trackId: number;
  m_era?: number;
  m_formula?: number;
  m_sessionTimeLeft: number;
  m_sessionDuration: number;
  m_pitSpeedLimit: number;
  m_gamePaused: number;
  m_isSpectating: number;
  m_spectatorCarIndex: number;
  m_sliProNativeSupport: number;
  m_numMarshalZones: number;
  m_marshalZones: MarshalZone[];
  m_safetyCarStatus: number;
  m_networkGame: number;
  m_numWeatherForecastSamples?: number;
  m_weatherForecastSamples?: WeatherForecastSample[];
  m_forecastAccuracy?: number;
  m_aiDifficulty?: number;
  m_seasonLinkIdentifier?: number;
  m_weekendLinkIdentifier?: number;
  m_sessionLinkIdentifier?: number;
  m_pitStopWindowIdealLap?: number;
  m_pitStopWindowLatestLap?: number;
  m_pitStopRejoinPosition?: number;
  m_steeringAssist?: number;
  m_brakingAssist?: number;
  m_gearboxAssist?: number;
  m_pitAssist?: number;
  m_pitReleaseAssist?: number;
  m_ERSAssist?: number;
  m_DRSAssist?: number;
  m_dynamicRacingLine?: number;
  m_dynamicRacingLineType?: number;
  m_gameMode?: number;
  m_ruleSet?: number;
  m_timeOfDay?: number;
  m_sessionLength?: number;
  m_speedUnitsLeadPlayer?: number;
  m_temperatureUnitsLeadPlayer?: number;
  m_speedUnitsSecondaryPlayer?: number;
  m_temperatureUnitsSecondaryPlayer?: number;
  m_numSafetyCarPeriods?: number;
  m_numVirtualSafetyCarPeriods?: number;
  m_numRedFlagPeriods?: number;
}

export interface MarshalZone {
  m_zoneStart: number;
  m_zoneFlag: number;
}

export interface LapData {
  m_lastLapTime?: number;
  m_lastLapTimeInMS?: number;
  m_currentLapTime?: number;
  m_currentLapTimeInMS?: number;
  m_bestLapTime?: number;
  m_sector1Time?: number;
  m_sector1TimeInMS?: number;
  m_sector1TimeMinutes?: number;
  m_sector2Time?: number;
  m_sector2TimeInMS?: number;
  m_sector2TimeMinutes?: number;
  m_deltaToCarInFrontInMS?: number;
  m_deltaToRaceLeaderInMS?: number;
  m_lapDistance: number;
  m_totalDistance: number;
  m_safetyCarDelta: number;
  m_carPosition: number;
  m_currentLapNum: number;
  m_pitStatus: number;
  m_numPitStops?: number;
  m_sector: number;
  m_currentLapInvalid: number;
  m_penalties: number;
  m_warnings?: number;
  m_totalWarnings?: number;
  m_cornerCuttingWarnings?: number;
  m_numUnservedDriveThroughPens?: number;
  m_numUnservedStopGoPens?: number;
  m_gridPosition: number;
  m_driverStatus: number;
  m_resultStatus: number;
  m_pitLaneTimerActive?: number;
  m_pitLaneTimeInLaneInMS?: number;
  m_pitStopTimerInMS?: number;
  m_pitStopShouldServePen?: number;
}

export interface PacketCarDamageData extends PacketBase {
  m_carDamageData: CarDamageData[];
}

export interface CarDamageData {
  m_tyresWear: number[];
  m_tyresDamage: number[];
  m_brakesDamage: number[];
  m_frontLeftWingDamage: number;
  m_frontRightWingDamage: number;
  m_rearWingDamage: number;
  m_floorDamage: number;
  m_diffuserDamage: number;
  m_sidepodDamage: number;
  m_drsFault: number;
  m_ersFault: number;
  m_gearBoxDamage: number;
  m_engineDamage: number;
  m_engineMGUHWear: number;
  m_engineESWear: number;
  m_engineCEWear: number;
  m_engineICEWear: number;
  m_engineMGUKWear: number;
  m_engineTCWear: number;
  m_engineBlown: number;
  m_engineSeized: number;
}

export interface PacketCarStatusData extends PacketBase {
  m_carStatusData: CarStatusData[];
}

export interface CarStatusData {
  m_tractionControl: number;
  m_antiLockBrakes: number;
  m_fuelMix: number;
  m_frontBrakeBias: number;
  m_pitLimiterStatus: number;
  m_fuelInTank: number;
  m_fuelCapacity: number;
  m_maxRPM: number;
  m_idleRPM: number;
  m_maxGears: number;
  m_drsAllowed: number;
  m_drsActivationDistance?: number;
  m_tyresWear?: number[];
  m_actualTyreCompound?: number;
  m_visualTyreCompound?: number;
  m_tyresAgeLaps?: number;
  m_tyreCompound?: number;
  m_tyresDamage?: number[];
  m_frontLeftWingDamage?: number;
  m_frontRightWingDamage?: number;
  m_rearWingDamage?: number;
  m_drsFault?: number;
  m_engineDamage?: number;
  m_gearBoxDamage?: number;
  m_exhaustDamage?: number;
  m_vehicleFiaFlags: number;
  m_enginePowerICE?: number;
  m_enginePowerMGUK?: number;
  m_ersStoreEnergy: number;
  m_ersDeployMode: number;
  m_ersHarvestedThisLapMGUK: number;
  m_ersHarvestedThisLapMGUH: number;
  m_ersDeployedThisLap: number;
  m_fuelRemainingLaps?: number;
  m_networkPaused?: number;
}

export interface PacketCarSetupData extends PacketBase {
  m_carSetups: CarSetupData[];
}

export interface CarSetupData {
  m_frontWing: number;
  m_rearWing: number;
  m_onThrottle: number;
  m_offThrottle: number;
  m_frontCamber: number;
  m_rearCamber: number;
  m_frontToe: number;
  m_rearToe: number;
  m_frontSuspension: number;
  m_rearSuspension: number;
  m_frontAntiRollBar: number;
  m_rearAntiRollBar: number;
  m_frontSuspensionHeight: number;
  m_rearSuspensionHeight: number;
  m_brakePressure: number;
  m_brakeBias: number;
  m_rearLeftTyrePressure?: number;
  m_rearRightTyrePressure?: number;
  m_frontLeftTyrePressure?: number;
  m_frontRightTyrePressure?: number;
  m_frontTyrePressure?: number;
  m_rearTyrePressure?: number;
  m_ballast: number;
  m_fuelLoad: number;
}

export interface GenericEvent extends PacketBase {
  m_eventStringCode:
    | 'SSTA'
    | 'LGOT'
    | 'RDFL'
    | 'SEND'
    | 'DRSE'
    | 'DRSD'
    | 'CHQF';
  m_eventDetails?: VehicleEventDetails;
}

export interface VehicleEvent extends PacketBase {
  m_eventStringCode: 'RTMT' | 'TMPT' | 'RCWN' | 'DTSV' | 'SGSV';
  m_eventDetails: VehicleEventDetails;
}

export interface FlashbackEvent extends PacketBase {
  m_eventStringCode: 'FLBK';
  m_eventDetails: FlashbackEventDetails;
}

export interface PenaltyEvent extends PacketBase {
  m_eventStringCode: 'PENA';
  m_eventDetails: PenaltyEventDetails;
}

export interface SpeedTrapEvent extends PacketBase {
  m_eventStringCode: 'SPTP';
  m_eventDetails: SpeedTrapEventDetails;
}

export interface LightEvent extends PacketBase {
  m_eventStringCode: 'STLG';
  m_eventDetails: LightEventDetails;
}

export interface ButtonEvent extends PacketBase {
  m_eventStringCode: 'BUTN';
  m_eventDetails: ButtonEventDetails;
}

export interface FastestLapEvent extends PacketBase {
  m_eventStringCode: 'FTLP';
  m_eventDetails: FastestLapEventDetails;
}

export interface OvertakeEvent extends PacketBase {
  m_eventStringCode: 'OVTK';
  m_eventDetails: OvertakeEventDetails;
}

export interface SpeedTrapEventDetails extends VehicleEventDetails {
  speed: number;
  isOverallFastestInSession: number;
  isDriverFastestInSession: number;
  fastestVehicleIdxInSession: number;
  fastestSpeedInSession: number;
}

export interface VehicleEventDetails {
  vehicleIdx: number;
}

export interface FlashbackEventDetails {
  flashbackSessionTime: number;
  flashbackFrameIdentifier: number;
}

export interface LightEventDetails {
  numLights: number;
}

export interface ButtonEventDetails {
  buttonStatus: number;
}

export interface FastestLapEventDetails extends VehicleEventDetails {
  lapTime: number;
}

export interface OvertakeEventDetails {
  beingOvertakenVehicleIdx: number;
  overtakingVehicleIdx: number;
}

export interface PenaltyEventDetails extends VehicleEventDetails {
  penaltyType: number;
  infringementType: number;
  otherVehicleIdx: number;
  time: number;
  lapNum: number;
  placesGained: number;
}

export interface PacketParticipantsData extends PacketBase {
  m_numCars?: number;
  m_numActiveCars?: number;
  m_participants: ParticipantData[];
}

export interface PacketCarTelemetryData extends PacketBase {
  m_carTelemetryData: CarTelemetryData[];
  m_buttonStatus?: number;
  m_mfdPanelIndex?: number;
  m_mfdPanelIndexSecondaryPlayer?: number;
  m_suggestedGear?: number;
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
  m_revLightsBitValue?: number;
  m_engineTemperature: number;
  m_surfaceType?: number[];
}

export interface ParticipantData {
  m_aiControlled: number;
  m_driverId: number;
  m_networkId?: number;
  m_name: string;
  m_nationality: number;
  m_raceNumber: number;
  m_teamId: number;
  m_myTeam?: number;
  m_yourTelemetry?: number;
  m_showOnlineNames?: number;
  m_platform?: number;
}

export interface WeatherForecastSample {
  m_sessionType: number;
  m_timeOffset: number;
  m_weather: number;
  m_trackTemperature: number;
  m_trackTemperatureChange: number;
  m_airTemperature: number;
  m_airTemperatureChange: number;
  m_rainPercentage: number;
}
export interface FinalClassificationData {
  m_position: number;
  m_numLaps: number;
  m_gridPosition: number;
  m_points: number;
  m_numPitStops: number;
  m_resultStatus: number;
  // check why missing?
  m_bestLapTime?: number;
  m_bestLapTimeInMS: number;
  m_totalRaceTime: number;
  m_penaltiesTime: number;
  m_numPenalties: number;
  m_numTyreStints: number;
  m_tyreStintsActual: number[];
  m_tyreStintsVisual: number[];
  m_tyreStintsEndLaps: number[];
}

export interface PacketFinalClassificationData extends PacketBase {
  m_numCars: number;
  m_classificationData: FinalClassificationData[];
}

export interface LobbyInfoData {
  m_aiControlled: number;
  m_teamId: number;
  m_nationality: number;
  m_platform: number;
  m_name: string;
  m_carNumber: number;
  m_readyStatus: string;
}

export interface PacketLobbyInfoData extends PacketBase {
  m_numPlayers: number;
  m_lobbyPlayers: LobbyInfoData[];
}

export interface LapHistoryData {
  m_lapTimeInMS: number;
  m_sector1TimeInMS: number;
  m_sector1TimeMinutes?: number;
  m_sector2TimeInMS: number;
  m_sector2TimeMinutes?: number;
  m_sector3TimeInMS: number;
  m_sector3TimeMinutes?: number;
  m_lapValidBitFlags: number;
}

export interface TyreStintsHistoryData {
  m_endLap: number;
  m_tyreActualCompound: number;
  m_tyreVisualCompound: number;
}

export interface PacketSessionHistoryData extends PacketBase {
  m_carIdx: number;
  m_numLaps: number;
  m_numTyreStints: number;
  m_bestLapTimeLapNum: number;
  m_bestSector1LapNum: number;
  m_bestSector2LapNum: number;
  m_bestSector3LapNum: number;
  m_lapHistoryData: LapHistoryData[];
  m_tyreStintsHistoryData: TyreStintsHistoryData[];
}

export interface TyreSetData {
  m_actualTyreCompound: number;
  m_visualTyreCompound: number;
  m_wear: number;
  m_available: number;
  m_recommendedSession: number;
  m_lifeSpan: number;
  m_usableLife: number;
  m_lapDeltaTime: number;
  m_fitted: number;
}

export interface PacketTyreSetsData extends PacketBase {
  m_carIdx: number;
  m_tyreSetData: TyreSetData[];
  m_fittedIdx: number;
}

export type PacketEvent =
  | GenericEvent
  | LightEvent
  | ButtonEvent
  | VehicleEvent
  | OvertakeEvent
  | PenaltyEvent
  | FlashbackEvent
  | SpeedTrapEvent;
