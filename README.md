# F12018UDP

[![Build Status](https://travis-ci.org/irvingswiftj/f1-2018-udp.svg?branch=master)](https://travis-ci.org/irvingswiftj/f1-2018-udp)

A javascript UDP client for Codemaster's F1 2018 game

## Get started

### Turn on UDP in F1 2018

Goto the Telemetry section from the settings panel

![alt text](https://raw.githubusercontent.com/irvingswiftj/f1-2018-udp/master/docs/screenshot_1.jpg "Settings Page")

Enable Telemetry. Settings that I have working are as below (Screenshot from PS4, may differ on PC/Xbox)

![alt text](https://raw.githubusercontent.com/irvingswiftj/f1-2018-udp/master/docs/screenshot_2.jpg "Telemetry Settings Page")

### Install this module

yarn:
```
yarn add f1-2018-udp
```

npm:
```
npm install f1-2018-udp
```

### How to use this module

```js
import { F12018UDP } from 'f1-2018-udp';
// const F12018UDP = require('f1-2018-udp').default;

const client = new F12018UDP();
client.on('SESSION', m => console.log(m));
client.on('MOTION', m => console.log(m));

//the following listeners need implementing:
client.on('LAP_DATA', m => console.log(m);
client.on('EVENT', m => console.log(m);
client.on('PARTICIPENTS', m => console.log(m);
client.on('CAR_SETUPS', m => console.log(m);
client.on('CAR_TELEMETRY', m => console.log(m);
client.on('CAR_STATUS', m => console.log(m);
client.on('PACKET_TYPES', m => console.log(m);


// to start listening:
client.start();

// and when you want to stop:
client.stop();
```

### Data Examples:

#### Session Data ('SESSION')

```js
{ 
  m_weather: 0,
  m_trackTemperature: 32,
  m_airTemperature: 24,
  m_totalLaps: 1,
  m_trackLength: 5301,
  m_sessionType: 12,
  m_trackId: 0,
  m_era: 0,
  m_sessionTimeLeft: 0,
  m_sessionDuration: 600,
  m_pitSpeedLimit: 60,
  m_gamePaused: 0,
  m_isSpectating: 0,
  m_spectatorCarIndex: 255,
  m_sliProNativeSupport: 0,
  m_numMarshalZones: 20,
  m_marshalZones:
   [ { m_zoneStart: 0.0034349223133176565, m_zoneFlag: 0 },
     { m_zoneStart: 0.046953488141298294, m_zoneFlag: 0 },
     { m_zoneStart: 0.10253215581178665, m_zoneFlag: 0 },
     { m_zoneStart: 0.13801532983779907, m_zoneFlag: 0 },
     { m_zoneStart: 0.19119225442409515, m_zoneFlag: 0 },
     { m_zoneStart: 0.23203858733177185, m_zoneFlag: 0 },
     { m_zoneStart: 0.2666279673576355, m_zoneFlag: 0 },
     { m_zoneStart: 0.302608460187912, m_zoneFlag: 0 },
     { m_zoneStart: 0.3338783383369446, m_zoneFlag: 0 },
     { m_zoneStart: 0.39663514494895935, m_zoneFlag: 0 },
     { m_zoneStart: 0.4584471881389618, m_zoneFlag: 0 },
     { m_zoneStart: 0.5201972126960754, m_zoneFlag: 0 },
     { m_zoneStart: 0.5627534985542297, m_zoneFlag: 0 },
     { m_zoneStart: 0.6141020059585571, m_zoneFlag: 0 },
     { m_zoneStart: 0.652631402015686, m_zoneFlag: 0 },
     { m_zoneStart: 0.7192232608795166, m_zoneFlag: 0 },
     { m_zoneStart: 0.760098934173584, m_zoneFlag: 0 },
     { m_zoneStart: 0.8200178742408752, m_zoneFlag: 0 },
     { m_zoneStart: 0.876452624797821, m_zoneFlag: 0 },
     { m_zoneStart: 0.9027065634727478, m_zoneFlag: 0 },
     { m_zoneStart: 0, m_zoneFlag: 0 }
    ],
    m_safetyCarStatus: 0,
    m_networkGame: 0 
  }
```

#### Motion Data ('MOTION')

```
{ 
  m_carMotionData:[
    {
       m_worldPositionX: -1.600844318216943e-10,
       m_worldPositionY: 3.649669868239361e+24,
       m_worldPositionZ: -622084.1875,
       m_worldVelocityX: 2.1621154121807687e+21,
       m_worldVelocityY: 3.2483699063945437e-10,
       m_worldVelocityZ: 5.619121284263479e-35,
       m_worldForwardDirX: 44963,
       m_worldForwardDirY: 50687,
       m_worldForwardDirZ: 22695,
       m_worldRightDirX: 43096,
       m_worldRightDirY: 18431,
       m_worldRightDirZ: 44963,
       m_gForceLateral: 2.3500860979464022e-11,
       m_gForceLongitudinal: 0.023515816777944565,
       m_gForceVertical: 6.914965822168995e-10,
       m_yaw: 3.096904327633499e+26,
       m_pitch: 0.002596511272713542,
       m_roll: -42.18088912963867
     }, {
       m_worldPositionX: -249961925486575600,
       m_worldPositionY: 212434451169280,
       m_worldPositionZ: -1.4979408154069062e-15,
       m_worldVelocityX: 1.8532975023054278e+34,
       m_worldVelocityY: -4.079073555174008e-37,
       m_worldVelocityZ: 5.605280570782446e-22,
       m_worldForwardDirX: 11428,
       m_worldForwardDirY: 53503,
       m_worldForwardDirZ: 56230,
       m_worldRightDirX: 9561,
       m_worldRightDirY: 47871,
       m_worldRightDirZ: 11428,
       m_gForceLateral: -0.0000015670733546357951,
       m_gForceLongitudinal: 3.8872688965814483e-25,
       m_gForceVertical: -2.2610824458874396e+25,
       m_yaw: -1.993031986295794e+21,
       m_pitch: -425328240500932600,
       m_roll: 5370312192
    },{
       m_worldPositionX: -1.7533685007370403e-12,
       m_worldPositionY: -5.699393534498568e-18,
       m_worldPositionZ: -3.000881607009148e-13,
       m_worldVelocityX: 0,
       m_worldVelocityY: 0,
       m_worldVelocityZ: 0,
       m_worldForwardDirX: 61347,
       m_worldForwardDirY: 20223,
       m_worldForwardDirZ: 6055,
       m_worldRightDirX: 59736,
       m_worldRightDirY: 26112,
       m_worldRightDirZ: 61091,
       m_gForceLateral: 0,
       m_gForceLongitudinal: 0,
       m_gForceVertical: 0,
       m_yaw: 4.831828296844587e-15,
       m_pitch: -1.4612898255106657e-17,
       m_roll: 2.6638456047609653e-33
     }, {
       m_worldPositionX: -9.54401985675057e-25,
       m_worldPositionY: -2.2791339128469534e-14,
       m_worldPositionZ: -0.000009711892744235229,
       m_worldVelocityX: 0,
       m_worldVelocityY: 0,
       m_worldVelocityZ: 0,
       m_worldForwardDirX: 61347,
       m_worldForwardDirY: 13055,
       m_worldForwardDirZ: 6055,
       m_worldRightDirX: 59736,
       m_worldRightDirY: 17920,
       m_worldRightDirZ: 61091,
       m_gForceLateral: 0,
       m_gForceLongitudinal: 0,
       m_gForceVertical: 0,
       m_yaw: 1.2666347970480274e-9,
       m_pitch: -266582005813084160,
       m_roll: -6.16311802685717e-15
     }, {
       m_worldPositionX: -2.8990481890089903e-11,
       m_worldPositionY: -0.01687014102935791,
       m_worldPositionZ: 1.5232948079797035e-38,
       m_worldVelocityX: -66427035648,
       m_worldVelocityY: 2.631827937790489e-31,
       m_worldVelocityZ: 3.261758625213688e-35,
       m_worldForwardDirX: 38819,
       m_worldForwardDirY: 45567,
       m_worldForwardDirZ: 29863,
       m_worldRightDirX: 35928,
       m_worldRightDirY: 16127,
       m_worldRightDirZ: 39075,
       m_gForceLateral: -107709709942784,
       m_gForceLongitudinal: -1.2593017266100663e+37,
       m_gForceVertical: -75.5942153930664,
       m_yaw: 268059835340161020,
       m_pitch: 18843219001344,
       m_roll: 1.1923402369606872e-11
     }, {
       m_worldPositionX: -259683.03125,
       m_worldPositionY: 0.00003559817560017109,
       m_worldPositionZ: 0.0000051843539949913975,
       m_worldVelocityX: 0,
       m_worldVelocityY: 0,
       m_worldVelocityZ: 0,
       m_worldForwardDirX: 61347,
       m_worldForwardDirY: 19711,
       m_worldForwardDirZ: 5799,
       m_worldRightDirX: 59736,
       m_worldRightDirY: 37632,
       m_worldRightDirZ: 61091,
       m_gForceLateral: 0,
       m_gForceLongitudinal: 0,
       m_gForceVertical: 0,
       m_yaw: 4.947792175968857e-12,
       m_pitch: -945346559824887800,
       m_roll: -1.6981386255422176e-35
     }, {
       m_worldPositionX: 3.8959285702917464e-16,
       m_worldPositionY: -1.1452915438942002e-14,
       m_worldPositionZ: 27811000933477777000,
       m_worldVelocityX: 0,
       m_worldVelocityY: 0,
       m_worldVelocityZ: 0,
       m_worldForwardDirX: 61347,
       m_worldForwardDirY: 23039,
       m_worldForwardDirZ: 5799,
       m_worldRightDirX: 59736,
       m_worldRightDirY: 35840,
       m_worldRightDirZ: 61091,
       m_gForceLateral: 0,
       m_gForceLongitudinal: 0,
       m_gForceVertical: 0,
       m_yaw: 3.019892685527867e-16,
       m_pitch: 1.2537786087118974e-10,
       m_roll: -0.00010039793414762244
     }, {
       m_worldPositionX: 1.1579984398414424e-32,
       m_worldPositionY: 2.5542789179727693e+29,
       m_worldPositionZ: -5.5000530817325275e+25,
       m_worldVelocityX: 0,
       m_worldVelocityY: 0,
       m_worldVelocityZ: 0,
       m_worldForwardDirX: 61091,
       m_worldForwardDirY: 49151,
       m_worldForwardDirZ: 6055,
       m_worldRightDirX: 59736,
       m_worldRightDirY: 29440,
       m_worldRightDirZ: 61091,
       m_gForceLateral: 0,
       m_gForceLongitudinal: 0,
       m_gForceVertical: 0,
       m_yaw: -1.755290036983212e+33,
       m_pitch: -8.363237498087983e-7,
       m_roll: -0.045753221958875656
     }, {
       m_worldPositionX: -1.6463275565240608e-20,
       m_worldPositionY: -4.7505253199781105e-33,
       m_worldPositionZ: 1.3095172878691432e-28,
       m_worldVelocityX: 0,
       m_worldVelocityY: 0,
       m_worldVelocityZ: 0,
       m_worldForwardDirX: 61091,
       m_worldForwardDirY: 28671,
       m_worldForwardDirZ: 6055,
       m_worldRightDirX: 59736,
       m_worldRightDirY: 12544,
       m_worldRightDirZ: 61091,
       m_gForceLateral: 0,
       m_gForceLongitudinal: 0,
       m_gForceVertical: 0,
       m_yaw: 6.866440993526036e-29,
       m_pitch: -2.4161151688128423e-38,
       m_roll: 874210125676544
     }, {
       m_worldPositionX: 0.020304087549448013,
       m_worldPositionY: -1.1110352811429696e-29,
       m_worldPositionZ: -3.122516656318356e-15,
       m_worldVelocityX: 0,
       m_worldVelocityY: 0,
       m_worldVelocityZ: 0,
       m_worldForwardDirX: 61091,
       m_worldForwardDirY: 20479,
       m_worldForwardDirZ: 6055,
       m_worldRightDirX: 59736,
       m_worldRightDirY: 12544,
       m_worldRightDirZ: 61091,
       m_gForceLateral: 0,
       m_gForceLongitudinal: 0,
       m_gForceVertical: 0,
       m_yaw: 4.607990547985637e-21,
       m_pitch: 36.65891647338867,
       m_roll: -41.942115783691406
     }, {
       m_worldPositionX: 3.2232755925848536e+26,
       m_worldPositionY: 15358272,
       m_worldPositionZ: 4.210122918693604e-13,
       m_worldVelocityX: 0,
       m_worldVelocityY: 0,
       m_worldVelocityZ: 0,
       m_worldForwardDirX: 61091,
       m_worldForwardDirY: 39679,
       m_worldForwardDirZ: 6055,
       m_worldRightDirX: 59736,
       m_worldRightDirY: 25600,
       m_worldRightDirZ: 61091,
       m_gForceLateral: 0,
       m_gForceLongitudinal: 0,
       m_gForceVertical: 0,
       m_yaw: 4.092717762902997e-36,
       m_pitch: 8.573657376916983e-22,
       m_roll: -1.407855775423201e-25
     }, {
       m_worldPositionX: -18107780,
       m_worldPositionY: -8343.0625,
       m_worldPositionZ: 0.0025484124198555946,
       m_worldVelocityX: 0,
       m_worldVelocityY: 0,
       m_worldVelocityZ: 0,
       m_worldForwardDirX: 61091,
       m_worldForwardDirY: 44287,
       m_worldForwardDirZ: 5799,
       m_worldRightDirX: 59736,
       m_worldRightDirY: 37376,
       m_worldRightDirZ: 61091,
       m_gForceLateral: 0,
       m_gForceLongitudinal: 0,
       m_gForceVertical: 0,
       m_yaw: -4.493542494677023e+35,
       m_pitch: 15.477229118347168,
       m_roll: -1.3420968215545309e-17
     }, {
       m_worldPositionX: 6.374155572635891e-19,
       m_worldPositionY: 4.481361030379524e-24,
       m_worldPositionZ: -1.919260853192487e-17,
       m_worldVelocityX: 0,
       m_worldVelocityY: 0,
       m_worldVelocityZ: 0,
       m_worldForwardDirX: 61091,
       m_worldForwardDirY: 50687,
       m_worldForwardDirZ: 6055,
       m_worldRightDirX: 59736,
       m_worldRightDirY: 27648,
       m_worldRightDirZ: 61091,
       m_gForceLateral: 0,
       m_gForceLongitudinal: 0,
       m_gForceVertical: 0,
       m_yaw: -1.0970562731145076e+32,
       m_pitch: -1.206125087355406e+27,
       m_roll: 2.876436543980173e+25
     }, {
       m_worldPositionX: 1.9630852637016144e-32,
       m_worldPositionY: -6.396398177382106e+26,
       m_worldPositionZ: -2.4117947685167013e-26,
       m_worldVelocityX: 8.457943257987088e-40,
       m_worldVelocityY: 2.187264154847402e-26,
       m_worldVelocityZ: 1669258496,
       m_worldForwardDirX: 58274,
       m_worldForwardDirY: 27135,
       m_worldForwardDirZ: 12200,
       m_worldRightDirX: 53591,
       m_worldRightDirY: 31232,
       m_worldRightDirZ: 58274,
       m_gForceLateral: -1.7092111824186865e-14,
       m_gForceLongitudinal: -7.90592533330291e+32,
       m_gForceVertical: 3.160826055818225e-26,
       m_yaw: -2.168062079072842e-38,
       m_pitch: -0.003643198637291789,
       m_roll: -8305245.5
     }, {
       m_worldPositionX: 0,
       m_worldPositionY: 0,
       m_worldPositionZ: 0,
       m_worldVelocityX: 0,
       m_worldVelocityY: 0,
       m_worldVelocityZ: 0,
       m_worldForwardDirX: 0,
       m_worldForwardDirY: 0,
       m_worldForwardDirZ: 0,
       m_worldRightDirX: 0,
       m_worldRightDirY: 0,
       m_worldRightDirZ: 0,
       m_gForceLateral: 0,
       m_gForceLongitudinal: 0,
       m_gForceVertical: 0,
       m_yaw: 0,
       m_pitch: 0,
       m_roll: 0
     }, {
       m_worldPositionX: 0,
       m_worldPositionY: 0,
       m_worldPositionZ: 0,
       m_worldVelocityX: 0,
       m_worldVelocityY: 0,
       m_worldVelocityZ: 0,
       m_worldForwardDirX: 0,
       m_worldForwardDirY: 0,
       m_worldForwardDirZ: 0,
       m_worldRightDirX: 0,
       m_worldRightDirY: 0,
       m_worldRightDirZ: 0,
       m_gForceLateral: 0,
       m_gForceLongitudinal: 0,
       m_gForceVertical: 0,
       m_yaw: 0,
       m_pitch: 0,
       m_roll: 0
     }, {
       m_worldPositionX: 0,
       m_worldPositionY: 0,
       m_worldPositionZ: 0,
       m_worldVelocityX: 0,
       m_worldVelocityY: 0,
       m_worldVelocityZ: 0,
       m_worldForwardDirX: 0,
       m_worldForwardDirY: 0,
       m_worldForwardDirZ: 0,
       m_worldRightDirX: 0,
       m_worldRightDirY: 0,
       m_worldRightDirZ: 0,
       m_gForceLateral: 0,
       m_gForceLongitudinal: 0,
       m_gForceVertical: 0,
       m_yaw: 0,
       m_pitch: 0,
       m_roll: 0
     }, {
       m_worldPositionX: 0,
       m_worldPositionY: 0,
       m_worldPositionZ: 0,
       m_worldVelocityX: 0,
       m_worldVelocityY: 0,
       m_worldVelocityZ: 0,
       m_worldForwardDirX: 0,
       m_worldForwardDirY: 0,
       m_worldForwardDirZ: 0,
       m_worldRightDirX: 0,
       m_worldRightDirY: 0,
       m_worldRightDirZ: 0,
       m_gForceLateral: 0,
       m_gForceLongitudinal: 0,
       m_gForceVertical: 0,
       m_yaw: 0,
       m_pitch: 0,
       m_roll: 0
     }, {
       m_worldPositionX: 0,
       m_worldPositionY: 0,
       m_worldPositionZ: 0,
       m_worldVelocityX: 0,
       m_worldVelocityY: 0,
       m_worldVelocityZ: 0,
       m_worldForwardDirX: 0,
       m_worldForwardDirY: 0,
       m_worldForwardDirZ: 0,
       m_worldRightDirX: 0,
       m_worldRightDirY: 0,
       m_worldRightDirZ: 0,
       m_gForceLateral: 0,
       m_gForceLongitudinal: 0,
       m_gForceVertical: 0,
       m_yaw: 0,
       m_pitch: 0,
       m_roll: 0
     }, {
       m_worldPositionX: 0,
       m_worldPositionY: 0,
       m_worldPositionZ: 0,
       m_worldVelocityX: 0,
       m_worldVelocityY: 0,
       m_worldVelocityZ: 0,
       m_worldForwardDirX: 0,
       m_worldForwardDirY: 0,
       m_worldForwardDirZ: 0,
       m_worldRightDirX: 0,
       m_worldRightDirY: 0,
       m_worldRightDirZ: 0,
       m_gForceLateral: 0,
       m_gForceLongitudinal: 0,
       m_gForceVertical: 0,
       m_yaw: 0,
       m_pitch: 0,
       m_roll: 0
     }
  ],
  m_localVelocityX: 0.0020935367792844772,
  m_localVelocityY: -0.14171281456947327,
  m_localVelocityZ: 81.42234802246094,
  m_angularVelocityX: -0.06651647388935089,
  m_angularVelocityY: -0.000026160749257542193,
  m_angularVelocityZ: 0.025986092165112495,
  m_angularAccelerationX: -2.8684234619140625,
  m_angularAccelerationY: 0.08506451547145844,
  m_angularAccelerationZ: 2.9615044593811035,
  m_frontWheelsAngle: -0.00032900430960580707
}
```

## TODO

- Write Tests!
- Add Parsers according to documentation: https://forums.codemasters.com/discussion/136948/f1-2018-udp-specification