import {Parser} from 'binary-parser';

import {F1Parser} from '../F1Parser';

import {PacketHeaderParser} from './PacketHeaderParser';
import type {
  ButtonEventDetails,
  FastestLapEventDetails,
  FlashbackEventDetails,
  VehicleEventDetails,
  LightEventDetails,
  OvertakeEventDetails,
  PenaltyEventDetails,
  SpeedTrapEventDetails,
  PacketEvent,
  GenericEvent,
} from './types';
import {EVENT_CODES} from '../../constants';
import type {EventCode} from '../../constants/eventCodes';

export class VehicleEventParser extends F1Parser<VehicleEventDetails> {
  static EVENT_CODES: EventCode[] = [
    EVENT_CODES.Retirement,
    EVENT_CODES.TeammateInPits,
    EVENT_CODES.RaceWinner,
    EVENT_CODES.DriveThroughServed,
    EVENT_CODES.StopGoServed,
  ];
  constructor() {
    super();
    this.endianess('little').uint8('vehicleIdx');
  }
}

export class FastestLapParser extends F1Parser<FastestLapEventDetails> {
  constructor() {
    super();
    this.endianess('little').uint8('vehicleIdx').floatle('lapTime');
  }
}

export class FlashbackParser extends F1Parser<FlashbackEventDetails> {
  constructor() {
    super();
    this.endianess('little')
      .uint32le('flashbackFrameIdentifier')
      .floatle('flashbackSessionTime');
  }
}

export class StartLightsParser extends F1Parser<LightEventDetails> {
  constructor() {
    super();

    this.endianess('little').uint8('numLights');
  }
}

export class ButtonsParser extends F1Parser<ButtonEventDetails> {
  constructor() {
    super();

    this.endianess('little').uint32le('buttonStatus');
  }
}

export class OvertakeParser extends F1Parser<OvertakeEventDetails> {
  constructor() {
    super();

    this.endianess('little')
      .uint8('overtakingVehicleIdx')
      .uint8('beingOvertakenVehicleIdx');
  }
}

export class SpeedTrapParser extends F1Parser<SpeedTrapEventDetails> {
  constructor(packetFormat: number) {
    super();

    this.endianess('little').uint8('vehicleIdx').floatle('speed');

    if (packetFormat === 2021) {
      this.uint8('overallFastestInSession').uint8('driverFastestInSession');
    }

    if (packetFormat >= 2022) {
      this.uint8('isOverallFastestInSession')
        .uint8('isDriverFastestInSession')
        .uint8('fastestVehicleIdxInSession')
        .floatle('fastestSpeedInSession');
    }
  }
}

export class PenaltyParser extends F1Parser<PenaltyEventDetails> {
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

export class PacketEventDataParser extends F1Parser<PacketEvent> {
  data: PacketEvent;

  constructor(buffer: Buffer, packetFormat: number, bigintEnabled: boolean) {
    super();

    this.endianess('little').nest('m_header', {
      type: new PacketHeaderParser(packetFormat, bigintEnabled),
    });

    this.string('m_eventStringCode', {length: 4});

    const eventStringCode = this.getEventStringCode(
      buffer,
      packetFormat,
      bigintEnabled
    );

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
    } else if (eventStringCode === EVENT_CODES.Overtake) {
      this.nest('m_eventDetails', {type: new OvertakeParser()});
    } else if (VehicleEventParser.EVENT_CODES.includes(eventStringCode)) {
      this.nest('m_eventDetails', {type: new VehicleEventParser()});
    }

    this.data = this.fromBuffer(buffer);
  }

  getEventStringCode = (
    buffer: Buffer,
    packetFormat: number,
    bigintEnabled: boolean
  ): EventCode => {
    const headerParser = new Parser()
      .endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(packetFormat, bigintEnabled),
      })
      .string('m_eventStringCode', {length: 4});
    const {m_eventStringCode} = headerParser.parse(buffer) as GenericEvent;
    return m_eventStringCode;
  };
}
