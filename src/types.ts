import type {RemoteInfo} from 'dgram';
import type {
  PacketCarDamageDataParser,
  PacketCarTelemetry2DataParser,
  PacketLapPositionsDataParser,
  PacketTimeTrialDataParser,
  PacketCarSetupDataParser,
  PacketCarStatusDataParser,
  PacketCarTelemetryDataParser,
  PacketEventDataParser,
  PacketFinalClassificationDataParser,
  PacketLapDataParser,
  PacketLobbyInfoDataParser,
  PacketMotionDataParser,
  PacketParticipantsDataParser,
  PacketSessionDataParser,
  PacketSessionHistoryDataParser,
} from './parsers/packets';
import type {PacketTyreSetsDataParser} from './parsers/packets/PacketTyreSetsDataParser';
import type {PacketMotionExDataParser} from './parsers/packets/PacketMotionExDataParser';

export interface Options {
  port?: number;
  address?: string;
  forwardAddresses?: Address[] | undefined;
  bigintEnabled?: boolean;
  skipParsing?: boolean;
}

export interface Address {
  port: number;
  ip?: string;
}

export type PacketParser =
  | PacketSessionHistoryDataParser
  | PacketSessionDataParser
  | PacketMotionDataParser
  | PacketLapDataParser
  | PacketEventDataParser
  | PacketParticipantsDataParser
  | PacketCarSetupDataParser
  | PacketCarTelemetryDataParser
  | PacketCarStatusDataParser
  | PacketCarDamageDataParser
  | PacketFinalClassificationDataParser
  | PacketLobbyInfoDataParser
  | PacketTyreSetsDataParser
  | PacketMotionExDataParser
  | PacketTimeTrialDataParser
  | PacketLapPositionsDataParser
  | PacketCarTelemetry2DataParser;

export interface ParsedMessage {
  packetID: string;
  packetData: PacketParser;
  message?: Buffer;
}

export interface F1TelemetryClientEvents {
  motion: [data: PacketMotionDataParser['data'], rinfo?: RemoteInfo];
  session: [data: PacketSessionDataParser['data'], rinfo?: RemoteInfo];
  lapData: [data: PacketLapDataParser['data'], rinfo?: RemoteInfo];
  event: [data: PacketEventDataParser['data'], rinfo?: RemoteInfo];
  participants: [
    data: PacketParticipantsDataParser['data'],
    rinfo?: RemoteInfo,
  ];
  carSetups: [data: PacketCarSetupDataParser['data'], rinfo?: RemoteInfo];
  carTelemetry: [
    data: PacketCarTelemetryDataParser['data'],
    rinfo?: RemoteInfo,
  ];
  carStatus: [data: PacketCarStatusDataParser['data'], rinfo?: RemoteInfo];
  finalClassification: [
    data: PacketFinalClassificationDataParser['data'],
    rinfo?: RemoteInfo,
  ];
  lobbyInfo: [data: PacketLobbyInfoDataParser['data'], rinfo?: RemoteInfo];
  carDamage: [data: PacketCarDamageDataParser['data'], rinfo?: RemoteInfo];
  sessionHistory: [
    data: PacketSessionHistoryDataParser['data'],
    rinfo?: RemoteInfo,
  ];
  tyreSets: [data: PacketTyreSetsDataParser['data'], rinfo?: RemoteInfo];
  motionEx: [data: PacketMotionExDataParser['data'], rinfo?: RemoteInfo];
  timeTrial: [data: PacketTimeTrialDataParser['data'], rinfo?: RemoteInfo];
  lapPositions: [
    data: PacketLapPositionsDataParser['data'],
    rinfo?: RemoteInfo,
  ];
  carTelemetry2: [
    data: PacketCarTelemetry2DataParser['data'],
    rinfo?: RemoteInfo,
  ];
  raw: [message: ParsedMessage, rinfo?: RemoteInfo];
  error: [error: Error, message?: Buffer, rinfo?: RemoteInfo];
}

export type EventKeys =
  | 'SessionStarted'
  | 'SessionEnded'
  | 'FastestLap'
  | 'Retirement'
  | 'DRSEnabled'
  | 'DRSDisabled'
  | 'TeammateInPits'
  | 'ChequeredFlag'
  | 'RaceWinner'
  | 'PenaltyIssued'
  | 'SpeedTrapTriggered'
  | 'StartLights'
  | 'LightsOut'
  | 'DriveThroughServed'
  | 'StopGoServed'
  | 'Flashback'
  | 'ButtonStatus'
  | 'RedFlag'
  | 'Overtake'
  | 'SafetyCar'
  | 'Collision';
