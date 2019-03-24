import F1Parser from "../F1Parser";
/*
struct CarSetupData
{
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
};
*/

export default class CarSetupData extends F1Parser {
  constructor() {
    super();
    this.uint8("m_frontWing").uint8("m_rearWing").uint8("m_onThrottle").uint8("m_offThrottle").floatle("m_frontCamber").floatle("m_rearCamber").floatle("m_frontToe").floatle("m_rearToe").uint8("m_frontSuspension").uint8("m_rearSuspension").uint8("m_frontAntiRollBar").uint8("m_rearAntiRollBar").uint8("m_frontSuspensionHeight").uint8("m_rearSuspensionHeight").uint8("m_brakePressure").uint8("m_brakeBias").floatle("m_frontTyrePressure").floatle("m_rearTyrePressure").uint8("m_ballast").floatle("m_fuelLoad");
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXJzL3BhY2tldHMvQ2FyU2V0dXBEYXRhLnRzIl0sIm5hbWVzIjpbIkYxUGFyc2VyIiwiQ2FyU2V0dXBEYXRhIiwiY29uc3RydWN0b3IiLCJ1aW50OCIsImZsb2F0bGUiXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLFFBQVAsTUFBcUIsYUFBckI7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsZUFBZSxNQUFNQyxZQUFOLFNBQTJCRCxRQUEzQixDQUFvQztBQUNqREUsRUFBQUEsV0FBVyxHQUFHO0FBQ1o7QUFDQSxTQUFLQyxLQUFMLENBQVcsYUFBWCxFQUNHQSxLQURILENBQ1MsWUFEVCxFQUVHQSxLQUZILENBRVMsY0FGVCxFQUdHQSxLQUhILENBR1MsZUFIVCxFQUlHQyxPQUpILENBSVcsZUFKWCxFQUtHQSxPQUxILENBS1csY0FMWCxFQU1HQSxPQU5ILENBTVcsWUFOWCxFQU9HQSxPQVBILENBT1csV0FQWCxFQVFHRCxLQVJILENBUVMsbUJBUlQsRUFTR0EsS0FUSCxDQVNTLGtCQVRULEVBVUdBLEtBVkgsQ0FVUyxvQkFWVCxFQVdHQSxLQVhILENBV1MsbUJBWFQsRUFZR0EsS0FaSCxDQVlTLHlCQVpULEVBYUdBLEtBYkgsQ0FhUyx3QkFiVCxFQWNHQSxLQWRILENBY1MsaUJBZFQsRUFlR0EsS0FmSCxDQWVTLGFBZlQsRUFnQkdDLE9BaEJILENBZ0JXLHFCQWhCWCxFQWlCR0EsT0FqQkgsQ0FpQlcsb0JBakJYLEVBa0JHRCxLQWxCSCxDQWtCUyxXQWxCVCxFQW1CR0MsT0FuQkgsQ0FtQlcsWUFuQlg7QUFvQkQ7O0FBdkJnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGMVBhcnNlciBmcm9tIFwiLi4vRjFQYXJzZXJcIjtcblxuLypcbnN0cnVjdCBDYXJTZXR1cERhdGFcbntcbiAgdWludDggICAgIG1fZnJvbnRXaW5nOyAgICAgICAgICAgICAgICAvLyBGcm9udCB3aW5nIGFlcm9cbiAgdWludDggICAgIG1fcmVhcldpbmc7ICAgICAgICAgICAgICAgICAvLyBSZWFyIHdpbmcgYWVyb1xuICB1aW50OCAgICAgbV9vblRocm90dGxlOyAgICAgICAgICAgICAgIC8vIERpZmZlcmVudGlhbCBhZGp1c3RtZW50IG9uIHRocm90dGxlIChwZXJjZW50YWdlKVxuICB1aW50OCAgICAgbV9vZmZUaHJvdHRsZTsgICAgICAgICAgICAgIC8vIERpZmZlcmVudGlhbCBhZGp1c3RtZW50IG9mZiB0aHJvdHRsZSAocGVyY2VudGFnZSlcbiAgZmxvYXQgICAgIG1fZnJvbnRDYW1iZXI7ICAgICAgICAgICAgICAvLyBGcm9udCBjYW1iZXIgYW5nbGUgKHN1c3BlbnNpb24gZ2VvbWV0cnkpXG4gIGZsb2F0ICAgICBtX3JlYXJDYW1iZXI7ICAgICAgICAgICAgICAgLy8gUmVhciBjYW1iZXIgYW5nbGUgKHN1c3BlbnNpb24gZ2VvbWV0cnkpXG4gIGZsb2F0ICAgICBtX2Zyb250VG9lOyAgICAgICAgICAgICAgICAgLy8gRnJvbnQgdG9lIGFuZ2xlIChzdXNwZW5zaW9uIGdlb21ldHJ5KVxuICBmbG9hdCAgICAgbV9yZWFyVG9lOyAgICAgICAgICAgICAgICAgIC8vIFJlYXIgdG9lIGFuZ2xlIChzdXNwZW5zaW9uIGdlb21ldHJ5KVxuICB1aW50OCAgICAgbV9mcm9udFN1c3BlbnNpb247ICAgICAgICAgIC8vIEZyb250IHN1c3BlbnNpb25cbiAgdWludDggICAgIG1fcmVhclN1c3BlbnNpb247ICAgICAgICAgICAvLyBSZWFyIHN1c3BlbnNpb25cbiAgdWludDggICAgIG1fZnJvbnRBbnRpUm9sbEJhcjsgICAgICAgICAvLyBGcm9udCBhbnRpLXJvbGwgYmFyXG4gIHVpbnQ4ICAgICBtX3JlYXJBbnRpUm9sbEJhcjsgICAgICAgICAgLy8gRnJvbnQgYW50aS1yb2xsIGJhclxuICB1aW50OCAgICAgbV9mcm9udFN1c3BlbnNpb25IZWlnaHQ7ICAgIC8vIEZyb250IHJpZGUgaGVpZ2h0XG4gIHVpbnQ4ICAgICBtX3JlYXJTdXNwZW5zaW9uSGVpZ2h0OyAgICAgLy8gUmVhciByaWRlIGhlaWdodFxuICB1aW50OCAgICAgbV9icmFrZVByZXNzdXJlOyAgICAgICAgICAgIC8vIEJyYWtlIHByZXNzdXJlIChwZXJjZW50YWdlKVxuICB1aW50OCAgICAgbV9icmFrZUJpYXM7ICAgICAgICAgICAgICAgIC8vIEJyYWtlIGJpYXMgKHBlcmNlbnRhZ2UpXG4gIGZsb2F0ICAgICBtX2Zyb250VHlyZVByZXNzdXJlOyAgICAgICAgLy8gRnJvbnQgdHlyZSBwcmVzc3VyZSAoUFNJKVxuICBmbG9hdCAgICAgbV9yZWFyVHlyZVByZXNzdXJlOyAgICAgICAgIC8vIFJlYXIgdHlyZSBwcmVzc3VyZSAoUFNJKVxuICB1aW50OCAgICAgbV9iYWxsYXN0OyAgICAgICAgICAgICAgICAgIC8vIEJhbGxhc3RcbiAgZmxvYXQgICAgIG1fZnVlbExvYWQ7ICAgICAgICAgICAgICAgICAvLyBGdWVsIGxvYWRcbn07XG4qL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJTZXR1cERhdGEgZXh0ZW5kcyBGMVBhcnNlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy51aW50OChcIm1fZnJvbnRXaW5nXCIpXG4gICAgICAudWludDgoXCJtX3JlYXJXaW5nXCIpXG4gICAgICAudWludDgoXCJtX29uVGhyb3R0bGVcIilcbiAgICAgIC51aW50OChcIm1fb2ZmVGhyb3R0bGVcIilcbiAgICAgIC5mbG9hdGxlKFwibV9mcm9udENhbWJlclwiKVxuICAgICAgLmZsb2F0bGUoXCJtX3JlYXJDYW1iZXJcIilcbiAgICAgIC5mbG9hdGxlKFwibV9mcm9udFRvZVwiKVxuICAgICAgLmZsb2F0bGUoXCJtX3JlYXJUb2VcIilcbiAgICAgIC51aW50OChcIm1fZnJvbnRTdXNwZW5zaW9uXCIpXG4gICAgICAudWludDgoXCJtX3JlYXJTdXNwZW5zaW9uXCIpXG4gICAgICAudWludDgoXCJtX2Zyb250QW50aVJvbGxCYXJcIilcbiAgICAgIC51aW50OChcIm1fcmVhckFudGlSb2xsQmFyXCIpXG4gICAgICAudWludDgoXCJtX2Zyb250U3VzcGVuc2lvbkhlaWdodFwiKVxuICAgICAgLnVpbnQ4KFwibV9yZWFyU3VzcGVuc2lvbkhlaWdodFwiKVxuICAgICAgLnVpbnQ4KFwibV9icmFrZVByZXNzdXJlXCIpXG4gICAgICAudWludDgoXCJtX2JyYWtlQmlhc1wiKVxuICAgICAgLmZsb2F0bGUoXCJtX2Zyb250VHlyZVByZXNzdXJlXCIpXG4gICAgICAuZmxvYXRsZShcIm1fcmVhclR5cmVQcmVzc3VyZVwiKVxuICAgICAgLnVpbnQ4KFwibV9iYWxsYXN0XCIpXG4gICAgICAuZmxvYXRsZShcIm1fZnVlbExvYWRcIik7XG4gIH1cbn1cbiJdfQ==