# F12018UDP

[![Build Status](https://travis-ci.org/irvingswiftj/f1-2018-udp.svg?branch=master)](https://travis-ci.org/irvingswiftj/f1-2018-udp)

A javascript UDP client for Codemaster's F1 2018 game

## Get started

yarn:
```
yarn add f1-2018-udp
```

npm:
```
npm install f1-2018-udp
```

```
import { F12018UDP } from 'f1-2018-udp';
// const F12018UDP = require('f1-2018-udp').default;

const client = new F12018UDP();
client.on('data', (d) => console.log(d));
client.start();

// and when you want to stop
client.stop();
```

## TODO

- Write Tests!
- Add Parsers according to documentation: https://forums.codemasters.com/discussion/136948/f1-2018-udp-specification