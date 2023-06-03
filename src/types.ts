import type {
  PacketCarDamageDataParser,
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
  | PacketMotionExDataParser;

export interface ParsedMessage {
  packetID: string;
  packetData: PacketParser;
  message?: Buffer;
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
  | 'Overtake';
