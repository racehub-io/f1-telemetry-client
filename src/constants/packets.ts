import type {PacketTypes} from './types';

export const PACKETS: Record<PacketTypes, PacketTypes> = {
  motion: 'motion',
  session: 'session',
  lapData: 'lapData',
  event: 'event',
  participants: 'participants',
  carSetups: 'carSetups',
  carTelemetry: 'carTelemetry',
  carStatus: 'carStatus',
  finalClassification: 'finalClassification',
  lobbyInfo: 'lobbyInfo',
  carDamage: 'carDamage',
  sessionHistory: 'sessionHistory',
  tyreSets: 'tyreSets',
  motionEx: 'motionEx',
};
