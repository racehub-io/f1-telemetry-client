function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import F1Parser from "../F1Parser";
import CarSetupData from "./CarSetupData";
import PacketHeader from "./PacketHeader";
/*
struct PacketCarSetupData
{
  PacketHeader    m_header;            // Header
  CarSetupData    m_carSetups[20];
};
*/

export default class PacketCarSetupData extends F1Parser {
  constructor(buffer) {
    super();

    _defineProperty(this, "data", void 0);

    this.endianess("little").nest("m_header", {
      type: new PacketHeader()
    }).array("m_carSetups", {
      length: 20,
      type: new CarSetupData()
    });
    this.data = this.fromBuffer(buffer);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXJzL3BhY2tldHMvUGFja2V0Q2FyU2V0dXBEYXRhLnRzIl0sIm5hbWVzIjpbIkYxUGFyc2VyIiwiQ2FyU2V0dXBEYXRhIiwiUGFja2V0SGVhZGVyIiwiUGFja2V0Q2FyU2V0dXBEYXRhIiwiY29uc3RydWN0b3IiLCJidWZmZXIiLCJlbmRpYW5lc3MiLCJuZXN0IiwidHlwZSIsImFycmF5IiwibGVuZ3RoIiwiZGF0YSIsImZyb21CdWZmZXIiXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBT0EsUUFBUCxNQUFxQixhQUFyQjtBQUNBLE9BQU9DLFlBQVAsTUFBeUIsZ0JBQXpCO0FBQ0EsT0FBT0MsWUFBUCxNQUF5QixnQkFBekI7QUFFQTs7Ozs7Ozs7QUFRQSxlQUFlLE1BQU1DLGtCQUFOLFNBQWlDSCxRQUFqQyxDQUEwQztBQUd2REksRUFBQUEsV0FBVyxDQUFDQyxNQUFELEVBQWlCO0FBQzFCOztBQUQwQjs7QUFFMUIsU0FBS0MsU0FBTCxDQUFlLFFBQWYsRUFDR0MsSUFESCxDQUNRLFVBRFIsRUFDb0I7QUFDaEJDLE1BQUFBLElBQUksRUFBRSxJQUFJTixZQUFKO0FBRFUsS0FEcEIsRUFJR08sS0FKSCxDQUlTLGFBSlQsRUFJd0I7QUFDcEJDLE1BQUFBLE1BQU0sRUFBRSxFQURZO0FBRXBCRixNQUFBQSxJQUFJLEVBQUUsSUFBSVAsWUFBSjtBQUZjLEtBSnhCO0FBU0EsU0FBS1UsSUFBTCxHQUFZLEtBQUtDLFVBQUwsQ0FBZ0JQLE1BQWhCLENBQVo7QUFDRDs7QUFmc0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRjFQYXJzZXIgZnJvbSBcIi4uL0YxUGFyc2VyXCI7XG5pbXBvcnQgQ2FyU2V0dXBEYXRhIGZyb20gXCIuL0NhclNldHVwRGF0YVwiO1xuaW1wb3J0IFBhY2tldEhlYWRlciBmcm9tIFwiLi9QYWNrZXRIZWFkZXJcIjtcblxuLypcbnN0cnVjdCBQYWNrZXRDYXJTZXR1cERhdGFcbntcbiAgUGFja2V0SGVhZGVyICAgIG1faGVhZGVyOyAgICAgICAgICAgIC8vIEhlYWRlclxuICBDYXJTZXR1cERhdGEgICAgbV9jYXJTZXR1cHNbMjBdO1xufTtcbiovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhY2tldENhclNldHVwRGF0YSBleHRlbmRzIEYxUGFyc2VyIHtcbiAgZGF0YTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKGJ1ZmZlcjogQnVmZmVyKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmVuZGlhbmVzcyhcImxpdHRsZVwiKVxuICAgICAgLm5lc3QoXCJtX2hlYWRlclwiLCB7XG4gICAgICAgIHR5cGU6IG5ldyBQYWNrZXRIZWFkZXIoKVxuICAgICAgfSlcbiAgICAgIC5hcnJheShcIm1fY2FyU2V0dXBzXCIsIHtcbiAgICAgICAgbGVuZ3RoOiAyMCxcbiAgICAgICAgdHlwZTogbmV3IENhclNldHVwRGF0YSgpXG4gICAgICB9KTtcblxuICAgIHRoaXMuZGF0YSA9IHRoaXMuZnJvbUJ1ZmZlcihidWZmZXIpO1xuICB9XG59XG4iXX0=