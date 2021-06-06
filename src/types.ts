import {PacketCarSetupDataParser, PacketCarStatusDataParser, PacketCarTelemetryDataParser, PacketEventDataParser, PacketFinalClassificationDataParser, PacketLapDataParser, PacketLobbyInfoDataParser, PacketMotionDataParser, PacketParticipantsDataParser, PacketSessionDataParser,} from './parsers/packets';

export interface Options {
  port?: number;
  forwardAddresses?: Address[]|undefined;
  bigintEnabled?: boolean;
  skipParsing?: boolean;
  address?: string;
}

export interface Address {
  port: number;
  ip?: string;
}

export interface ParsedMessage {
  packetID: string;
  packetData:|PacketSessionDataParser|PacketMotionDataParser|
      PacketLapDataParser|PacketEventDataParser|PacketParticipantsDataParser|
      PacketCarSetupDataParser|PacketCarTelemetryDataParser|
      PacketCarStatusDataParser|PacketFinalClassificationDataParser|
      PacketLobbyInfoDataParser|null;
}
