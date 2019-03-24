function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import F1Parser from "../F1Parser";
import CarTelemetryData from "./CarTelemetryData";
import PacketHeader from "./PacketHeader";
/*
struct PacketCarTelemetryData
{
  PacketHeader        m_header;                // Header
  CarTelemetryData    m_carTelemetryData[20];
  uint32              m_buttonStatus;          // Bit flags specifying which buttons are being
                                               // pressed currently - see appendices
};
*/

export default class PacketCarTelemetryData extends F1Parser {
  constructor(buffer) {
    super();

    _defineProperty(this, "data", void 0);

    this.endianess("little").nest("m_header", {
      type: new PacketHeader()
    }).array("m_carTelemetryData", {
      length: 20,
      type: new CarTelemetryData()
    }).uint32le("m_buttonStatus");
    this.data = this.fromBuffer(buffer);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXJzL3BhY2tldHMvUGFja2V0Q2FyVGVsZW1ldHJ5RGF0YS50cyJdLCJuYW1lcyI6WyJGMVBhcnNlciIsIkNhclRlbGVtZXRyeURhdGEiLCJQYWNrZXRIZWFkZXIiLCJQYWNrZXRDYXJUZWxlbWV0cnlEYXRhIiwiY29uc3RydWN0b3IiLCJidWZmZXIiLCJlbmRpYW5lc3MiLCJuZXN0IiwidHlwZSIsImFycmF5IiwibGVuZ3RoIiwidWludDMybGUiLCJkYXRhIiwiZnJvbUJ1ZmZlciJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPQSxRQUFQLE1BQXFCLGFBQXJCO0FBQ0EsT0FBT0MsZ0JBQVAsTUFBNkIsb0JBQTdCO0FBQ0EsT0FBT0MsWUFBUCxNQUF5QixnQkFBekI7QUFFQTs7Ozs7Ozs7OztBQVVBLGVBQWUsTUFBTUMsc0JBQU4sU0FBcUNILFFBQXJDLENBQThDO0FBRzNESSxFQUFBQSxXQUFXLENBQUNDLE1BQUQsRUFBaUI7QUFDMUI7O0FBRDBCOztBQUUxQixTQUFLQyxTQUFMLENBQWUsUUFBZixFQUNHQyxJQURILENBQ1EsVUFEUixFQUNvQjtBQUNoQkMsTUFBQUEsSUFBSSxFQUFFLElBQUlOLFlBQUo7QUFEVSxLQURwQixFQUlHTyxLQUpILENBSVMsb0JBSlQsRUFJK0I7QUFDM0JDLE1BQUFBLE1BQU0sRUFBRSxFQURtQjtBQUUzQkYsTUFBQUEsSUFBSSxFQUFFLElBQUlQLGdCQUFKO0FBRnFCLEtBSi9CLEVBUUdVLFFBUkgsQ0FRWSxnQkFSWjtBQVVBLFNBQUtDLElBQUwsR0FBWSxLQUFLQyxVQUFMLENBQWdCUixNQUFoQixDQUFaO0FBQ0Q7O0FBaEIwRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGMVBhcnNlciBmcm9tIFwiLi4vRjFQYXJzZXJcIjtcbmltcG9ydCBDYXJUZWxlbWV0cnlEYXRhIGZyb20gXCIuL0NhclRlbGVtZXRyeURhdGFcIjtcbmltcG9ydCBQYWNrZXRIZWFkZXIgZnJvbSBcIi4vUGFja2V0SGVhZGVyXCI7XG5cbi8qXG5zdHJ1Y3QgUGFja2V0Q2FyVGVsZW1ldHJ5RGF0YVxue1xuICBQYWNrZXRIZWFkZXIgICAgICAgIG1faGVhZGVyOyAgICAgICAgICAgICAgICAvLyBIZWFkZXJcbiAgQ2FyVGVsZW1ldHJ5RGF0YSAgICBtX2NhclRlbGVtZXRyeURhdGFbMjBdO1xuICB1aW50MzIgICAgICAgICAgICAgIG1fYnV0dG9uU3RhdHVzOyAgICAgICAgICAvLyBCaXQgZmxhZ3Mgc3BlY2lmeWluZyB3aGljaCBidXR0b25zIGFyZSBiZWluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwcmVzc2VkIGN1cnJlbnRseSAtIHNlZSBhcHBlbmRpY2VzXG59O1xuKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFja2V0Q2FyVGVsZW1ldHJ5RGF0YSBleHRlbmRzIEYxUGFyc2VyIHtcbiAgZGF0YTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKGJ1ZmZlcjogQnVmZmVyKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmVuZGlhbmVzcyhcImxpdHRsZVwiKVxuICAgICAgLm5lc3QoXCJtX2hlYWRlclwiLCB7XG4gICAgICAgIHR5cGU6IG5ldyBQYWNrZXRIZWFkZXIoKVxuICAgICAgfSlcbiAgICAgIC5hcnJheShcIm1fY2FyVGVsZW1ldHJ5RGF0YVwiLCB7XG4gICAgICAgIGxlbmd0aDogMjAsXG4gICAgICAgIHR5cGU6IG5ldyBDYXJUZWxlbWV0cnlEYXRhKClcbiAgICAgIH0pXG4gICAgICAudWludDMybGUoXCJtX2J1dHRvblN0YXR1c1wiKTtcblxuICAgIHRoaXMuZGF0YSA9IHRoaXMuZnJvbUJ1ZmZlcihidWZmZXIpO1xuICB9XG59XG4iXX0=