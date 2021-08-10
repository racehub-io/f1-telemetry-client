import {EventCode} from './types';

export const EVENT_CODES: {[index: string]: EventCode} = {
  SessionStarted: 'SSTA',
  SessionEnded: 'SEND',
  FastestLap: 'FTLP',
  Retirement: 'RTMT',
  DRSEnabled: 'DRSE',
  DRSDisabled: 'DRSD',
  TeammateInPits: 'TMPT',
  ChequeredFlag: 'CHQF',
  RaceWinner: 'RCWN',
  PenaltyIssued: 'PENA',
  SpeedTrapTriggered: 'SPTP',
  StartLights: 'STLG',
  LightsOut: 'LGOT',
  DriveThroughServed: 'DTSV',
  StopGoServed: 'SGSV',
  Flashback: 'FLBK',
  ButtonStatus: 'BUTN',
};
