import {PacketCarSetupDataParser, PacketCarStatusDataParser, PacketCarTelemetryDataParser, PacketEventDataParser, PacketFinalClassificationDataParser, PacketLapDataParser, PacketLobbyInfoDataParser, PacketMotionDataParser, PacketParticipantsDataParser, PacketSessionDataParser,} from './parsers/packets';

export interface Options {
  port?: number;
  forwardPorts?: number[]|undefined;
  bigintEnabled?: boolean;
  skipParsing?: boolean;
}

export interface ParsedMessage {
  packetID: string;
  packetData:|PacketSessionDataParser|PacketMotionDataParser|
      PacketLapDataParser|PacketEventDataParser|PacketParticipantsDataParser|
      PacketCarSetupDataParser|PacketCarTelemetryDataParser|
      PacketCarStatusDataParser|PacketFinalClassificationDataParser|
      PacketLobbyInfoDataParser|null;
}
