import {constants, F1TelemetryClient} from '..';

const {PACKETS} = constants;

const client = new F1TelemetryClient({port: 20777, bigintEnabled: true});

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
