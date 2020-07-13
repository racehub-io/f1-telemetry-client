# F1 Telemetry Client

<img src="https://img.shields.io/npm/v/f1-telemetry-client.svg"> <a  href='https://travis-ci.org/jonybur/f1-telemetry-client' ><img  src='https://travis-ci.org/jonybur/f1-telemetry-client.svg?branch=master'></a> <img  src="https://img.shields.io/github/license/jonybur/f1-telemetry-client.svg"> <a  href="https://snyk.io/test/github/jonybur/f1-telemetry-client?targetFile=package.json"><img  src="https://snyk.io/test/github/jonybur/f1-telemetry-client/badge.svg?targetFile=package.json"  alt="Known Vulnerabilities"  data-canonical-src="https://snyk.io/test/github/jonybur/f1-telemetry-client?targetFile=package.json"  style="max-width:100%;"></a> <a  href="https://github.com/google/gts"><img  src='https://img.shields.io/badge/code%20style-google-blueviolet.svg'></a>

The F1 series of games support the outputting of key game data via a UDP data stream. This data can be interpreted by external apps or connected peripherals for a range of different uses, including providing additional telemetry information, customised HUD displays, motion platform hardware support or providing force feedback data for custom steering wheels.

This is a TypeScript UDP client and telemetry parser for Codemaster's F1 2020 that enables the consumption of such information.

This version only works on F1 2020. 

## Installing

```
$ npm install f1-2020-client
```

or

```
$ yarn add f1-2020-client
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
import { F1TelemetryClient, constants } from "f1-2020-client";
// or: const { F1TelemetryClient, constants } = require('f1-telemetry-client');
const { PACKETS } = constants;

const client = new F1TelemetryClient();
client.on(PACKETS.session, console.log);
client.on(PACKETS.motion, console.log);
client.on(PACKETS.lapData, console.log);
client.on(PACKETS.event, console.log);
client.on(PACKETS.participants, console.log);
client.on(PACKETS.carSetups, console.log);
client.on(PACKETS.carTelemetry, console.log);
client.on(PACKETS.carStatus, console.log);
client.on(PACKETS.finalClassification, console.log);
client.on(PACKETS.lobbyInfo, console.log);

// to start listening:
client.start();

// and when you want to stop:
client.stop();
```

## Documentation

For the F1 2020 UDP specifications, please refer to [this post](https://forums.codemasters.com/topic/54423-f1%C2%AE-2020-udp-specification/) from the official Codemaster's forum.

## License

This project is originally a fork from [irvingswiftj's](https://github.com/irvingswiftj) [f1-2018-udp](https://github.com/irvingswiftj/f1-2018-udp) which was further forked by [jonybur's](https://github.com/jonybur/f1-telemetry-client)[f1-telemetry-client]. 
Licensed under the MIT License.
