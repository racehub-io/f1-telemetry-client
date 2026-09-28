# F1 Telemetry Client

[![npm version](https://img.shields.io/npm/v/@racehub-io/f1-telemetry-client.svg)](https://www.npmjs.com/package/@racehub-io/f1-telemetry-client) [![License](https://img.shields.io/github/license/racehub-io/f1-telemetry-client.svg)](LICENSING.md)

The F1 series of games support the outputting of key game data via a UDP data stream. This data can be interpreted by external apps or connected peripherals for a range of different uses, including providing additional telemetry information, customised HUD displays, motion platform hardware support or providing force feedback data for custom steering wheels.

This TypeScript UDP client parses telemetry from F1 2018 through F1 25. It also includes experimental support for the F1 25 2026 Season Pack. The 2026 layouts follow the EA specification. They have not been tested with recorded game data.

## Installing

Use Node.js 22 or later.

```
$ npm install @racehub-io/f1-telemetry-client
```

or

```
$ yarn add @racehub-io/f1-telemetry-client
```

## Running the playground

```
$ npm run start
```

or

```
$ yarn start
```

## Usage

```
import { F1TelemetryClient, constants } from "@racehub-io/f1-telemetry-client";
// or: const { F1TelemetryClient, constants } = require('@racehub-io/f1-telemetry-client');
const { PACKETS } = constants;

/*
*   'port' is optional, defaults to 20777
*   'bigintEnabled' is optional, setting it to false makes the parser skip bigint values,
*                   defaults to true
*   'forwardAddresses' is optional, it's an array of Address objects to forward unparsed telemetry to. each address object is comprised of a port and an optional ip address
*                   defaults to undefined
*   'skipParsing' is optional, setting it to true will make the client not parse and emit content. You can consume telemetry data using forwardAddresses instead.
*                   defaults to false
*/
const client = new F1TelemetryClient({ port: 20777 });
client.on(PACKETS.event, console.log);
client.on(PACKETS.motion, console.log);
client.on(PACKETS.carSetups, console.log);
client.on(PACKETS.lapData, console.log);
client.on(PACKETS.session, console.log);
client.on(PACKETS.participants, console.log);
client.on(PACKETS.carTelemetry, console.log);
client.on(PACKETS.carStatus, console.log);
client.on(PACKETS.finalClassification, console.log);
client.on(PACKETS.lobbyInfo, console.log);
client.on(PACKETS.carDamage, console.log);
client.on(PACKETS.sessionHistory, console.log);
client.on(PACKETS.tyreSets, console.log);
client.on(PACKETS.motionEx, console.log);
client.on(PACKETS.timeTrial, console.log);
client.on(PACKETS.lapPositions, console.log);
client.on(PACKETS.carTelemetry2, console.log);

// to start listening:
client.start();

// and when you want to stop:
client.stop();
```

For formats 2024 and later, use `constants.SESSION_TYPES_2024` and
`constants.TEAMS_2024`. Use `constants.SESSION_TYPES` and `constants.TEAMS`
for older formats.

## Documentation

The following links contain information that summarises the UDP data structures so that developers of supporting hardware or software are able to configure these to work correctly with the F1 game.

- [F1 25 2026 Season Pack UDP Spec](https://forums.ea.com/blog/f1-games-game-info-hub-en/ea-sports%E2%84%A2-f1%C2%AE25-2026-season-pack-udp-specification/12187347)
- [F1 25 UDP Spec](https://forums.ea.com/t5/s/tghpe58374/attachments/tghpe58374/f1-games-game-info-hub-en/61/4/Data%20Output%20from%20F1%2025%20v3.pdf)
- [F1 24 UDP Spec](https://forums.ea.com/discussions/f1-24-general-discussion-en/f1-24-udp-specification/8369125)
- [F1 2023 UDP Spec](https://answers.ea.com/t5/General-Discussion/F1-23-UDP-Specification/td-p/12632888)
- [F1 2022 UDP Spec](https://answers.ea.com/t5/General-Discussion/F1-22-UDP-Specification/td-p/11551274)
- [F1 2020 UDP Spec](https://forums.codemasters.com/topic/50942-f1-2020-udp-specification/)  
- [F1 2021 UDP Spec](https://forums.codemasters.com/topic/80231-f1-2021-udp-specification/)  
- [F1 2019 UDP Spec](https://forums.codemasters.com/topic/44592-f1-2019-udp-specification/)  
- [F1 2018 UDP Spec](https://forums.codemasters.com/discussion/136948/f1-2018-udp-specification)

## Community

This open-source client is free to use. It needs no RaceHub account or subscription.
Maintenance depends on community contributions and volunteer time.
No hosted service or release schedule is promised.
Game software retains its own terms.

See [CONTRIBUTING.md](CONTRIBUTING.md) to contribute and [SECURITY.md](SECURITY.md) to report a security issue.

## License

RaceHub dedicates its own rights under CC0 1.0. See [LICENSING.md](LICENSING.md) for the scope.
Existing MIT terms and third-party notices remain in force.

Protocol updates and recorded F1 24/25 test data come from [z0mt3c/f1-telemetry-client](https://github.com/z0mt3c/f1-telemetry-client/tree/2271a9b), under the MIT License.
