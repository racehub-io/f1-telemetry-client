import {SessionTypes} from './types';

export const SESSION_TYPES: {[index: number]: SessionTypes} = {
  0: {short: 'UNK', long: 'Unknown', type: undefined},
  1: {short: 'FP1', long: 'Free Practice 1', type: 'FP'},
  2: {short: 'FP2', long: 'Free Practice 2', type: 'FP'},
  3: {short: 'FP3', long: 'Free Practice 3', type: 'FP'},
  4: {short: 'ShortFP', long: 'Short Free Practice', type: 'FP'},
  5: {short: 'Q1', long: 'Qualifying 1', type: 'Q'},
  6: {short: 'Q2', long: 'Qualifying 2', type: 'Q'},
  7: {short: 'Q3', long: 'Qualifying 3', type: 'Q'},
  8: {short: 'ShortQ', long: 'Short Qualifying', type: 'Q'},
  9: {short: 'OneShotQ', long: 'One Shot Qualifying', type: 'Q'},
  10: {short: 'R', long: 'Race', type: 'R'},
  11: {short: 'R2', long: 'Race 2', type: 'R'},
  12: {short: 'R3', long: 'Race 3', type: 'R'},
  13: {short: 'TT', long: 'Time Trial', type: 'TT'},
};
