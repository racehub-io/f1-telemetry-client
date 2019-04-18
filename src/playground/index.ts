import {constants, F1TelemetryClient} from '..';

const {PACKETS} = constants;

<<<<<<< HEAD
const client = new F1TelemetryClient({port: 20778});
=======
const client = new F1TelemetryClient({port: 20777});
>>>>>>> 3673dca86eb2da3bc07b33d45e82c0d571674229

client.on(PACKETS.session, m => console.log(m));
client.on(PACKETS.motion, m => console.log(m));
client.on(PACKETS.lapData, m => console.log(m));
client.on(PACKETS.event, m => console.log(m));
client.on(PACKETS.participants, m => console.log(m));
client.on(PACKETS.carSetups, m => console.log(m));
client.on(PACKETS.carTelemetry, m => console.log(m));
client.on(PACKETS.carStatus, m => console.log(m));

client.start();

// stops the client
<<<<<<< HEAD
[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`]
    .forEach(eventType => {
      (process as NodeJS.EventEmitter).on(eventType, () => client.stop());
    });
=======
[`exit`,
 `SIGINT`,
 `SIGUSR1`,
 `SIGUSR2`,
 `uncaughtException`,
 `SIGTERM`,
].forEach(eventType => {
  (process as NodeJS.EventEmitter).on(eventType, () => client.stop());
});
>>>>>>> 3673dca86eb2da3bc07b33d45e82c0d571674229
