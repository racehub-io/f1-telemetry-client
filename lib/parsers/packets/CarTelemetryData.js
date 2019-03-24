import F1Parser from "../F1Parser";
import { Parser } from "binary-parser";
/*
struct CarTelemetryData
{
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
};
*/

export default class CarTelemetryData extends F1Parser {
  constructor() {
    super();
    this.uint16le("m_speed").uint8("m_throttle").int8("m_steer").uint8("m_brake").uint8("m_clutch").int8("m_gear").uint16le("m_engineRPM").uint8("m_drs").uint8("m_revLightsPercent").array("m_brakesTemperature", {
      length: 4,
      type: new Parser().uint16le("m_brakesTemperature")
    }).array("m_tyresSurfaceTemperature", {
      length: 4,
      type: new Parser().uint16le("m_tyresSurfaceTemperature")
    }).array("m_tyresInnerTemperature", {
      length: 4,
      type: new Parser().uint16le("m_tyresInnerTemperature")
    }).uint16le("m_engineTemperature").array("m_tyresPressure", {
      length: 4,
      type: new Parser().floatle("m_tyresPressure")
    });
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXJzL3BhY2tldHMvQ2FyVGVsZW1ldHJ5RGF0YS50cyJdLCJuYW1lcyI6WyJGMVBhcnNlciIsIlBhcnNlciIsIkNhclRlbGVtZXRyeURhdGEiLCJjb25zdHJ1Y3RvciIsInVpbnQxNmxlIiwidWludDgiLCJpbnQ4IiwiYXJyYXkiLCJsZW5ndGgiLCJ0eXBlIiwiZmxvYXRsZSJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsUUFBUCxNQUFxQixhQUFyQjtBQUNBLFNBQVNDLE1BQVQsUUFBdUIsZUFBdkI7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLGVBQWUsTUFBTUMsZ0JBQU4sU0FBK0JGLFFBQS9CLENBQXdDO0FBQ3JERyxFQUFBQSxXQUFXLEdBQUc7QUFDWjtBQUNBLFNBQUtDLFFBQUwsQ0FBYyxTQUFkLEVBQ0dDLEtBREgsQ0FDUyxZQURULEVBRUdDLElBRkgsQ0FFUSxTQUZSLEVBR0dELEtBSEgsQ0FHUyxTQUhULEVBSUdBLEtBSkgsQ0FJUyxVQUpULEVBS0dDLElBTEgsQ0FLUSxRQUxSLEVBTUdGLFFBTkgsQ0FNWSxhQU5aLEVBT0dDLEtBUEgsQ0FPUyxPQVBULEVBUUdBLEtBUkgsQ0FRUyxvQkFSVCxFQVNHRSxLQVRILENBU1MscUJBVFQsRUFTZ0M7QUFDNUJDLE1BQUFBLE1BQU0sRUFBRSxDQURvQjtBQUU1QkMsTUFBQUEsSUFBSSxFQUFFLElBQUlSLE1BQUosR0FBYUcsUUFBYixDQUFzQixxQkFBdEI7QUFGc0IsS0FUaEMsRUFhR0csS0FiSCxDQWFTLDJCQWJULEVBYXNDO0FBQ2xDQyxNQUFBQSxNQUFNLEVBQUUsQ0FEMEI7QUFFbENDLE1BQUFBLElBQUksRUFBRSxJQUFJUixNQUFKLEdBQWFHLFFBQWIsQ0FBc0IsMkJBQXRCO0FBRjRCLEtBYnRDLEVBaUJHRyxLQWpCSCxDQWlCUyx5QkFqQlQsRUFpQm9DO0FBQ2hDQyxNQUFBQSxNQUFNLEVBQUUsQ0FEd0I7QUFFaENDLE1BQUFBLElBQUksRUFBRSxJQUFJUixNQUFKLEdBQWFHLFFBQWIsQ0FBc0IseUJBQXRCO0FBRjBCLEtBakJwQyxFQXFCR0EsUUFyQkgsQ0FxQlkscUJBckJaLEVBc0JHRyxLQXRCSCxDQXNCUyxpQkF0QlQsRUFzQjRCO0FBQ3hCQyxNQUFBQSxNQUFNLEVBQUUsQ0FEZ0I7QUFFeEJDLE1BQUFBLElBQUksRUFBRSxJQUFJUixNQUFKLEdBQWFTLE9BQWIsQ0FBcUIsaUJBQXJCO0FBRmtCLEtBdEI1QjtBQTBCRDs7QUE3Qm9EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEYxUGFyc2VyIGZyb20gXCIuLi9GMVBhcnNlclwiO1xuaW1wb3J0IHsgUGFyc2VyIH0gZnJvbSBcImJpbmFyeS1wYXJzZXJcIjtcblxuLypcbnN0cnVjdCBDYXJUZWxlbWV0cnlEYXRhXG57XG4gIHVpbnQxNiAgICBtX3NwZWVkOyAgICAgICAgICAgICAgICAgICAgICAvLyBTcGVlZCBvZiBjYXIgaW4ga2lsb21ldHJlcyBwZXIgaG91clxuICB1aW50OCAgICAgbV90aHJvdHRsZTsgICAgICAgICAgICAgICAgICAgLy8gQW1vdW50IG9mIHRocm90dGxlIGFwcGxpZWQgKDAgdG8gMTAwKVxuICBpbnQ4ICAgICAgbV9zdGVlcjsgICAgICAgICAgICAgICAgICAgICAgLy8gU3RlZXJpbmcgKC0xMDAgKGZ1bGwgbG9jayBsZWZ0KSB0byAxMDAgKGZ1bGwgbG9jayByaWdodCkpXG4gIHVpbnQ4ICAgICBtX2JyYWtlOyAgICAgICAgICAgICAgICAgICAgICAvLyBBbW91bnQgb2YgYnJha2UgYXBwbGllZCAoMCB0byAxMDApXG4gIHVpbnQ4ICAgICBtX2NsdXRjaDsgICAgICAgICAgICAgICAgICAgICAvLyBBbW91bnQgb2YgY2x1dGNoIGFwcGxpZWQgKDAgdG8gMTAwKVxuICBpbnQ4ICAgICAgbV9nZWFyOyAgICAgICAgICAgICAgICAgICAgICAgLy8gR2VhciBzZWxlY3RlZCAoMS04LCBOPTAsIFI9LTEpXG4gIHVpbnQxNiAgICBtX2VuZ2luZVJQTTsgICAgICAgICAgICAgICAgICAvLyBFbmdpbmUgUlBNXG4gIHVpbnQ4ICAgICBtX2RyczsgICAgICAgICAgICAgICAgICAgICAgICAvLyAwID0gb2ZmLCAxID0gb25cbiAgdWludDggICAgIG1fcmV2TGlnaHRzUGVyY2VudDsgICAgICAgICAgIC8vIFJldiBsaWdodHMgaW5kaWNhdG9yIChwZXJjZW50YWdlKVxuICB1aW50MTYgICAgbV9icmFrZXNUZW1wZXJhdHVyZVs0XTsgICAgICAgLy8gQnJha2VzIHRlbXBlcmF0dXJlIChjZWxzaXVzKVxuICB1aW50MTYgICAgbV90eXJlc1N1cmZhY2VUZW1wZXJhdHVyZVs0XTsgLy8gVHlyZXMgc3VyZmFjZSB0ZW1wZXJhdHVyZSAoY2Vsc2l1cylcbiAgdWludDE2ICAgIG1fdHlyZXNJbm5lclRlbXBlcmF0dXJlWzRdOyAgIC8vIFR5cmVzIGlubmVyIHRlbXBlcmF0dXJlIChjZWxzaXVzKVxuICB1aW50MTYgICAgbV9lbmdpbmVUZW1wZXJhdHVyZTsgICAgICAgICAgLy8gRW5naW5lIHRlbXBlcmF0dXJlIChjZWxzaXVzKVxuXG4gIGZsb2F0ICAgICBtX3R5cmVzUHJlc3N1cmVbNF07ICAgICAgICAgICAvLyBUeXJlcyBwcmVzc3VyZSAoUFNJKVxufTtcbiovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhclRlbGVtZXRyeURhdGEgZXh0ZW5kcyBGMVBhcnNlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy51aW50MTZsZShcIm1fc3BlZWRcIilcbiAgICAgIC51aW50OChcIm1fdGhyb3R0bGVcIilcbiAgICAgIC5pbnQ4KFwibV9zdGVlclwiKVxuICAgICAgLnVpbnQ4KFwibV9icmFrZVwiKVxuICAgICAgLnVpbnQ4KFwibV9jbHV0Y2hcIilcbiAgICAgIC5pbnQ4KFwibV9nZWFyXCIpXG4gICAgICAudWludDE2bGUoXCJtX2VuZ2luZVJQTVwiKVxuICAgICAgLnVpbnQ4KFwibV9kcnNcIilcbiAgICAgIC51aW50OChcIm1fcmV2TGlnaHRzUGVyY2VudFwiKVxuICAgICAgLmFycmF5KFwibV9icmFrZXNUZW1wZXJhdHVyZVwiLCB7XG4gICAgICAgIGxlbmd0aDogNCxcbiAgICAgICAgdHlwZTogbmV3IFBhcnNlcigpLnVpbnQxNmxlKFwibV9icmFrZXNUZW1wZXJhdHVyZVwiKVxuICAgICAgfSlcbiAgICAgIC5hcnJheShcIm1fdHlyZXNTdXJmYWNlVGVtcGVyYXR1cmVcIiwge1xuICAgICAgICBsZW5ndGg6IDQsXG4gICAgICAgIHR5cGU6IG5ldyBQYXJzZXIoKS51aW50MTZsZShcIm1fdHlyZXNTdXJmYWNlVGVtcGVyYXR1cmVcIilcbiAgICAgIH0pXG4gICAgICAuYXJyYXkoXCJtX3R5cmVzSW5uZXJUZW1wZXJhdHVyZVwiLCB7XG4gICAgICAgIGxlbmd0aDogNCxcbiAgICAgICAgdHlwZTogbmV3IFBhcnNlcigpLnVpbnQxNmxlKFwibV90eXJlc0lubmVyVGVtcGVyYXR1cmVcIilcbiAgICAgIH0pXG4gICAgICAudWludDE2bGUoXCJtX2VuZ2luZVRlbXBlcmF0dXJlXCIpXG4gICAgICAuYXJyYXkoXCJtX3R5cmVzUHJlc3N1cmVcIiwge1xuICAgICAgICBsZW5ndGg6IDQsXG4gICAgICAgIHR5cGU6IG5ldyBQYXJzZXIoKS5mbG9hdGxlKFwibV90eXJlc1ByZXNzdXJlXCIpXG4gICAgICB9KTtcbiAgfVxufVxuIl19