import F1Parser from "../F1Parser";
import { Parser } from "binary-parser";
/*
struct CarStatusData
{
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
};
*/

export default class CarSetupData extends F1Parser {
  constructor() {
    super();
    this.uint8("m_tractionControl").uint8("m_antiLockBrakes").uint8("m_fuelMix").uint8("m_frontBrakeBias").uint8("m_pitLimiterStatus").floatle("m_fuelInTank").floatle("m_fuelCapacity").uint16le("m_maxRPM").uint16le("m_idleRPM").uint8("m_maxGears").uint8("m_drsAllowed").array("m_tyresWear", {
      length: 4,
      type: new Parser().uint8("m_tyresWear")
    }).uint8("m_tyreCompound").array("m_tyresDamage", {
      length: 4,
      type: new Parser().uint8("m_tyresDamage")
    }).uint8("m_frontLeftWingDamage").uint8("m_frontRightWingDamage").uint8("m_rearWingDamage").uint8("m_engineDamage").uint8("m_gearBoxDamage").uint8("m_exhaustDamage").int8("m_vehicleFiaFlags").floatle("m_ersStoreEnergy").uint8("m_ersDeployMode").floatle("m_ersHarvestedThisLapMGUK").floatle("m_ersHarvestedThisLapMGUH").floatle("m_ersDeployedThisLap");
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXJzL3BhY2tldHMvQ2FyU3RhdHVzRGF0YS50cyJdLCJuYW1lcyI6WyJGMVBhcnNlciIsIlBhcnNlciIsIkNhclNldHVwRGF0YSIsImNvbnN0cnVjdG9yIiwidWludDgiLCJmbG9hdGxlIiwidWludDE2bGUiLCJhcnJheSIsImxlbmd0aCIsInR5cGUiLCJpbnQ4Il0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxRQUFQLE1BQXFCLGFBQXJCO0FBQ0EsU0FBU0MsTUFBVCxRQUF1QixlQUF2QjtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNDQSxlQUFlLE1BQU1DLFlBQU4sU0FBMkJGLFFBQTNCLENBQW9DO0FBQ2pERyxFQUFBQSxXQUFXLEdBQUc7QUFDWjtBQUNBLFNBQUtDLEtBQUwsQ0FBVyxtQkFBWCxFQUNHQSxLQURILENBQ1Msa0JBRFQsRUFFR0EsS0FGSCxDQUVTLFdBRlQsRUFHR0EsS0FISCxDQUdTLGtCQUhULEVBSUdBLEtBSkgsQ0FJUyxvQkFKVCxFQUtHQyxPQUxILENBS1csY0FMWCxFQU1HQSxPQU5ILENBTVcsZ0JBTlgsRUFPR0MsUUFQSCxDQU9ZLFVBUFosRUFRR0EsUUFSSCxDQVFZLFdBUlosRUFTR0YsS0FUSCxDQVNTLFlBVFQsRUFVR0EsS0FWSCxDQVVTLGNBVlQsRUFXR0csS0FYSCxDQVdTLGFBWFQsRUFXd0I7QUFDcEJDLE1BQUFBLE1BQU0sRUFBRSxDQURZO0FBRXBCQyxNQUFBQSxJQUFJLEVBQUUsSUFBSVIsTUFBSixHQUFhRyxLQUFiLENBQW1CLGFBQW5CO0FBRmMsS0FYeEIsRUFlR0EsS0FmSCxDQWVTLGdCQWZULEVBZ0JHRyxLQWhCSCxDQWdCUyxlQWhCVCxFQWdCMEI7QUFDdEJDLE1BQUFBLE1BQU0sRUFBRSxDQURjO0FBRXRCQyxNQUFBQSxJQUFJLEVBQUUsSUFBSVIsTUFBSixHQUFhRyxLQUFiLENBQW1CLGVBQW5CO0FBRmdCLEtBaEIxQixFQW9CR0EsS0FwQkgsQ0FvQlMsdUJBcEJULEVBcUJHQSxLQXJCSCxDQXFCUyx3QkFyQlQsRUFzQkdBLEtBdEJILENBc0JTLGtCQXRCVCxFQXVCR0EsS0F2QkgsQ0F1QlMsZ0JBdkJULEVBd0JHQSxLQXhCSCxDQXdCUyxpQkF4QlQsRUF5QkdBLEtBekJILENBeUJTLGlCQXpCVCxFQTBCR00sSUExQkgsQ0EwQlEsbUJBMUJSLEVBMkJHTCxPQTNCSCxDQTJCVyxrQkEzQlgsRUE0QkdELEtBNUJILENBNEJTLGlCQTVCVCxFQTZCR0MsT0E3QkgsQ0E2QlcsMkJBN0JYLEVBOEJHQSxPQTlCSCxDQThCVywyQkE5QlgsRUErQkdBLE9BL0JILENBK0JXLHNCQS9CWDtBQWdDRDs7QUFuQ2dEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEYxUGFyc2VyIGZyb20gXCIuLi9GMVBhcnNlclwiO1xuaW1wb3J0IHsgUGFyc2VyIH0gZnJvbSBcImJpbmFyeS1wYXJzZXJcIjtcblxuLypcbnN0cnVjdCBDYXJTdGF0dXNEYXRhXG57XG4gICAgdWludDggICAgICAgbV90cmFjdGlvbkNvbnRyb2w7ICAgICAgICAgIC8vIDAgKG9mZikgLSAyIChoaWdoKVxuICAgIHVpbnQ4ICAgICAgIG1fYW50aUxvY2tCcmFrZXM7ICAgICAgICAgICAvLyAwIChvZmYpIC0gMSAob24pXG4gICAgdWludDggICAgICAgbV9mdWVsTWl4OyAgICAgICAgICAgICAgICAgIC8vIEZ1ZWwgbWl4IC0gMCA9IGxlYW4sIDEgPSBzdGFuZGFyZCwgMiA9IHJpY2gsIDMgPSBtYXhcbiAgICB1aW50OCAgICAgICBtX2Zyb250QnJha2VCaWFzOyAgICAgICAgICAgLy8gRnJvbnQgYnJha2UgYmlhcyAocGVyY2VudGFnZSlcbiAgICB1aW50OCAgICAgICBtX3BpdExpbWl0ZXJTdGF0dXM7ICAgICAgICAgLy8gUGl0IGxpbWl0ZXIgc3RhdHVzIC0gMCA9IG9mZiwgMSA9IG9uXG4gICAgZmxvYXQgICAgICAgbV9mdWVsSW5UYW5rOyAgICAgICAgICAgICAgIC8vIEN1cnJlbnQgZnVlbCBtYXNzXG4gICAgZmxvYXQgICAgICAgbV9mdWVsQ2FwYWNpdHk7ICAgICAgICAgICAgIC8vIEZ1ZWwgY2FwYWNpdHlcbiAgICB1aW50MTYgICAgICBtX21heFJQTTsgICAgICAgICAgICAgICAgICAgLy8gQ2FycyBtYXggUlBNLCBwb2ludCBvZiByZXYgbGltaXRlclxuICAgIHVpbnQxNiAgICAgIG1faWRsZVJQTTsgICAgICAgICAgICAgICAgICAvLyBDYXJzIGlkbGUgUlBNXG4gICAgdWludDggICAgICAgbV9tYXhHZWFyczsgICAgICAgICAgICAgICAgIC8vIE1heGltdW0gbnVtYmVyIG9mIGdlYXJzXG4gICAgdWludDggICAgICAgbV9kcnNBbGxvd2VkOyAgICAgICAgICAgICAgIC8vIDAgPSBub3QgYWxsb3dlZCwgMSA9IGFsbG93ZWQsIC0xID0gdW5rbm93blxuICAgIHVpbnQ4ICAgICAgIG1fdHlyZXNXZWFyWzRdOyAgICAgICAgICAgICAvLyBUeXJlIHdlYXIgcGVyY2VudGFnZVxuICAgIHVpbnQ4ICAgICAgIG1fdHlyZUNvbXBvdW5kOyAgICAgICAgICAgICAvLyBNb2Rlcm4gLSAwID0gaHlwZXIgc29mdCwgMSA9IHVsdHJhIHNvZnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMiA9IHN1cGVyIHNvZnQsIDMgPSBzb2Z0LCA0ID0gbWVkaXVtLCA1ID0gaGFyZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA2ID0gc3VwZXIgaGFyZCwgNyA9IGludGVyLCA4ID0gd2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENsYXNzaWMgLSAwLTYgPSBkcnksIDctOCA9IHdldFxuICAgIHVpbnQ4ICAgICAgIG1fdHlyZXNEYW1hZ2VbNF07ICAgICAgICAgICAvLyBUeXJlIGRhbWFnZSAocGVyY2VudGFnZSlcbiAgICB1aW50OCAgICAgICBtX2Zyb250TGVmdFdpbmdEYW1hZ2U7ICAgICAgLy8gRnJvbnQgbGVmdCB3aW5nIGRhbWFnZSAocGVyY2VudGFnZSlcbiAgICB1aW50OCAgICAgICBtX2Zyb250UmlnaHRXaW5nRGFtYWdlOyAgICAgLy8gRnJvbnQgcmlnaHQgd2luZyBkYW1hZ2UgKHBlcmNlbnRhZ2UpXG5cbiAgICB1aW50OCAgICAgICBtX3JlYXJXaW5nRGFtYWdlOyAgICAgICAgICAgLy8gUmVhciB3aW5nIGRhbWFnZSAocGVyY2VudGFnZSlcbiAgICB1aW50OCAgICAgICBtX2VuZ2luZURhbWFnZTsgICAgICAgICAgICAgLy8gRW5naW5lIGRhbWFnZSAocGVyY2VudGFnZSlcbiAgICB1aW50OCAgICAgICBtX2dlYXJCb3hEYW1hZ2U7ICAgICAgICAgICAgLy8gR2VhciBib3ggZGFtYWdlIChwZXJjZW50YWdlKVxuICAgIHVpbnQ4ICAgICAgIG1fZXhoYXVzdERhbWFnZTsgICAgICAgICAgICAvLyBFeGhhdXN0IGRhbWFnZSAocGVyY2VudGFnZSlcbiAgICBpbnQ4ICAgICAgICBtX3ZlaGljbGVGaWFGbGFnczsgICAgICAgICAgLy8gLTEgPSBpbnZhbGlkL3Vua25vd24sIDAgPSBub25lLCAxID0gZ3JlZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMiA9IGJsdWUsIDMgPSB5ZWxsb3csIDQgPSByZWRcbiAgICBmbG9hdCAgICAgICBtX2Vyc1N0b3JlRW5lcmd5OyAgICAgICAgICAgLy8gRVJTIGVuZXJneSBzdG9yZSBpbiBKb3VsZXNcbiAgICB1aW50OCAgICAgICBtX2Vyc0RlcGxveU1vZGU7ICAgICAgICAgICAgLy8gRVJTIGRlcGxveW1lbnQgbW9kZSwgMCA9IG5vbmUsIDEgPSBsb3csIDIgPSBtZWRpdW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMyA9IGhpZ2gsIDQgPSBvdmVydGFrZSwgNSA9IGhvdGxhcFxuICAgIGZsb2F0ICAgICAgIG1fZXJzSGFydmVzdGVkVGhpc0xhcE1HVUs7ICAvLyBFUlMgZW5lcmd5IGhhcnZlc3RlZCB0aGlzIGxhcCBieSBNR1UtS1xuICAgIGZsb2F0ICAgICAgIG1fZXJzSGFydmVzdGVkVGhpc0xhcE1HVUg7ICAvLyBFUlMgZW5lcmd5IGhhcnZlc3RlZCB0aGlzIGxhcCBieSBNR1UtSFxuICAgIGZsb2F0ICAgICAgIG1fZXJzRGVwbG95ZWRUaGlzTGFwOyAgICAgICAvLyBFUlMgZW5lcmd5IGRlcGxveWVkIHRoaXMgbGFwXG59O1xuKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyU2V0dXBEYXRhIGV4dGVuZHMgRjFQYXJzZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudWludDgoXCJtX3RyYWN0aW9uQ29udHJvbFwiKVxuICAgICAgLnVpbnQ4KFwibV9hbnRpTG9ja0JyYWtlc1wiKVxuICAgICAgLnVpbnQ4KFwibV9mdWVsTWl4XCIpXG4gICAgICAudWludDgoXCJtX2Zyb250QnJha2VCaWFzXCIpXG4gICAgICAudWludDgoXCJtX3BpdExpbWl0ZXJTdGF0dXNcIilcbiAgICAgIC5mbG9hdGxlKFwibV9mdWVsSW5UYW5rXCIpXG4gICAgICAuZmxvYXRsZShcIm1fZnVlbENhcGFjaXR5XCIpXG4gICAgICAudWludDE2bGUoXCJtX21heFJQTVwiKVxuICAgICAgLnVpbnQxNmxlKFwibV9pZGxlUlBNXCIpXG4gICAgICAudWludDgoXCJtX21heEdlYXJzXCIpXG4gICAgICAudWludDgoXCJtX2Ryc0FsbG93ZWRcIilcbiAgICAgIC5hcnJheShcIm1fdHlyZXNXZWFyXCIsIHtcbiAgICAgICAgbGVuZ3RoOiA0LFxuICAgICAgICB0eXBlOiBuZXcgUGFyc2VyKCkudWludDgoXCJtX3R5cmVzV2VhclwiKVxuICAgICAgfSlcbiAgICAgIC51aW50OChcIm1fdHlyZUNvbXBvdW5kXCIpXG4gICAgICAuYXJyYXkoXCJtX3R5cmVzRGFtYWdlXCIsIHtcbiAgICAgICAgbGVuZ3RoOiA0LFxuICAgICAgICB0eXBlOiBuZXcgUGFyc2VyKCkudWludDgoXCJtX3R5cmVzRGFtYWdlXCIpXG4gICAgICB9KVxuICAgICAgLnVpbnQ4KFwibV9mcm9udExlZnRXaW5nRGFtYWdlXCIpXG4gICAgICAudWludDgoXCJtX2Zyb250UmlnaHRXaW5nRGFtYWdlXCIpXG4gICAgICAudWludDgoXCJtX3JlYXJXaW5nRGFtYWdlXCIpXG4gICAgICAudWludDgoXCJtX2VuZ2luZURhbWFnZVwiKVxuICAgICAgLnVpbnQ4KFwibV9nZWFyQm94RGFtYWdlXCIpXG4gICAgICAudWludDgoXCJtX2V4aGF1c3REYW1hZ2VcIilcbiAgICAgIC5pbnQ4KFwibV92ZWhpY2xlRmlhRmxhZ3NcIilcbiAgICAgIC5mbG9hdGxlKFwibV9lcnNTdG9yZUVuZXJneVwiKVxuICAgICAgLnVpbnQ4KFwibV9lcnNEZXBsb3lNb2RlXCIpXG4gICAgICAuZmxvYXRsZShcIm1fZXJzSGFydmVzdGVkVGhpc0xhcE1HVUtcIilcbiAgICAgIC5mbG9hdGxlKFwibV9lcnNIYXJ2ZXN0ZWRUaGlzTGFwTUdVSFwiKVxuICAgICAgLmZsb2F0bGUoXCJtX2Vyc0RlcGxveWVkVGhpc0xhcFwiKTtcbiAgfVxufVxuIl19