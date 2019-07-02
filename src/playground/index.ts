import {constants, F1TelemetryClient} from '..';

const {PACKETS} = constants;

const client = new F1TelemetryClient({port: 20778});

/*
client.on(PACKETS.motion, console.log);
client.on(PACKETS.lapData, console.log);
client.on(PACKETS.session, console.log);
*/
client.on(PACKETS.event, console.log);
/*
client.on(PACKETS.participants, console.log);
client.on(PACKETS.carSetups, console.log);
client.on(PACKETS.carTelemetry, console.log);
client.on(PACKETS.carStatus, console.log);
*/

client.start();

// stops the client
[].forEach(eventType => {
  (process as NodeJS.EventEmitter).on(eventType, () => client.stop());
});
