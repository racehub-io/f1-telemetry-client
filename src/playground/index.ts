import * as dgram from 'dgram';
import {constants, F1TelemetryClient} from '..';
const {PACKETS} = constants;

const client = new F1TelemetryClient();

const fs = require('fs');

const readStream = fs.createReadStream(
  require('path').resolve(__dirname, './data.rhc'),
  {highWaterMark: 124}
);

let data: any = [];

readStream.on('data', (chunk: any) => {
  const loadedBuffer = Buffer.from(chunk);

  data = [...data, loadedBuffer];

  const buff = Buffer.concat(data);
  // if (data) {
  //   console.log(data);
  //   chunkBuffer = Buffer.concat([data, loadedBuffer]);
  //   console.log('lele');
  // } else {
  //   chunkBuffer = loadedBuffer;
  // }

  const parsed = F1TelemetryClient.parseBufferMessage(buff, false);

  console.log(parsed);

  //data = (parsed?.packetData as any).next;

  //console.log(parsed?.packetData);
});

readStream.on('end', () => {
  console.log('end');
  // end : I am transferring in bytes by bytes called chunk
});

readStream.on('error', (err: any) => {
  console.log('error :', err);
});

// stops the client
[
  `exit`,
  `SIGINT`,
  `SIGUSR1`,
  `SIGUSR2`,
  `uncaughtException`,
  `SIGTERM`,
].forEach((eventType) => {
  (process as NodeJS.EventEmitter).on(eventType, () => client.stop());
});
