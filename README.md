# F12018UDP

A javascript UDP client for Codemaster's F1 2018 game

## Get started

```
const client = new F12018UDP();
  client.on('data', (d) => console.log(d)
});
client.start();

// and when you want to stop
client.stop();
```