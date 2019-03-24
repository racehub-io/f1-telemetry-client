function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import F1Parser from "../F1Parser";
import LapData from "./LapData";
import PacketHeader from "./PacketHeader";
/*
struct PacketLapData
{
    PacketHeader    m_header;              // Header
    LapData         m_lapData[20];         // Lap data for all cars on track
};
*/

export default class PacketLapData extends F1Parser {
  constructor(buffer) {
    super();

    _defineProperty(this, "data", void 0);

    this.endianess("little").nest("m_header", {
      type: new PacketHeader()
    }).array("m_lapData", {
      length: 20,
      type: new LapData()
    });
    this.data = this.fromBuffer(buffer);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXJzL3BhY2tldHMvUGFja2V0TGFwRGF0YS50cyJdLCJuYW1lcyI6WyJGMVBhcnNlciIsIkxhcERhdGEiLCJQYWNrZXRIZWFkZXIiLCJQYWNrZXRMYXBEYXRhIiwiY29uc3RydWN0b3IiLCJidWZmZXIiLCJlbmRpYW5lc3MiLCJuZXN0IiwidHlwZSIsImFycmF5IiwibGVuZ3RoIiwiZGF0YSIsImZyb21CdWZmZXIiXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBT0EsUUFBUCxNQUFxQixhQUFyQjtBQUNBLE9BQU9DLE9BQVAsTUFBb0IsV0FBcEI7QUFDQSxPQUFPQyxZQUFQLE1BQXlCLGdCQUF6QjtBQUVBOzs7Ozs7OztBQVFBLGVBQWUsTUFBTUMsYUFBTixTQUE0QkgsUUFBNUIsQ0FBcUM7QUFHbERJLEVBQUFBLFdBQVcsQ0FBQ0MsTUFBRCxFQUFpQjtBQUMxQjs7QUFEMEI7O0FBRTFCLFNBQUtDLFNBQUwsQ0FBZSxRQUFmLEVBQ0dDLElBREgsQ0FDUSxVQURSLEVBQ29CO0FBQ2hCQyxNQUFBQSxJQUFJLEVBQUUsSUFBSU4sWUFBSjtBQURVLEtBRHBCLEVBSUdPLEtBSkgsQ0FJUyxXQUpULEVBSXNCO0FBQ2xCQyxNQUFBQSxNQUFNLEVBQUUsRUFEVTtBQUVsQkYsTUFBQUEsSUFBSSxFQUFFLElBQUlQLE9BQUo7QUFGWSxLQUp0QjtBQVNBLFNBQUtVLElBQUwsR0FBWSxLQUFLQyxVQUFMLENBQWdCUCxNQUFoQixDQUFaO0FBQ0Q7O0FBZmlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEYxUGFyc2VyIGZyb20gXCIuLi9GMVBhcnNlclwiO1xuaW1wb3J0IExhcERhdGEgZnJvbSBcIi4vTGFwRGF0YVwiO1xuaW1wb3J0IFBhY2tldEhlYWRlciBmcm9tIFwiLi9QYWNrZXRIZWFkZXJcIjtcblxuLypcbnN0cnVjdCBQYWNrZXRMYXBEYXRhXG57XG4gICAgUGFja2V0SGVhZGVyICAgIG1faGVhZGVyOyAgICAgICAgICAgICAgLy8gSGVhZGVyXG4gICAgTGFwRGF0YSAgICAgICAgIG1fbGFwRGF0YVsyMF07ICAgICAgICAgLy8gTGFwIGRhdGEgZm9yIGFsbCBjYXJzIG9uIHRyYWNrXG59O1xuKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFja2V0TGFwRGF0YSBleHRlbmRzIEYxUGFyc2VyIHtcbiAgZGF0YTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKGJ1ZmZlcjogQnVmZmVyKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmVuZGlhbmVzcyhcImxpdHRsZVwiKVxuICAgICAgLm5lc3QoXCJtX2hlYWRlclwiLCB7XG4gICAgICAgIHR5cGU6IG5ldyBQYWNrZXRIZWFkZXIoKVxuICAgICAgfSlcbiAgICAgIC5hcnJheShcIm1fbGFwRGF0YVwiLCB7XG4gICAgICAgIGxlbmd0aDogMjAsXG4gICAgICAgIHR5cGU6IG5ldyBMYXBEYXRhKClcbiAgICAgIH0pO1xuXG4gICAgdGhpcy5kYXRhID0gdGhpcy5mcm9tQnVmZmVyKGJ1ZmZlcik7XG4gIH1cbn1cbiJdfQ==