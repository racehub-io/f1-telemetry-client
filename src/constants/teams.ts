import {Team} from './types';

const MERCEDES_COLOR = '#00D2BE';
const FERRARI_COLOR = '#DC0000';
const RED_BULL_COLOR = '#0600EF';
const WILLIAMS_COLOR = '#005AFF';
const ASTON_MARTIN_COLOR = '#006F62';
const ALPINE_COLOR = '#0090FF';
const ALPHA_TAURI_COLOR = '#2B4562';
const HAAS_COLOR = '#FFFFFF';
const MCLAREN_COLOR = '#FF8700';
const ALFA_ROMEO_COLOR = '#900000';
const LOTUS_COLOR = '#fcd56d';
const JORDAN_COLOR = '#006F62';
const BENTETTON_COLOR = '#fcd56d';

const ART_GRAND_PRIX_COLOR = '#B4B3B4';
const CAMPOS_VEXATEC_COLOR = '#EBC110';
const CARLIN_COLOR = '#243EF6';
const CHAROUZ_COLOR = '#84020A';
const DAMS_COLOR = '#0ED4FA';
const RUSSIAN_TIME_COLOR = '#181e2a';
const MP_MOTORSPORT_COLOR = '#F7401A';
const PERTAMINA_COLOR = '#ff2b08';
const TRIDENT_COLOR = '#0E1185';
const BWT_ARDEN_COLOR = '#ff88d3';
const UNI_VIRTUOSI_COLOR = '#FBEC20';
const PREMA_COLOR = '#E80309';
const HITECH_COLOR = '#E8E8E8';

const UNI_VIRTUOSI_COLOR_19 = '#ffd600';
const PREMA_COLOR_19 = '#db1500';
const ART_GRAND_PRIX_COLOR_19 = '#640005';
const CAMPOS_VEXATEC_COLOR_19 = '#FA6400';
const CARLIN_COLOR_19 = '#0A505A';
const CHAROUZ_COLOR_19 = '#840D2B';
const DAMS_COLOR_19 = '#00E1EB';
const MP_MOTORSPORT_COLOR_19 = '#F4736C';
const TRIDENT_COLOR_19 = '#2D5AD7';
const BWT_ARDEN_COLOR_19 = '#FAA0BE';

const RACING_POINT_COLOR_2020 = '#FAA0BE';
const RENAULT_COLOR_2020 = '#FFF500';

export const TEAMS: {[index: number]: Team} = {
  0: {name: 'Mercedes', color: MERCEDES_COLOR},
  1: {name: 'Ferrari', color: FERRARI_COLOR},
  2: {name: 'Red Bull Racing', color: RED_BULL_COLOR},
  3: {name: 'Williams', color: WILLIAMS_COLOR},
  4: {name: 'Aston Martin', color: ASTON_MARTIN_COLOR},
  5: {name: 'Alpine', color: ALPINE_COLOR},
  6: {name: 'Alpha Tauri', color: ALPHA_TAURI_COLOR},
  7: {name: 'Haas', color: HAAS_COLOR},
  8: {name: 'McLaren', color: MCLAREN_COLOR},
  9: {name: 'Alfa Romeo', color: ALFA_ROMEO_COLOR},
  10: {name: 'McLaren 1988', color: MCLAREN_COLOR},
  11: {name: 'McLaren 1991', color: MCLAREN_COLOR},
  12: {name: 'Williams 1992', color: WILLIAMS_COLOR},
  13: {name: 'Ferrari 1995', color: FERRARI_COLOR},
  14: {name: 'Williams 1996', color: WILLIAMS_COLOR},
  15: {name: 'McLaren 1998', color: MCLAREN_COLOR},
  16: {name: 'Ferrari 2002', color: FERRARI_COLOR},
  17: {name: 'Ferrari 2004', color: FERRARI_COLOR},
  18: {name: 'Alpine 2006', color: ALPINE_COLOR},
  19: {name: 'Ferrari 2007', color: FERRARI_COLOR},
  20: {name: 'INVALID', color: 'INVALID'},
  21: {name: 'Red Bull 2010', color: RED_BULL_COLOR},
  22: {name: 'Ferrari 1976', color: FERRARI_COLOR},
  23: {name: 'ART Grand Prix', color: ART_GRAND_PRIX_COLOR},
  24: {name: 'Campos Vexatec Racing', color: CAMPOS_VEXATEC_COLOR},
  25: {name: 'Carlin', color: CARLIN_COLOR},
  26: {name: 'Charouz Racing System', color: CHAROUZ_COLOR},
  27: {name: 'DAMS', color: DAMS_COLOR},
  28: {name: 'Russian Time', color: RUSSIAN_TIME_COLOR},
  29: {name: 'MP Motorsport', color: MP_MOTORSPORT_COLOR},
  30: {name: 'Pertamina', color: PERTAMINA_COLOR},
  31: {name: 'McLaren 1990', color: MCLAREN_COLOR},
  32: {name: 'Trident', color: TRIDENT_COLOR},
  33: {name: 'BWT Arden', color: BWT_ARDEN_COLOR},
  34: {name: 'McLaren 1976', color: MCLAREN_COLOR},
  35: {name: 'Lotus 1972', color: LOTUS_COLOR},
  36: {name: 'Ferrari 1979', color: FERRARI_COLOR},
  37: {name: 'McLaren 1982', color: MCLAREN_COLOR},
  38: {name: 'Williams 2003', color: WILLIAMS_COLOR},
  39: {name: 'Brawn 2009', color: MCLAREN_COLOR},
  40: {name: 'Lotus 1978', color: LOTUS_COLOR},
  41: {name: 'INVALID', color: 'INVALID'},
  42: {name: 'Art GP ’19', color: ART_GRAND_PRIX_COLOR_19},
  43: {name: 'Campos ’19', color: CAMPOS_VEXATEC_COLOR_19},
  44: {name: 'Carlin ’19', color: CARLIN_COLOR_19},
  45: {name: 'Sauber Junior Charouz ’19', color: CHAROUZ_COLOR_19},
  46: {name: 'Dams ’19', color: DAMS_COLOR_19},
  47: {name: 'Uni-Virtuosi ‘19', color: UNI_VIRTUOSI_COLOR_19},
  48: {name: 'MP Motorsport ‘19', color: MP_MOTORSPORT_COLOR_19},
  49: {name: 'Prema ’19', color: PREMA_COLOR_19},
  50: {name: 'Trident ’19', color: TRIDENT_COLOR_19},
  51: {name: 'Arden ’19', color: BWT_ARDEN_COLOR_19},
  53: {name: 'Benetton 1994', color: BENTETTON_COLOR},
  54: {name: 'Benetton 1995', color: BENTETTON_COLOR},
  55: {name: 'Ferrari 2000', color: MCLAREN_COLOR},
  56: {name: 'Jordan 1991', color: JORDAN_COLOR},
  63: {name: 'Ferrari 1990', color: FERRARI_COLOR},
  64: {name: 'McLaren 2010', color: MCLAREN_COLOR},
  65: {name: 'Ferrari 2010', color: FERRARI_COLOR},
  70: {name: 'Art GP ’20', color: ART_GRAND_PRIX_COLOR},
  71: {name: 'Campos ’20', color: CAMPOS_VEXATEC_COLOR},
  72: {name: 'Carlin ’20', color: CARLIN_COLOR},
  73: {name: 'Charouz ’20', color: CHAROUZ_COLOR},
  74: {name: 'Dams ’20', color: DAMS_COLOR},
  75: {name: 'Uni-Virtuosi ’20', color: UNI_VIRTUOSI_COLOR},
  76: {name: 'MP Motorsport ’20', color: MP_MOTORSPORT_COLOR},
  77: {name: 'Prema ’20', color: PREMA_COLOR},
  78: {name: 'Trident ’20', color: TRIDENT_COLOR},
  79: {name: 'BWT ’20', color: BWT_ARDEN_COLOR},
  80: {name: 'Hitech ’20', color: HITECH_COLOR},
  85: {name: 'Mercedes 2020', color: HITECH_COLOR},
  86: {name: 'Ferrari 2020', color: FERRARI_COLOR},
  87: {name: 'Red Bull 2020', color: RED_BULL_COLOR},
  88: {name: 'Williams 2020', color: WILLIAMS_COLOR},
  89: {name: 'Racing Point 2020', color: RACING_POINT_COLOR_2020},
  90: {name: 'Renault 2020', color: RENAULT_COLOR_2020},
  91: {name: 'Alpha Tauri 2020', color: ALPHA_TAURI_COLOR},
  92: {name: 'Haas 2020', color: HAAS_COLOR},
  93: {name: 'McLaren 2020', color: MCLAREN_COLOR},
  94: {name: 'Alfa Romeo 2020', color: ALFA_ROMEO_COLOR},
  95: {name: 'Aston Martin DB11 V12', color: ASTON_MARTIN_COLOR},
  96: {name: 'Aston Martin Vantage F1 Edition', color: ASTON_MARTIN_COLOR},
  97: {name: 'Aston Martin Vantage Safety Car', color: ASTON_MARTIN_COLOR},
  98: {name: 'Ferrari F8 Tributo', color: FERRARI_COLOR},
  99: {name: 'Ferrari Roma', color: FERRARI_COLOR},
  100: {name: 'McLaren 720S', color: MCLAREN_COLOR},
  101: {name: 'McLaren Artura', color: MCLAREN_COLOR},
  102: {name: 'Mercedes AMG GT Black Series Safety Car', color: MERCEDES_COLOR},
  103: {name: 'Mercedes AMG GTR Pro', color: MERCEDES_COLOR},
  104: {name: 'F1 Custom Team', color: '#FFFFFF'},
  106: {name: 'Prema 21', color: PREMA_COLOR},
  107: {name: 'Uni-Virtuosi 21', color: UNI_VIRTUOSI_COLOR},
  108: {name: 'Carlin 21', color: CARLIN_COLOR},
  109: {name: 'HiTech 21', color: HITECH_COLOR},
  110: {name: 'ART 21', color: ART_GRAND_PRIX_COLOR},
  111: {name: 'MP Motorsport 21', color: MP_MOTORSPORT_COLOR},
  112: {name: 'Charouz 21', color: CHAROUZ_COLOR},
  113: {name: 'Dam 21', color: DAMS_COLOR},
  114: {name: 'Campos 21', color: CAMPOS_VEXATEC_COLOR},
  115: {name: 'BWT 21', color: BWT_ARDEN_COLOR},
  116: {name: 'Trident 21', color: TRIDENT_COLOR},
  117: {name: 'Mercedes AMG GT Black Series', color: MERCEDES_COLOR},
  118: {name: 'Prema ‘22', color: PREMA_COLOR},
  119: {name: 'Virtuosi ‘22', color: UNI_VIRTUOSI_COLOR},
  120: {name: 'Carlin ‘22', color: CARLIN_COLOR},
  121: {name: 'Hitech ‘22', color: HITECH_COLOR},
  122: {name: 'Art GP ‘22', color: ART_GRAND_PRIX_COLOR},
  123: {name: 'MP Motorsport ‘22', color: MP_MOTORSPORT_COLOR},
  124: {name: 'Charouz ‘22', color: CHAROUZ_COLOR},
  125: {name: 'Dams ‘22', color: DAMS_COLOR},
  126: {name: 'Campos ‘22', color: CAMPOS_VEXATEC_COLOR},
  127: {name: 'Van Amersfoort Racing ‘22', color: '#f55702'},
  128: {name: 'Trident ‘22', color: TRIDENT_COLOR},
  255: {name: 'Not found', color: '#FFFFFF'},
};
