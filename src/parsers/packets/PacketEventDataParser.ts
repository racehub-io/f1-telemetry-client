import {Parser} from 'binary-parser';

import {EVENT_CODES} from '../../constants';
import {F1Parser} from '../F1Parser';

import {PacketHeaderParser} from './PacketHeaderParser';
import {PacketEventData} from './types';

export class GenericEventParser extends F1Parser {
  constructor() {
    super();

    this.endianess('little').uint8('vehicleIdx');
  }
}

export class FastestLapParser extends F1Parser {
  constructor() {
    super();

    this.endianess('little').uint8('vehicleIdx').floatle('lapTime');
  }
}

export class FlashbackParser extends F1Parser {
  constructor() {
    super();
    this.endianess('little')
        .uint32le('flashbackFrameIdentifier')
        .floatle('flashbackSessionTime');
  }
}

export class StartLightsParser extends F1Parser {
  constructor() {
    super();

    this.endianess('little').uint8('numLights');
  }
}

export class ButtonsParser extends F1Parser {
  constructor() {
    super();

    this.endianess('little').uint32le('m_buttonStatus');
  }
}

export class SpeedTrapParser extends F1Parser {
  constructor(packetFormat: number) {
    super();

    this.endianess('little').uint8('vehicleIdx').floatle('speed');

    if (packetFormat === 2021) {
        .uint8('overallFastestInSession')
        .uint8('driverFastestInSession')
    }

    if (packetFormat === 2022) {
      .uint8('isOverallFastestInSession')
      .uint8('isDriverFastestInSession')
      .uint8('fastestVehicleIdxInSession')
      .floatle('fastestSpeedInSession')
    }
  }
}

export class PenaltyParser extends F1Parser {
  constructor() {
    super();

    this.endianess('little')
        .uint8('penaltyType')
        .uint8('infringementType')
        .uint8('vehicleIdx')
        .uint8('otherVehicleIdx')
        .uint8('time')
        .uint8('lapNum')
        .uint8('placesGained');
  }
}

export class PacketEventDataParser extends F1Parser {
  data: PacketEventData;

  constructor(buffer: Buffer, packetFormat: number, bigintEnabled: boolean) {
    super();

    this.endianess('little').nest('m_header', {
      type: new PacketHeaderParser(packetFormat, bigintEnabled),
    });

    this.string('m_eventStringCode', {length: 4});

    if (packetFormat === 2019) {
      this.unpack2019Format(buffer, packetFormat, bigintEnabled);
    }

    if (packetFormat === 2020) {
      this.unpack2020Format(buffer, packetFormat, bigintEnabled);
    }

    if (packetFormat === 2021) {
      this.unpack2021Format(buffer, packetFormat, bigintEnabled);
    }

    if (packetFormat === 2022) {
      this.unpack2022Format(buffer, packetFormat, bigintEnabled);
    }

    this.data = this.fromBuffer(buffer);
  }

  unpack2019Format =
      (buffer: Buffer, packetFormat: number, bigintEnabled: boolean) => {
        const eventStringCode =
            this.getEventStringCode(buffer, packetFormat, bigintEnabled);

        if (eventStringCode === EVENT_CODES.FastestLap) {
          this.uint8('vehicleIdx').floatle('lapTime');
        } else if (
            eventStringCode === EVENT_CODES.Retirement ||
            eventStringCode === EVENT_CODES.TeammateInPits ||
            eventStringCode === EVENT_CODES.RaceWinner) {
          this.uint8('vehicleIdx');
        }
      };

  unpack2020Format =
      (buffer: Buffer, packetFormat: number, bigintEnabled: boolean) => {
        const eventStringCode =
            this.getEventStringCode(buffer, packetFormat, bigintEnabled);

        if (eventStringCode === EVENT_CODES.FastestLap) {
          this.nest('m_eventDetails', {type: new FastestLapParser()});
        } else if (
            eventStringCode === EVENT_CODES.Retirement ||
            eventStringCode === EVENT_CODES.TeammateInPits ||
            eventStringCode === EVENT_CODES.RaceWinner) {
          this.nest('m_eventDetails', {type: new GenericEventParser()});
        } else if (eventStringCode === EVENT_CODES.SpeedTrapTriggered) {
          this.nest('m_eventDetails', {type: new SpeedTrapParser(packetFormat)});
        } else if (eventStringCode === EVENT_CODES.PenaltyIssued) {
          this.nest('m_eventDetails', {type: new PenaltyParser()});
        }
      };

  unpack2021Format =
      (buffer: Buffer, packetFormat: number, bigintEnabled: boolean) => {
        const eventStringCode =
            this.getEventStringCode(buffer, packetFormat, bigintEnabled);

        if (eventStringCode === EVENT_CODES.FastestLap) {
          this.nest('m_eventDetails', {type: new FastestLapParser()});
        } else if (eventStringCode === EVENT_CODES.SpeedTrapTriggered) {
          this.nest('m_eventDetails', {type: new SpeedTrapParser(packetFormat)});
        } else if (eventStringCode === EVENT_CODES.PenaltyIssued) {
          this.nest('m_eventDetails', {type: new PenaltyParser()});
        } else if (eventStringCode === EVENT_CODES.Flashback) {
          this.nest('m_eventDetails', {type: new FlashbackParser()});
        } else if (eventStringCode === EVENT_CODES.StartLights) {
          this.nest('m_eventDetails', {type: new StartLightsParser()});
        } else if (eventStringCode === EVENT_CODES.ButtonStatus) {
          this.nest('m_eventDetails', {type: new ButtonsParser()});
        } else {
          this.nest('m_eventDetails', {type: new GenericEventParser()});
        }
      };

      unpack2022Format =
        (buffer: Buffer, packetFormat: number, bigintEnabled: boolean) => {
          const eventStringCode =
              this.getEventStringCode(buffer, packetFormat, bigintEnabled);

          if (eventStringCode === EVENT_CODES.FastestLap) {
            this.nest('m_eventDetails', {type: new FastestLapParser()});
          } else if (eventStringCode === EVENT_CODES.SpeedTrapTriggered) {
            this.nest('m_eventDetails', {type: new SpeedTrapParser(packetFormat)});
          } else if (eventStringCode === EVENT_CODES.PenaltyIssued) {
            this.nest('m_eventDetails', {type: new PenaltyParser()});
          } else if (eventStringCode === EVENT_CODES.Flashback) {
            this.nest('m_eventDetails', {type: new FlashbackParser()});
          } else if (eventStringCode === EVENT_CODES.StartLights) {
            this.nest('m_eventDetails', {type: new StartLightsParser()});
          } else if (eventStringCode === EVENT_CODES.ButtonStatus) {
            this.nest('m_eventDetails', {type: new ButtonsParser()});
          } else {
            this.nest('m_eventDetails', {type: new GenericEventParser()});
          }
        };

  getEventStringCode =
      (buffer: Buffer, packetFormat: number, bigintEnabled: boolean) => {
        const headerParser =
            new Parser()
                .endianess('little')
                .nest('m_header', {
                  type: new PacketHeaderParser(packetFormat, bigintEnabled),
                })
                .string('m_eventStringCode', {length: 4});
        const {m_eventStringCode} = headerParser.parse(buffer);
        return m_eventStringCode;
      };
}
