import {PacketSize} from './types';

export const PACKET_SIZES: {[index: string]: {[index: number]: PacketSize}} = {
  motion: {2020: 1464, 2019: 1343, 2018: 1341},
  session: {2020: 251, 2019: 149, 2018: 147},
  lapData: {2020: 1190, 2019: 843, 2018: 841},
  event: {2020: 35, 2019: 32, 2018: 25},
  participants: {2020: 1213, 2019: 1104, 2018: 1082},
  carSetups: {2020: 1102, 2019: 843, 2018: 841},
  carTelemetry: {2020: 1307, 2019: 1347, 2018: 1085},
  carStatus: {2020: 1344, 2019: 1143, 2018: 1061},
  finalClassification: {2020: 839},
  lobbyInfo: {2020: 1169},
  sessionHistory: {2021: 1155},
};
