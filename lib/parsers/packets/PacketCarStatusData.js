function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import F1Parser from "../F1Parser";
import CarStatusData from "./CarStatusData";
import PacketHeader from "./PacketHeader";
/*
struct PacketCarStatusData
{
  PacketHeader        m_header;            // Header
  CarStatusData       m_carStatusData[20];
};
*/

export default class PacketCarStatusData extends F1Parser {
  constructor(buffer) {
    super();

    _defineProperty(this, "data", void 0);

    this.endianess("little").nest("m_header", {
      type: new PacketHeader()
    }).array("m_carSetups", {
      length: 20,
      type: new CarStatusData()
    });
    this.data = this.fromBuffer(buffer);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXJzL3BhY2tldHMvUGFja2V0Q2FyU3RhdHVzRGF0YS50cyJdLCJuYW1lcyI6WyJGMVBhcnNlciIsIkNhclN0YXR1c0RhdGEiLCJQYWNrZXRIZWFkZXIiLCJQYWNrZXRDYXJTdGF0dXNEYXRhIiwiY29uc3RydWN0b3IiLCJidWZmZXIiLCJlbmRpYW5lc3MiLCJuZXN0IiwidHlwZSIsImFycmF5IiwibGVuZ3RoIiwiZGF0YSIsImZyb21CdWZmZXIiXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBT0EsUUFBUCxNQUFxQixhQUFyQjtBQUNBLE9BQU9DLGFBQVAsTUFBMEIsaUJBQTFCO0FBQ0EsT0FBT0MsWUFBUCxNQUF5QixnQkFBekI7QUFFQTs7Ozs7Ozs7QUFRQSxlQUFlLE1BQU1DLG1CQUFOLFNBQWtDSCxRQUFsQyxDQUEyQztBQUd4REksRUFBQUEsV0FBVyxDQUFDQyxNQUFELEVBQWlCO0FBQzFCOztBQUQwQjs7QUFFMUIsU0FBS0MsU0FBTCxDQUFlLFFBQWYsRUFDR0MsSUFESCxDQUNRLFVBRFIsRUFDb0I7QUFDaEJDLE1BQUFBLElBQUksRUFBRSxJQUFJTixZQUFKO0FBRFUsS0FEcEIsRUFJR08sS0FKSCxDQUlTLGFBSlQsRUFJd0I7QUFDcEJDLE1BQUFBLE1BQU0sRUFBRSxFQURZO0FBRXBCRixNQUFBQSxJQUFJLEVBQUUsSUFBSVAsYUFBSjtBQUZjLEtBSnhCO0FBU0EsU0FBS1UsSUFBTCxHQUFZLEtBQUtDLFVBQUwsQ0FBZ0JQLE1BQWhCLENBQVo7QUFDRDs7QUFmdUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRjFQYXJzZXIgZnJvbSBcIi4uL0YxUGFyc2VyXCI7XG5pbXBvcnQgQ2FyU3RhdHVzRGF0YSBmcm9tIFwiLi9DYXJTdGF0dXNEYXRhXCI7XG5pbXBvcnQgUGFja2V0SGVhZGVyIGZyb20gXCIuL1BhY2tldEhlYWRlclwiO1xuXG4vKlxuc3RydWN0IFBhY2tldENhclN0YXR1c0RhdGFcbntcbiAgUGFja2V0SGVhZGVyICAgICAgICBtX2hlYWRlcjsgICAgICAgICAgICAvLyBIZWFkZXJcbiAgQ2FyU3RhdHVzRGF0YSAgICAgICBtX2NhclN0YXR1c0RhdGFbMjBdO1xufTtcbiovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhY2tldENhclN0YXR1c0RhdGEgZXh0ZW5kcyBGMVBhcnNlciB7XG4gIGRhdGE6IGFueTtcblxuICBjb25zdHJ1Y3RvcihidWZmZXI6IEJ1ZmZlcikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5lbmRpYW5lc3MoXCJsaXR0bGVcIilcbiAgICAgIC5uZXN0KFwibV9oZWFkZXJcIiwge1xuICAgICAgICB0eXBlOiBuZXcgUGFja2V0SGVhZGVyKClcbiAgICAgIH0pXG4gICAgICAuYXJyYXkoXCJtX2NhclNldHVwc1wiLCB7XG4gICAgICAgIGxlbmd0aDogMjAsXG4gICAgICAgIHR5cGU6IG5ldyBDYXJTdGF0dXNEYXRhKClcbiAgICAgIH0pO1xuXG4gICAgdGhpcy5kYXRhID0gdGhpcy5mcm9tQnVmZmVyKGJ1ZmZlcik7XG4gIH1cbn1cbiJdfQ==