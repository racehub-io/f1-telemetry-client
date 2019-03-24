function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import F1Parser from "../F1Parser";
import CarMotionData from "./CarMotionData";
import PacketHeader from "./PacketHeader";
import { Parser } from "binary-parser";
/*
struct PacketMotionData
{
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
};
*/

export default class PacketMotionData extends F1Parser {
  constructor(buffer) {
    super();

    _defineProperty(this, "data", void 0);

    this.endianess("little").nest("m_header", {
      type: new PacketHeader()
    }).array("m_carMotionData", {
      length: 20,
      type: new CarMotionData()
    }).array("m_suspensionPosition", {
      length: 4,
      type: new Parser().floatle("m_suspensionPosition")
    }).array("m_suspensionVelocity", {
      length: 4,
      type: new Parser().floatle("m_suspensionVelocity")
    }).array("m_suspensionAcceleration", {
      length: 4,
      type: new Parser().floatle("m_suspensionAcceleration")
    }).array("m_wheelSpeed", {
      length: 4,
      type: new Parser().floatle("m_wheelSpeed")
    }).array("m_wheelSlip", {
      length: 4,
      type: new Parser().floatle("m_wheelSlip")
    }).floatle("m_localVelocityX") // Velocity in local space
    .floatle("m_localVelocityY") // Velocity in local space
    .floatle("m_localVelocityZ") // Velocity in local space
    .floatle("m_angularVelocityX") // Angular velocity x-component
    .floatle("m_angularVelocityY") // Angular velocity y-component
    .floatle("m_angularVelocityZ") // Angular velocity z-component
    .floatle("m_angularAccelerationX") // Angular velocity x-component
    .floatle("m_angularAccelerationY") // Angular velocity y-component
    .floatle("m_angularAccelerationZ") // Angular velocity z-component
    .floatle("m_frontWheelsAngle"); // Current front wheels angle in radians;

    this.data = this.fromBuffer(buffer);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXJzL3BhY2tldHMvUGFja2V0TW90aW9uRGF0YS50cyJdLCJuYW1lcyI6WyJGMVBhcnNlciIsIkNhck1vdGlvbkRhdGEiLCJQYWNrZXRIZWFkZXIiLCJQYXJzZXIiLCJQYWNrZXRNb3Rpb25EYXRhIiwiY29uc3RydWN0b3IiLCJidWZmZXIiLCJlbmRpYW5lc3MiLCJuZXN0IiwidHlwZSIsImFycmF5IiwibGVuZ3RoIiwiZmxvYXRsZSIsImRhdGEiLCJmcm9tQnVmZmVyIl0sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU9BLFFBQVAsTUFBcUIsYUFBckI7QUFDQSxPQUFPQyxhQUFQLE1BQTBCLGlCQUExQjtBQUNBLE9BQU9DLFlBQVAsTUFBeUIsZ0JBQXpCO0FBQ0EsU0FBU0MsTUFBVCxRQUF1QixlQUF2QjtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxlQUFlLE1BQU1DLGdCQUFOLFNBQStCSixRQUEvQixDQUF3QztBQUdyREssRUFBQUEsV0FBVyxDQUFDQyxNQUFELEVBQWlCO0FBQzFCOztBQUQwQjs7QUFFMUIsU0FBS0MsU0FBTCxDQUFlLFFBQWYsRUFDR0MsSUFESCxDQUNRLFVBRFIsRUFDb0I7QUFDaEJDLE1BQUFBLElBQUksRUFBRSxJQUFJUCxZQUFKO0FBRFUsS0FEcEIsRUFJR1EsS0FKSCxDQUlTLGlCQUpULEVBSTRCO0FBQ3hCQyxNQUFBQSxNQUFNLEVBQUUsRUFEZ0I7QUFFeEJGLE1BQUFBLElBQUksRUFBRSxJQUFJUixhQUFKO0FBRmtCLEtBSjVCLEVBUUdTLEtBUkgsQ0FRUyxzQkFSVCxFQVFpQztBQUM3QkMsTUFBQUEsTUFBTSxFQUFFLENBRHFCO0FBRTdCRixNQUFBQSxJQUFJLEVBQUUsSUFBSU4sTUFBSixHQUFhUyxPQUFiLENBQXFCLHNCQUFyQjtBQUZ1QixLQVJqQyxFQVlHRixLQVpILENBWVMsc0JBWlQsRUFZaUM7QUFDN0JDLE1BQUFBLE1BQU0sRUFBRSxDQURxQjtBQUU3QkYsTUFBQUEsSUFBSSxFQUFFLElBQUlOLE1BQUosR0FBYVMsT0FBYixDQUFxQixzQkFBckI7QUFGdUIsS0FaakMsRUFnQkdGLEtBaEJILENBZ0JTLDBCQWhCVCxFQWdCcUM7QUFDakNDLE1BQUFBLE1BQU0sRUFBRSxDQUR5QjtBQUVqQ0YsTUFBQUEsSUFBSSxFQUFFLElBQUlOLE1BQUosR0FBYVMsT0FBYixDQUFxQiwwQkFBckI7QUFGMkIsS0FoQnJDLEVBb0JHRixLQXBCSCxDQW9CUyxjQXBCVCxFQW9CeUI7QUFDckJDLE1BQUFBLE1BQU0sRUFBRSxDQURhO0FBRXJCRixNQUFBQSxJQUFJLEVBQUUsSUFBSU4sTUFBSixHQUFhUyxPQUFiLENBQXFCLGNBQXJCO0FBRmUsS0FwQnpCLEVBd0JHRixLQXhCSCxDQXdCUyxhQXhCVCxFQXdCd0I7QUFDcEJDLE1BQUFBLE1BQU0sRUFBRSxDQURZO0FBRXBCRixNQUFBQSxJQUFJLEVBQUUsSUFBSU4sTUFBSixHQUFhUyxPQUFiLENBQXFCLGFBQXJCO0FBRmMsS0F4QnhCLEVBNEJHQSxPQTVCSCxDQTRCVyxrQkE1QlgsRUE0QitCO0FBNUIvQixLQTZCR0EsT0E3QkgsQ0E2Qlcsa0JBN0JYLEVBNkIrQjtBQTdCL0IsS0E4QkdBLE9BOUJILENBOEJXLGtCQTlCWCxFQThCK0I7QUE5Qi9CLEtBK0JHQSxPQS9CSCxDQStCVyxvQkEvQlgsRUErQmlDO0FBL0JqQyxLQWdDR0EsT0FoQ0gsQ0FnQ1csb0JBaENYLEVBZ0NpQztBQWhDakMsS0FpQ0dBLE9BakNILENBaUNXLG9CQWpDWCxFQWlDaUM7QUFqQ2pDLEtBa0NHQSxPQWxDSCxDQWtDVyx3QkFsQ1gsRUFrQ3FDO0FBbENyQyxLQW1DR0EsT0FuQ0gsQ0FtQ1csd0JBbkNYLEVBbUNxQztBQW5DckMsS0FvQ0dBLE9BcENILENBb0NXLHdCQXBDWCxFQW9DcUM7QUFwQ3JDLEtBcUNHQSxPQXJDSCxDQXFDVyxvQkFyQ1gsRUFGMEIsQ0F1Q1E7O0FBRWxDLFNBQUtDLElBQUwsR0FBWSxLQUFLQyxVQUFMLENBQWdCUixNQUFoQixDQUFaO0FBQ0Q7O0FBN0NvRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGMVBhcnNlciBmcm9tIFwiLi4vRjFQYXJzZXJcIjtcbmltcG9ydCBDYXJNb3Rpb25EYXRhIGZyb20gXCIuL0Nhck1vdGlvbkRhdGFcIjtcbmltcG9ydCBQYWNrZXRIZWFkZXIgZnJvbSBcIi4vUGFja2V0SGVhZGVyXCI7XG5pbXBvcnQgeyBQYXJzZXIgfSBmcm9tIFwiYmluYXJ5LXBhcnNlclwiO1xuXG4vKlxuc3RydWN0IFBhY2tldE1vdGlvbkRhdGFcbntcbiAgICBQYWNrZXRIZWFkZXIgICAgbV9oZWFkZXI7ICAgICAgICAgICAgICAgLy8gSGVhZGVyXG5cbiAgICBDYXJNb3Rpb25EYXRhICAgbV9jYXJNb3Rpb25EYXRhWzIwXTsgICAgLy8gRGF0YSBmb3IgYWxsIGNhcnMgb24gdHJhY2tcblxuICAgIC8vIEV4dHJhIHBsYXllciBjYXIgT05MWSBkYXRhXG4gICAgZmxvYXQgICAgICAgICBtX3N1c3BlbnNpb25Qb3NpdGlvbls0XTsgICAgICAgLy8gTm90ZTogQWxsIHdoZWVsIGFycmF5cyBoYXZlIHRoZSBmb2xsb3dpbmcgb3JkZXI6XG4gICAgZmxvYXQgICAgICAgICBtX3N1c3BlbnNpb25WZWxvY2l0eVs0XTsgICAgICAgLy8gUkwsIFJSLCBGTCwgRlJcbiAgICBmbG9hdCAgICAgICAgIG1fc3VzcGVuc2lvbkFjY2VsZXJhdGlvbls0XTsgICAvLyBSTCwgUlIsIEZMLCBGUlxuICAgIGZsb2F0ICAgICAgICAgbV93aGVlbFNwZWVkWzRdOyAgICAgICAgICAgICAgIC8vIFNwZWVkIG9mIGVhY2ggd2hlZWxcbiAgICBmbG9hdCAgICAgICAgIG1fd2hlZWxTbGlwWzRdOyAgICAgICAgICAgICAgICAvLyBTbGlwIHJhdGlvIGZvciBlYWNoIHdoZWVsXG4gICAgZmxvYXQgICAgICAgICBtX2xvY2FsVmVsb2NpdHlYOyAgICAgICAgICAgICAgLy8gVmVsb2NpdHkgaW4gbG9jYWwgc3BhY2VcbiAgICBmbG9hdCAgICAgICAgIG1fbG9jYWxWZWxvY2l0eVk7ICAgICAgICAgICAgICAvLyBWZWxvY2l0eSBpbiBsb2NhbCBzcGFjZVxuICAgIGZsb2F0ICAgICAgICAgbV9sb2NhbFZlbG9jaXR5WjsgICAgICAgICAgICAgIC8vIFZlbG9jaXR5IGluIGxvY2FsIHNwYWNlXG4gICAgZmxvYXQgICAgICAgICBtX2FuZ3VsYXJWZWxvY2l0eVg7ICAgICAgICAgICAgLy8gQW5ndWxhciB2ZWxvY2l0eSB4LWNvbXBvbmVudFxuICAgIGZsb2F0ICAgICAgICAgbV9hbmd1bGFyVmVsb2NpdHlZOyAgICAgICAgICAgIC8vIEFuZ3VsYXIgdmVsb2NpdHkgeS1jb21wb25lbnRcbiAgICBmbG9hdCAgICAgICAgIG1fYW5ndWxhclZlbG9jaXR5WjsgICAgICAgICAgICAvLyBBbmd1bGFyIHZlbG9jaXR5IHotY29tcG9uZW50XG4gICAgZmxvYXQgICAgICAgICBtX2FuZ3VsYXJBY2NlbGVyYXRpb25YOyAgICAgICAgLy8gQW5ndWxhciB2ZWxvY2l0eSB4LWNvbXBvbmVudFxuICAgIGZsb2F0ICAgICAgICAgbV9hbmd1bGFyQWNjZWxlcmF0aW9uWTsgICAgICAgIC8vIEFuZ3VsYXIgdmVsb2NpdHkgeS1jb21wb25lbnRcbiAgICBmbG9hdCAgICAgICAgIG1fYW5ndWxhckFjY2VsZXJhdGlvblo7ICAgICAgICAvLyBBbmd1bGFyIHZlbG9jaXR5IHotY29tcG9uZW50XG4gICAgZmxvYXQgICAgICAgICBtX2Zyb250V2hlZWxzQW5nbGU7ICAgICAgICAgICAgLy8gQ3VycmVudCBmcm9udCB3aGVlbHMgYW5nbGUgaW4gcmFkaWFuc1xufTtcbiovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhY2tldE1vdGlvbkRhdGEgZXh0ZW5kcyBGMVBhcnNlciB7XG4gIGRhdGE6IGFueTtcblxuICBjb25zdHJ1Y3RvcihidWZmZXI6IEJ1ZmZlcikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5lbmRpYW5lc3MoXCJsaXR0bGVcIilcbiAgICAgIC5uZXN0KFwibV9oZWFkZXJcIiwge1xuICAgICAgICB0eXBlOiBuZXcgUGFja2V0SGVhZGVyKClcbiAgICAgIH0pXG4gICAgICAuYXJyYXkoXCJtX2Nhck1vdGlvbkRhdGFcIiwge1xuICAgICAgICBsZW5ndGg6IDIwLFxuICAgICAgICB0eXBlOiBuZXcgQ2FyTW90aW9uRGF0YSgpXG4gICAgICB9KVxuICAgICAgLmFycmF5KFwibV9zdXNwZW5zaW9uUG9zaXRpb25cIiwge1xuICAgICAgICBsZW5ndGg6IDQsXG4gICAgICAgIHR5cGU6IG5ldyBQYXJzZXIoKS5mbG9hdGxlKFwibV9zdXNwZW5zaW9uUG9zaXRpb25cIilcbiAgICAgIH0pXG4gICAgICAuYXJyYXkoXCJtX3N1c3BlbnNpb25WZWxvY2l0eVwiLCB7XG4gICAgICAgIGxlbmd0aDogNCxcbiAgICAgICAgdHlwZTogbmV3IFBhcnNlcigpLmZsb2F0bGUoXCJtX3N1c3BlbnNpb25WZWxvY2l0eVwiKVxuICAgICAgfSlcbiAgICAgIC5hcnJheShcIm1fc3VzcGVuc2lvbkFjY2VsZXJhdGlvblwiLCB7XG4gICAgICAgIGxlbmd0aDogNCxcbiAgICAgICAgdHlwZTogbmV3IFBhcnNlcigpLmZsb2F0bGUoXCJtX3N1c3BlbnNpb25BY2NlbGVyYXRpb25cIilcbiAgICAgIH0pXG4gICAgICAuYXJyYXkoXCJtX3doZWVsU3BlZWRcIiwge1xuICAgICAgICBsZW5ndGg6IDQsXG4gICAgICAgIHR5cGU6IG5ldyBQYXJzZXIoKS5mbG9hdGxlKFwibV93aGVlbFNwZWVkXCIpXG4gICAgICB9KVxuICAgICAgLmFycmF5KFwibV93aGVlbFNsaXBcIiwge1xuICAgICAgICBsZW5ndGg6IDQsXG4gICAgICAgIHR5cGU6IG5ldyBQYXJzZXIoKS5mbG9hdGxlKFwibV93aGVlbFNsaXBcIilcbiAgICAgIH0pXG4gICAgICAuZmxvYXRsZShcIm1fbG9jYWxWZWxvY2l0eVhcIikgLy8gVmVsb2NpdHkgaW4gbG9jYWwgc3BhY2VcbiAgICAgIC5mbG9hdGxlKFwibV9sb2NhbFZlbG9jaXR5WVwiKSAvLyBWZWxvY2l0eSBpbiBsb2NhbCBzcGFjZVxuICAgICAgLmZsb2F0bGUoXCJtX2xvY2FsVmVsb2NpdHlaXCIpIC8vIFZlbG9jaXR5IGluIGxvY2FsIHNwYWNlXG4gICAgICAuZmxvYXRsZShcIm1fYW5ndWxhclZlbG9jaXR5WFwiKSAvLyBBbmd1bGFyIHZlbG9jaXR5IHgtY29tcG9uZW50XG4gICAgICAuZmxvYXRsZShcIm1fYW5ndWxhclZlbG9jaXR5WVwiKSAvLyBBbmd1bGFyIHZlbG9jaXR5IHktY29tcG9uZW50XG4gICAgICAuZmxvYXRsZShcIm1fYW5ndWxhclZlbG9jaXR5WlwiKSAvLyBBbmd1bGFyIHZlbG9jaXR5IHotY29tcG9uZW50XG4gICAgICAuZmxvYXRsZShcIm1fYW5ndWxhckFjY2VsZXJhdGlvblhcIikgLy8gQW5ndWxhciB2ZWxvY2l0eSB4LWNvbXBvbmVudFxuICAgICAgLmZsb2F0bGUoXCJtX2FuZ3VsYXJBY2NlbGVyYXRpb25ZXCIpIC8vIEFuZ3VsYXIgdmVsb2NpdHkgeS1jb21wb25lbnRcbiAgICAgIC5mbG9hdGxlKFwibV9hbmd1bGFyQWNjZWxlcmF0aW9uWlwiKSAvLyBBbmd1bGFyIHZlbG9jaXR5IHotY29tcG9uZW50XG4gICAgICAuZmxvYXRsZShcIm1fZnJvbnRXaGVlbHNBbmdsZVwiKTsgLy8gQ3VycmVudCBmcm9udCB3aGVlbHMgYW5nbGUgaW4gcmFkaWFucztcblxuICAgIHRoaXMuZGF0YSA9IHRoaXMuZnJvbUJ1ZmZlcihidWZmZXIpO1xuICB9XG59XG4iXX0=