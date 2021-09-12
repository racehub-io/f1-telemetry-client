import {PacketCarDamageDataParser, PacketCarSetupDataParser, PacketCarStatusDataParser, PacketCarTelemetryDataParser, PacketEventDataParser, PacketFinalClassificationDataParser, PacketLapDataParser, PacketLobbyInfoDataParser, PacketMotionDataParser, PacketParticipantsDataParser, PacketSessionDataParser, PacketSessionHistoryDataParser} from './parsers/packets';

export interface Options {
  port?: number;
  forwardAddresses?: Address[]|undefined;
  bigintEnabled?: boolean;
  skipParsing?: boolean;
}

export interface Address {
  port: number;
  ip?: string;
}

export interface ParsedMessage {
  packetID: string;
  packetData:|PacketSessionHistoryDataParser|PacketSessionDataParser|PacketMotionDataParser|
      PacketLapDataParser|PacketEventDataParser|PacketParticipantsDataParser|
      PacketCarSetupDataParser|PacketCarTelemetryDataParser|
      PacketCarStatusDataParser|PacketCarDamageDataParser|PacketFinalClassificationDataParser|
      PacketLobbyInfoDataParser|null;
}
