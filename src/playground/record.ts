import {F1TelemetryClient} from '..';
import * as fs from 'fs';
import {PacketHeader} from '../parsers/packets/types';

const client = new F1TelemetryClient({
  port: 30500,
  bigintEnabled: true,
});

fs.mkdir('./recordings', () => {});

client.on('raw', ({packetData, packetID, message}) => {
  const mHeader = packetData?.data?.m_header as PacketHeader | undefined;
  const filename = [
    'data',
    mHeader?.m_gameYear ?? 'unknown',
    mHeader?.m_packetFormat,
    mHeader?.m_sessionUID ?? 'no-session',
  ]
    .filter(n => n !== null)
    .join('-');

  const data =
    JSON.stringify(
      {
        time: new Date().toJSON(),
        gameYear: mHeader?.m_gameYear ?? 'unknown',
        format: mHeader?.m_packetFormat,
        packetID,
        message: message,
        parsed: packetData?.data,
      },
      (key, value) => (typeof value === 'bigint' ? value.toString() : value)
    ) + '\n';

  fs.appendFileSync(`./recordings/${filename}-${packetID}.txt`, data);
  fs.appendFileSync(`./recordings/${filename}-all.txt`, data);
});

client.start();

// stops the client
[
  'exit',
  'SIGINT',
  'SIGUSR1',
  'SIGUSR2',
  'uncaughtException',
  'SIGTERM',
].forEach(eventType => {
  (process as NodeJS.EventEmitter).on(eventType, () => client.stop());
});
