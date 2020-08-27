import {constants, F1TelemetryClient} from '..';

const {PACKETS} = constants;

const client = new F1TelemetryClient({port: 20777});

client.on(PACKETS.event, () => {});
/*
client.on(PACKETS.motion, () => {});
client.on(PACKETS.carSetups, () => {});
client.on(PACKETS.lapData, () => {});
client.on(PACKETS.session, () => {});
client.on(PACKETS.participants, () => {});
client.on(PACKETS.carTelemetry, () => {});
client.on(PACKETS.carStatus, () => {});
*/

client.start();

// stops the client
[`exit`,
 `SIGINT`,
 `SIGUSR1`,
 `SIGUSR2`,
 `uncaughtException`,
 `SIGTERM`,
].forEach((eventType) => {
  (process as NodeJS.EventEmitter).on(eventType, () => client.stop());
});
