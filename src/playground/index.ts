import {constants, F1TelemetryClient} from '..';

const {PACKETS} = constants;

const client = new F1TelemetryClient({port: 20777});

client.on(PACKETS.session, e => {});
client.on(PACKETS.motion, e => {});
client.on(PACKETS.lapData, e => {});
client.on(PACKETS.event, e => {});
client.on(PACKETS.participants, e => {});
client.on(PACKETS.carSetups, e => {});
client.on(PACKETS.carTelemetry, e => {});
client.on(PACKETS.carStatus, e => {});

client.start();

// stops the client
[`exit`,
 `SIGINT`,
 `SIGUSR1`,
 `SIGUSR2`,
 `uncaughtException`,
 `SIGTERM`,
].forEach(eventType => {
  (process as NodeJS.EventEmitter).on(eventType, () => client.stop());
});
