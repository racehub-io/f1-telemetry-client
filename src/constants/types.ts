export interface Team {
  name: string;
  color: string;
}

export interface Driver {
  firstName: string;
  lastName: string;
  abbreviation: string;
}

export interface Track {
  name: string;
}

export interface Coordinate {
  x: number;
  y: number;
}

export type Packet = string;
