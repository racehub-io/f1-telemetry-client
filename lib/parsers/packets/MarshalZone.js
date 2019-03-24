import F1Parser from '../F1Parser';
/**
 *  struct MarshalZone
 *  {
 *    float  m_zoneStart;   // Fraction (0..1) of way through the lap the marshal zone starts
 *    int8   m_zoneFlag;    // -1 = invalid/unknown
 *                          // 0 = none
 *                          // 1 = green
 *                          // 2 = blue
 *                          // 3 = yellow
 *                          // 4 = red
 *  };
 */

export default class MarshalZone extends F1Parser {
  constructor() {
    super();
    this.endianess('little').floatle('m_zoneStart').int8('m_zoneFlag');
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXJzL3BhY2tldHMvTWFyc2hhbFpvbmUudHMiXSwibmFtZXMiOlsiRjFQYXJzZXIiLCJNYXJzaGFsWm9uZSIsImNvbnN0cnVjdG9yIiwiZW5kaWFuZXNzIiwiZmxvYXRsZSIsImludDgiXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLFFBQVAsTUFBcUIsYUFBckI7QUFFQTs7Ozs7Ozs7Ozs7OztBQVlBLGVBQWUsTUFBTUMsV0FBTixTQUEwQkQsUUFBMUIsQ0FBbUM7QUFDaERFLEVBQUFBLFdBQVcsR0FBRztBQUNaO0FBQ0EsU0FBS0MsU0FBTCxDQUFlLFFBQWYsRUFDR0MsT0FESCxDQUNXLGFBRFgsRUFFR0MsSUFGSCxDQUVRLFlBRlI7QUFHRDs7QUFOK0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRjFQYXJzZXIgZnJvbSAnLi4vRjFQYXJzZXInO1xuXG4vKipcbiAqICBzdHJ1Y3QgTWFyc2hhbFpvbmVcbiAqICB7XG4gKiAgICBmbG9hdCAgbV96b25lU3RhcnQ7ICAgLy8gRnJhY3Rpb24gKDAuLjEpIG9mIHdheSB0aHJvdWdoIHRoZSBsYXAgdGhlIG1hcnNoYWwgem9uZSBzdGFydHNcbiAqICAgIGludDggICBtX3pvbmVGbGFnOyAgICAvLyAtMSA9IGludmFsaWQvdW5rbm93blxuICogICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDAgPSBub25lXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMSA9IGdyZWVuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMiA9IGJsdWVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAzID0geWVsbG93XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gNCA9IHJlZFxuICogIH07XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcnNoYWxab25lIGV4dGVuZHMgRjFQYXJzZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZW5kaWFuZXNzKCdsaXR0bGUnKVxuICAgICAgLmZsb2F0bGUoJ21fem9uZVN0YXJ0JylcbiAgICAgIC5pbnQ4KCdtX3pvbmVGbGFnJyk7XG4gIH1cbn0iXX0=