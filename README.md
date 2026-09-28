# F1 Telemetry Client

[![npm version](https://img.shields.io/npm/v/@racehub-io/f1-telemetry-client.svg)](https://www.npmjs.com/package/@racehub-io/f1-telemetry-client) [![License](https://img.shields.io/github/license/racehub-io/f1-telemetry-client.svg)](LICENSING.md)

Read F1 game telemetry over UDP in Node.js. The package includes a client, packet parsers, TypeScript types, and game constants. It is free to use and needs no RaceHub account or subscription.

**Release status:** This README describes the `0.3.0` update in [PR #107](https://github.com/racehub-io/f1-telemetry-client/pull/107). The npm `latest` version is still `0.2.12`. Use the [source setup](#run-from-source) to try the new features before publication.

## Supported formats

- F1 2018 through F1 25. Tests use recorded packets from each format.
- F1 25 2026 Season Pack: experimental. The layouts follow the EA specification. No recorded 2026 game data was available for tests.

The F1 24/25 recordings do not cover time trial, lap positions, lobby, or final classification. Those layouts were checked against the EA specifications.

## Install

Use Node.js 22 or later. CI runs on Node.js 22 and 24.

Install the latest published package:

```sh
npm install @racehub-io/f1-telemetry-client
```

Version `0.3.0` adds F1 24/25 formats, experimental 2026 formats, UDP sender details, typed listeners, and parse-error events. It removes `build/es5`. The `build/main` entry stays the same. The build emits ES2020 JavaScript.

## Receive telemetry

Enable UDP telemetry in the game. Set the destination IP to the computer that runs this client. Set the game port to the client port. The default is `20777`.

```js
const {
  F1TelemetryClient,
  constants,
} = require('@racehub-io/f1-telemetry-client');
const {PACKETS} = constants;
const client = new F1TelemetryClient({port: 20777});

client.on(PACKETS.carTelemetry, (packet, sender) => {
  console.log(packet.m_carTelemetryData);
  console.log(sender?.address, sender?.port);
});

client.on('raw', ({packetID, packetData, message}, sender) => {
  console.log(packetID, packetData.data, message.length, sender?.address);
});

client.on('error', (error, message, sender) => {
  console.error(error.message, message?.length, sender?.address);
});

client.start();
process.once('SIGINT', () => client.stop());
```

In TypeScript, use `import {F1TelemetryClient, constants} from '@racehub-io/f1-telemetry-client'`. The `on` and `once` methods infer packet and sender types from the event name. Custom events remain available.

Packet events receive decoded data as their first argument. The `raw` event receives `{packetID, packetData, message}`. Its decoded data is in `packetData.data`; `message` is the original UDP buffer.

Both event types receive UDP sender details as their second argument: `address`, `port`, `family`, and `size`. Direct calls to `handleMessage(buffer)` have no sender details. The protocol header stays unchanged.

### Options

| Option             | Default     | Purpose                                                                                                 |
| ------------------ | ----------- | ------------------------------------------------------------------------------------------------------- |
| `address`          | `undefined` | Bind to all local IPv4 interfaces by default. Set a local IP to select one interface.                   |
| `port`             | `20777`     | UDP port to listen on.                                                                                  |
| `bigintEnabled`    | `true`      | Include `m_sessionUID` as a `bigint`. Set to `false` to skip the field.                                 |
| `forwardAddresses` | `undefined` | Forward unchanged packets to an array of `{port, ip}` destinations. Set each destination IP explicitly. |
| `skipParsing`      | `false`     | Disable packet and `raw` events. Packet forwarding still runs.                                          |

Convert `bigint` values to strings before you serialize packet data with `JSON.stringify`. The shared header type marks `m_sessionUID` as optional because `bigintEnabled: false` skips it.

### Events

Listen with `client.on(constants.PACKETS.<name>, handler)`. Events depend on the packet format and the packets sent by the game.

| First format       | Added events                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| 2018               | `motion`, `session`, `lapData`, `event`, `participants`, `carSetups`, `carTelemetry`, `carStatus` |
| 2020               | `finalClassification`, `lobbyInfo`                                                                |
| 2021               | `carDamage`, `sessionHistory`                                                                     |
| 2023               | `tyreSets`, `motionEx`                                                                            |
| 2024               | `timeTrial`                                                                                       |
| 2025               | `lapPositions`                                                                                    |
| 2026, experimental | `carTelemetry2`                                                                                   |

The `error` event receives a parse error, the failed UDP buffer, and optional sender details. Add a listener to handle malformed packets and continue receiving telemetry. Without a listener, Node.js throws the error. Exceptions in your packet or `raw` listeners still propagate.

### Parse an existing buffer

Call `F1TelemetryClient.parseBufferMessage(buffer, true)` to parse a UDP packet without starting a socket listener. It returns `{packetID, packetData, message}` or `undefined` for an unknown packet ID. Read decoded data from `packetData.data`. This static method throws on malformed data.

The second argument controls `bigint` parsing. It defaults to `false` for this static method. Pass `true` to include `m_sessionUID`.

### Interpret game data

- For formats 2024 and later, use `constants.SESSION_TYPES_2024` and `constants.TEAMS_2024`. Use the legacy `SESSION_TYPES` and `TEAMS` tables for earlier formats.
- Use `constants.TYRES` with `m_tyreActualCompound` for the C-number. Use `constants.VISUAL_TYRES` with `m_tyreVisualCompound` for the Soft/Medium/Hard label and color. For example, actual compound `17` is C4; visual compound `17` is Medium.
- Use `constants.PIT_STATUS` with `m_pitStatus`. Nationality IDs 88-90 are available in `constants.NATIONALITIES`.
- Formats through 2020 use `m_lastLapTime` and `m_currentLapTime` in seconds. Formats 2021 and later use the `InMS` names in milliseconds. The shared types include both sets as optional fields.
- Time fields keep their raw units. Combine separate minute and millisecond fields in the consuming app when needed.
- Divide the experimental 2026 G-force values by `1000` to get G-force units.

## Run from source

To try the `0.3.0` release branch:

```sh
git clone --branch maintenance/0.3.0 https://github.com/racehub-io/f1-telemetry-client.git
cd f1-telemetry-client
npm ci
npm test -- --runInBand
npm run build
npm start
```

The playground listens on **port `20777`**. Set the game's UDP port to `20777`. Press Ctrl+C to stop it.

`npm test` includes type and lint checks. `npm run build` creates the package files in `build/main`. The published package excludes tests, recordings, and the playground.

To record packets from the game on port `20777`:

```sh
mkdir -p recordings
npm run record
```

The recorder writes JSON lines to `recordings/`. Review recordings for private data before sharing them. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Protocol specifications

- [F1 25 2026 Season Pack](https://forums.ea.com/blog/f1-games-game-info-hub-en/ea-sports%E2%84%A2-f1%C2%AE25-2026-season-pack-udp-specification/12187347)
- [F1 25](https://forums.ea.com/t5/s/tghpe58374/attachments/tghpe58374/f1-games-game-info-hub-en/61/4/Data%20Output%20from%20F1%2025%20v3.pdf)
- [F1 24](https://forums.ea.com/discussions/f1-24-general-discussion-en/f1-24-udp-specification/8369125)
- [F1 23](https://forums.ea.com/t5/s/tghpe58374/attachments/tghpe58374/f1-23-en/20144/1/Data%20Output%20from%20F1%2023%20v29x3.docx)
- [F1 22](https://forums.ea.com/discussions/f1-games-franchise-discussion-en/f1-22-udp-specification/8418392)

<details>
<summary>F1 2018-2021 legacy references</summary>

These original Codemasters links may be unavailable.

- [F1 2021](https://forums.codemasters.com/topic/80231-f1-2021-udp-specification/)
- [F1 2020](https://forums.codemasters.com/topic/50942-f1-2020-udp-specification/)
- [F1 2019](https://forums.codemasters.com/topic/44592-f1-2019-udp-specification/)
- [F1 2018](https://forums.codemasters.com/discussion/136948/f1-2018-udp-specification)

</details>

## Community and licence

Maintenance depends on community contributions and volunteer time. Open issues and pull requests to help maintain the client. See [CONTRIBUTING.md](CONTRIBUTING.md) and [SECURITY.md](SECURITY.md).

RaceHub dedicates its own rights under CC0 1.0. Existing MIT terms and third-party notices remain in force. See [LICENSING.md](LICENSING.md) for the scope. Game software keeps its own terms.

Protocol updates and recorded F1 24/25 test data are adapted from [z0mt3c/f1-telemetry-client](https://github.com/z0mt3c/f1-telemetry-client/tree/2271a9b1767165fe4b2c2fcdfdd51869278b6c79), under the MIT License. Thanks to [Phaturia](https://github.com/Phaturia) for the sender-information request in [PR #106](https://github.com/racehub-io/f1-telemetry-client/pull/106).

Further updates adapt typed listeners from [jayden-chan](https://github.com/jayden-chan/f1-telemetry-client), optional network binding from [mmertz](https://github.com/mmertz/f1-telemetry-client), and the standard example port from [Hotman75](https://github.com/Hotman75/f1-telemetry-client). Parse-error events and constant updates also follow the z0mt3c fork. Existing event payloads remain compatible.
