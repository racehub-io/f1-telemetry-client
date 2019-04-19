# F1 Telemetry Client

<a  href='https://travis-ci.org/jonybur/f1-telemetry-client' ><img  src='https://travis-ci.org/jonybur/f1-telemetry-client.svg?branch=master'></a>
<img  src="https://img.shields.io/github/license/jonybur/f1-telemetry-client.svg">
<a  href="https://snyk.io/test/github/jonybur/f1-telemetry-client?targetFile=package.json"><img  src="https://snyk.io/test/github/jonybur/f1-telemetry-client/badge.svg?targetFile=package.json"  alt="Known Vulnerabilities"  data-canonical-src="https://snyk.io/test/github/jonybur/f1-telemetry-client?targetFile=package.json"  style="max-width:100%;"></a>
<a  href="https://github.com/google/gts"><img  src='https://img.shields.io/badge/code%20style-google-blueviolet.svg'></a>

The F1 series of games support the outputting of key game data via a UDP data stream. This data can be interpreted by external apps or connected peripherals for a range of different uses, including providing additional telemetry information, customised HUD displays, motion platform hardware support or providing force feedback data for custom steering wheels.

This is a TypeScript UDP client and telemetry parser for Codemaster's F1 2018 game that enables the consumption of such information.

## Installing

```
$ npm install f1-telemetry-client
```

or

```
$ yarn add f1-telemetry-client
```

## Running the playground

```
$ npm run start
```

or

```
$ yarn start
```

## Usage

```
import { F1TelemetryClient, constants } from "f1-telemetry-client";
// or: const { F1TelemetryClient, constants } = require('f1-telemetry-client');
const { PACKETS } = constants;

const client = new F1TelemetryClient();
client.on(PACKETS.session, m => console.log(m));
client.on(PACKETS.motion, m => console.log(m));
client.on(PACKETS.lapData, m => console.log(m));
client.on(PACKETS.event, m => console.log(m));
client.on(PACKETS.participants, m => console.log(m));
client.on(PACKETS.carSetups, m => console.log(m));
client.on(PACKETS.carTelemetry, m => console.log(m));
client.on(PACKETS.carStatus, m => console.log(m));

// to start listening:
client.start();

// and when you want to stop:
client.stop();
```

## Packets

| Packet Name                              | Id  |                               Description |       Frequency |       Size |
| ---------------------------------------- | :-: | ----------------------------------------: | --------------: | ---------: |
| [Motion](#packetmotiondata)              |  0  |         Contains motion data for all cars |    Menu setting | 1341 bytes |
| [Session](#packetsessiondata)            |  1  |            General data about the session |    2 per second |  147 bytes |
| [Lap Data](#packetlapdata)               |  2  | Lap time info for all cars in the session |    Menu setting |  841 bytes |
| [Event](#packeteventdata)                |  3  |              Session start or session end |        On event |   25 bytes |
| [Participants](#packetparticipantsdata)  |  4  |       List of participants in the session | Every 5 seconds | 1082 bytes |
| [Car Setups](#packetcarsetupdata)        |  5  |       Car setup info for cars in the race |    2 per second |  841 bytes |
| [Car Telemetry](#packetcartelemetrydata) |  6  |               Telemetry data for all cars |    Menu setting | 1085 bytes |
| [Car Status](#packetcarstatusdata)       |  7  |      General car status info for all cars |    2 per second | 1061 bytes |

### PacketHeader

A header has been added to each packet as well so that versioning can be tracked and it will be easier for applications to check they are interpreting the incoming data in the correct way.

```
uint16    m_packetFormat;         // 2018
uint8     m_packetVersion;        // Version of this packet type, all start from 1
uint8     m_packetId;             // Identifier for the packet type, see below
uint64    m_sessionUID;           // Unique identifier for the session, not implemented
float     m_sessionTime;          // Session timestamp
uint      m_frameIdentifier;      // Identifier for the frame the data was retrieved on
uint8     m_playerCarIndex;       // Index of player's car in the array
```

### PacketMotionData

The motion packet gives physics data for all the cars being driven. There is additional data for the car being driven with the goal of being able to drive a motion platform setup.

N.B. For the normalised vectors below, to convert to float values divide by 32767.0f. 16-bit signed values are used to pack the data and on the assumption that direction values are always between -1.0f and 1.0f.

Frequency: Rate as specified in menus

Size: 1341 bytes

```
PacketHeader    m_header;               // Header

CarMotionData   m_carMotionData[20];    // Data for all cars on track

// Extra player car ONLY data
float         m_suspensionPosition[4];       // Note: All wheel arrays have the following order:
float         m_suspensionVelocity[4];       // RL, RR, FL, FR
float         m_suspensionAcceleration[4];   // RL, RR, FL, FR
float         m_wheelSpeed[4];               // Speed of each wheel
float         m_wheelSlip[4];                // Slip ratio for each wheel
float         m_localVelocityX;              // Velocity in local space
float         m_localVelocityY;              // Velocity in local space
float         m_localVelocityZ;              // Velocity in local space
float         m_angularVelocityX;            // Angular velocity x-component
float         m_angularVelocityY;            // Angular velocity y-component
float         m_angularVelocityZ;            // Angular velocity z-component
float         m_angularAccelerationX;        // Angular velocity x-component
float         m_angularAccelerationY;        // Angular velocity y-component
float         m_angularAccelerationZ;        // Angular velocity z-component
float         m_frontWheelsAngle;            // Current front wheels angle in radians
```

#### CarMotionData

```
float         m_worldPositionX;           // World space X position
float         m_worldPositionY;           // World space Y position
float         m_worldPositionZ;           // World space Z position
float         m_worldVelocityX;           // Velocity in world space X
float         m_worldVelocityY;           // Velocity in world space Y
float         m_worldVelocityZ;           // Velocity in world space Z
int16         m_worldForwardDirX;         // World space forward X direction (normalised)
int16         m_worldForwardDirY;         // World space forward Y direction (normalised)
int16         m_worldForwardDirZ;         // World space forward Z direction (normalised)
int16         m_worldRightDirX;           // World space right X direction (normalised)
int16         m_worldRightDirY;           // World space right Y direction (normalised)
int16         m_worldRightDirZ;           // World space right Z direction (normalised)
float         m_gForceLateral;            // Lateral G-Force component
float         m_gForceLongitudinal;       // Longitudinal G-Force component
float         m_gForceVertical;           // Vertical G-Force component
float         m_yaw;                      // Yaw angle in radians
float         m_pitch;                    // Pitch angle in radians
float         m_roll;                     // Roll angle in radians
```

Please note that `m_worldPositionY` corresponds to altitude, so in order to draw a track in two dimensions you would need to use `m_worldPositionX` and `m_worldPositionZ`.

### PacketSessionData

The session packet includes details about the current session in progress.

Frequency: 2 per second

Size: 147 bytes

```
PacketHeader    m_header;               	  // Header

uint8           m_weather;              	  // Weather - 0 = clear, 1 = light cloud, 2 = overcast
                                            // 3 = light rain, 4 = heavy rain, 5 = storm
int8	        m_trackTemperature;    	      // Track temp. in degrees celsius
int8	        m_airTemperature;      	      // Air temp. in degrees celsius
uint8           m_totalLaps;           	    // Total number of laps in this race
uint16          m_trackLength;           	  // Track length in metres
uint8           m_sessionType;         	    // 0 = unknown, 1 = P1, 2 = P2, 3 = P3, 4 = Short P
                                            // 5 = Q1, 6 = Q2, 7 = Q3, 8 = Short Q, 9 = OSQ
                                            // 10 = R, 11 = R2, 12 = Time Trial
int8            m_trackId;         		      // -1 for unknown, 0-21 for tracks
uint8           m_era;                  	  // Era, 0 = modern, 1 = classic
uint16          m_sessionTimeLeft;    	    // Time left in session in seconds
uint16          m_sessionDuration;     	    // Session duration in seconds
uint8           m_pitSpeedLimit;      	    // Pit speed limit in kilometres per hour
uint8           m_gamePaused;               // Whether the game is paused
uint8           m_isSpectating;        	    // Whether the player is spectating
uint8           m_spectatorCarIndex;  	    // Index of the car being spectated
uint8           m_sliProNativeSupport;	    // SLI Pro support, 0 = inactive, 1 = active
uint8           m_numMarshalZones;         	// Number of marshal zones to follow
MarshalZone     m_marshalZones[21];         // List of marshal zones – max 21
uint8           m_safetyCarStatus;          // 0 = no safety car, 1 = full safety car
                                            // 2 = virtual safety car
uint8           m_networkGame;              // 0 = offline, 1 = online
```

#### MarshalZone

```
float  m_zoneStart;   // Fraction (0..1) of way through the lap the marshal zone starts
int8   m_zoneFlag;    // -1 = invalid/unknown, 0 = none, 1 = green, 2 = blue, 3 = yellow, 4 = red
```

### PacketLapData

The lap data packet gives details of all the cars in the session.

Frequency: Rate as specified in menus

Size: 841 bytes

```
PacketHeader    m_header;              // Header

LapData         m_lapData[20];         // Lap data for all cars on track
```

#### LapData

```
float       m_lastLapTime;           // Last lap time in seconds
float       m_currentLapTime;        // Current time around the lap in seconds
float       m_bestLapTime;           // Best lap time of the session in seconds
float       m_sector1Time;           // Sector 1 time in seconds
float       m_sector2Time;           // Sector 2 time in seconds
float       m_lapDistance;           // Distance vehicle is around current lap in metres – could
                                     // be negative if line hasn’t been crossed yet
float       m_totalDistance;         // Total distance travelled in session in metres – could
                                     // be negative if line hasn’t been crossed yet
float       m_safetyCarDelta;        // Delta in seconds for safety car
uint8       m_carPosition;           // Car race position
uint8       m_currentLapNum;         // Current lap number
uint8       m_pitStatus;             // 0 = none, 1 = pitting, 2 = in pit area
uint8       m_sector;                // 0 = sector1, 1 = sector2, 2 = sector3
uint8       m_currentLapInvalid;     // Current lap invalid - 0 = valid, 1 = invalid
uint8       m_penalties;             // Accumulated time penalties in seconds to be added
uint8       m_gridPosition;          // Grid position the vehicle started the race in
uint8       m_driverStatus;          // Status of driver - 0 = in garage, 1 = flying lap
                                     // 2 = in lap, 3 = out lap, 4 = on track
uint8       m_resultStatus;          // Result status - 0 = invalid, 1 = inactive, 2 = active
                                     // 3 = finished, 4 = disqualified, 5 = not classified
                                     // 6 = retired
```

### PacketEventData

This packet gives details of events that happen during the course of the race.

Frequency: When the event occurs

Size: 25 bytes

```
PacketHeader    m_header;               // Header

uint8           m_eventStringCode[4];   // Event string code, see above
```

| Event           |  Code  |                  Description |
| --------------- | :----: | ---------------------------: |
| Session Started | "SSTA" | Sent when the session starts |
| Session Ended   | "SEND" |   Sent when the session ends |

### PacketParticipantsData

This is a list of participants in the race. If the vehicle is controlled by AI, then the name will be the driver name. If this is a multiplayer game, the names will be the Steam Id on PC, or the LAN name if appropriate. On Xbox One, the names will always be the driver name, on PS4 the name will be the LAN name if playing a LAN game, otherwise it will be the driver name.

Frequency: Every 5 seconds

Size: 1082 bytes

```
PacketHeader    m_header;            // Header

uint8           m_numCars;           // Number of cars in the data
ParticipantData m_participants[20];
```

#### ParticipantData

```
uint8      m_aiControlled;           // Whether the vehicle is AI (1) or Human (0) controlled
uint8      m_driverId;               // Driver id
uint8      m_teamId;                 // Team id
uint8      m_raceNumber;             // Race number of the car
uint8      m_nationality;            // Nationality of the driver
char       m_name[48];               // Name of participant in UTF-8 format – null terminated
                                     // Will be truncated with … (U+2026) if too long
```

### PacketCarSetupData

This packet details the car setups for each vehicle in the session. Note that in multiplayer games, other player cars will appear as blank, you will only be able to see your car setup and AI cars.

Frequency: Every 5 seconds

Size: 841 bytes

```
PacketHeader    m_header;            // Header

CarSetupData    m_carSetups[20];
```

#### CarSetupData

```
uint8     m_frontWing;                // Front wing aero
uint8     m_rearWing;                 // Rear wing aero
uint8     m_onThrottle;               // Differential adjustment on throttle (percentage)
uint8     m_offThrottle;              // Differential adjustment off throttle (percentage)
float     m_frontCamber;              // Front camber angle (suspension geometry)
float     m_rearCamber;               // Rear camber angle (suspension geometry)
float     m_frontToe;                 // Front toe angle (suspension geometry)
float     m_rearToe;                  // Rear toe angle (suspension geometry)
uint8     m_frontSuspension;          // Front suspension
uint8     m_rearSuspension;           // Rear suspension
uint8     m_frontAntiRollBar;         // Front anti-roll bar
uint8     m_rearAntiRollBar;          // Front anti-roll bar
uint8     m_frontSuspensionHeight;    // Front ride height
uint8     m_rearSuspensionHeight;     // Rear ride height
uint8     m_brakePressure;            // Brake pressure (percentage)
uint8     m_brakeBias;                // Brake bias (percentage)
float     m_frontTyrePressure;        // Front tyre pressure (PSI)
float     m_rearTyrePressure;         // Rear tyre pressure (PSI)
uint8     m_ballast;                  // Ballast
float     m_fuelLoad;                 // Fuel load
```

### PacketCarTelemetryData

This packet details telemetry for all the cars in the race. It details various values that would be recorded on the car such as speed, throttle application, DRS etc.

Frequency: Rate as specified in menus

Size: 1085 bytes

```
PacketHeader        m_header;                // Header

CarTelemetryData    m_carTelemetryData[20];

uint32              m_buttonStatus;         // Bit flags specifying which buttons are being
                                            // pressed currently - see appendices
```

#### CarTelemetryData

```
uint16    m_speed;                      // Speed of car in kilometres per hour
uint8     m_throttle;                   // Amount of throttle applied (0 to 100)
int8      m_steer;                      // Steering (-100 (full lock left) to 100 (full lock right))
uint8     m_brake;                      // Amount of brake applied (0 to 100)
uint8     m_clutch;                     // Amount of clutch applied (0 to 100)
int8      m_gear;                       // Gear selected (1-8, N=0, R=-1)
uint16    m_engineRPM;                  // Engine RPM
uint8     m_drs;                        // 0 = off, 1 = on
uint8     m_revLightsPercent;           // Rev lights indicator (percentage)
uint16    m_brakesTemperature[4];       // Brakes temperature (celsius)
uint16    m_tyresSurfaceTemperature[4]; // Tyres surface temperature (celsius)
uint16    m_tyresInnerTemperature[4];   // Tyres inner temperature (celsius)
uint16    m_engineTemperature;          // Engine temperature (celsius)
float     m_tyresPressure[4];           // Tyres pressure (PSI)
```

### PacketCarStatusData

This packet details car statuses for all the cars in the race. It includes values such as the damage readings on the car.

Frequency: 2 per second

Size: 1061 bytes

```
PacketHeader        m_header;            // Header

CarStatusData       m_carStatusData[20];
```

#### CarStatusData

```
uint8       m_tractionControl;          // 0 (off) - 2 (high)
uint8       m_antiLockBrakes;           // 0 (off) - 1 (on)
uint8       m_fuelMix;                  // Fuel mix - 0 = lean, 1 = standard, 2 = rich, 3 = max
uint8       m_frontBrakeBias;           // Front brake bias (percentage)
uint8       m_pitLimiterStatus;         // Pit limiter status - 0 = off, 1 = on
float       m_fuelInTank;               // Current fuel mass
float       m_fuelCapacity;             // Fuel capacity
uint16      m_maxRPM;                   // Cars max RPM, point of rev limiter
uint16      m_idleRPM;                  // Cars idle RPM
uint8       m_maxGears;                 // Maximum number of gears
uint8       m_drsAllowed;               // 0 = not allowed, 1 = allowed, -1 = unknown
uint8       m_tyresWear[4];             // Tyre wear percentage
uint8       m_tyreCompound;             // Modern - 0 = hyper soft, 1 = ultra soft
                                        // 2 = super soft, 3 = soft, 4 = medium, 5 = hard
                                        // 6 = super hard, 7 = inter, 8 = wet
                                        // Classic - 0-6 = dry, 7-8 = wet
uint8       m_tyresDamage[4];           // Tyre damage (percentage)
uint8       m_frontLeftWingDamage;      // Front left wing damage (percentage)
uint8       m_frontRightWingDamage;     // Front right wing damage (percentage)
uint8       m_rearWingDamage;           // Rear wing damage (percentage)
uint8       m_engineDamage;             // Engine damage (percentage)
uint8       m_gearBoxDamage;            // Gear box damage (percentage)
uint8       m_exhaustDamage;            // Exhaust damage (percentage)
int8        m_vehicleFiaFlags;          // -1 = invalid/unknown, 0 = none, 1 = green
                                        // 2 = blue, 3 = yellow, 4 = red
float       m_ersStoreEnergy;           // ERS energy store in Joules
uint8       m_ersDeployMode;            // ERS deployment mode, 0 = none, 1 = low, 2 = medium
                                        // 3 = high, 4 = overtake, 5 = hotlap
float       m_ersHarvestedThisLapMGUK;  // ERS energy harvested this lap by MGU-K
float       m_ersHarvestedThisLapMGUH;  // ERS energy harvested this lap by MGU-H
float       m_ersDeployedThisLap;       // ERS energy deployed this lap
```

## Attributions

The documentation of this project is based on [this post](https://forums.codemasters.com/discussion/136948/f1-2018-udp-specification) from the official Codemaster's forum.  
This project is originally a fork from [irvingswiftj's](https://github.com/irvingswiftj) [f1-2018-udp](https://github.com/irvingswiftj/f1-2018-udp).

## License

Licensed under the MIT License.
