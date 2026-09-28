import type {EventKeys} from '../types';

export type EventCode =
  | 'SSTA'
  | 'SEND'
  | 'FTLP'
  | 'RTMT'
  | 'DRSE'
  | 'DRSD'
  | 'TMPT'
  | 'CHQF'
  | 'RCWN'
  | 'PENA'
  | 'SPTP'
  | 'STLG'
  | 'LGOT'
  | 'DTSV'
  | 'SGSV'
  | 'FLBK'
  | 'BUTN'
  | 'RDFL'
  | 'OVTK'
  | 'SCAR'
  | 'COLL';

export const EVENT_CODES: Record<EventKeys, EventCode> = {
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
  RedFlag: 'RDFL',
  Overtake: 'OVTK',
  SafetyCar: 'SCAR',
  Collision: 'COLL',
};
