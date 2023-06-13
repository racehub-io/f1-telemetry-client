import {Position, Tyre} from './types';

export const TYRES: {[index: number]: Tyre} = {
  0: {color: '#ffb3c3', name: 'Hyper Soft'},
  1: {color: '#b14ba7', name: 'Ultra Soft'},
  2: {color: '#f92d29', name: 'Super Soft'},
  3: {color: '#ebd25f', name: 'Soft'},
  4: {color: '#ffffff', name: 'Medium'},
  5: {color: '#03a2f3', name: 'Hard'},
  6: {color: '#ff803f', name: 'Super Hard'},
  7: {color: '#3ac82b', name: 'Intermediate'},
  8: {color: '#4491d2', name: 'Wet'},
  9: {color: '#3ac82b', name: 'Dry'},
  10: {color: '#4491d2', name: 'Wet'},
  11: {color: '#f92d29', name: 'Super Soft'},
  12: {color: '#f92d29', name: 'Soft'},
  13: {color: '#ebd25f', name: 'Medium'},
  14: {color: '#ffffff', name: 'Hard'},
  15: {color: '#4491d2', name: 'Wet'},
  16: {color: '#f92d29', name: 'C5'},
  17: {color: '#f92d29', name: 'C4'},
  18: {color: '#ebd25f', name: 'C3'},
  19: {color: '#ffffff', name: 'C2'},
  20: {color: '#ffffff', name: 'C1'},
  21: {color: '#ffffff', name: 'C0'},
};

export const VISUAL_TYRES: {[index: number]: Tyre} = {
  7: {color: '#3ac82b', name: 'Intermediate'},
  8: {color: '#4491d2', name: 'Wet'},
  15: {color: '#4491d2', name: 'Wet'},
  16: {color: '#f92d29', name: 'Soft'},
  17: {color: '#ebd25f', name: 'Medium'},
  18: {color: '#ffffff', name: 'Hard'},
  19: {color: '#b14ba7', name: 'Super Soft'},
  20: {color: '#f92d29', name: 'Soft'},
  21: {color: '#ebd25f', name: 'Medium'},
  22: {color: '#ffffff', name: 'Hard'},
};

export const WHEEL_POSITIONS: {[index: number]: Position} = {
  0: {long: 'Rear Left', short: 'RL'},
  1: {long: 'Rear Right', short: 'RR'},
  2: {long: 'Front Left', short: 'FL'},
  3: {long: 'Front Right', short: 'FR'},
};
