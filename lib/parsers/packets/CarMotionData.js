import F1Parser from '../F1Parser';
/**
 * struct CarMotionData
 * {
 *   float         m_worldPositionX;           // World space X position
 *   float         m_worldPositionY;           // World space Y position
 *   float         m_worldPositionZ;           // World space Z position
 *   float         m_worldVelocityX;           // Velocity in world space X
 *   float         m_worldVelocityY;           // Velocity in world space Y
 *   float         m_worldVelocityZ;           // Velocity in world space Z
 *   int16         m_worldForwardDirX;         // World space forward X direction (normalised)
 *   int16         m_worldForwardDirY;         // World space forward Y direction (normalised)
 *   int16         m_worldForwardDirZ;         // World space forward Z direction (normalised)
 *   int16         m_worldRightDirX;           // World space right X direction (normalised)
 *   int16         m_worldRightDirY;           // World space right Y direction (normalised)
 *   int16         m_worldRightDirZ;           // World space right Z direction (normalised)
 *   float         m_gForceLateral;            // Lateral G-Force component
 *   float         m_gForceLongitudinal;       // Longitudinal G-Force component
 *   float         m_gForceVertical;           // Vertical G-Force component
 *   float         m_yaw;                      // Yaw angle in radians
 *   float         m_pitch;                    // Pitch angle in radians
 *   float         m_roll;                     // Roll angle in radians
 * };
 */

export default class CarMotionData extends F1Parser {
  constructor() {
    super();
    this.floatle('m_worldPositionX').floatle('m_worldPositionY').floatle('m_worldPositionZ').floatle('m_worldVelocityX').floatle('m_worldVelocityY').floatle('m_worldVelocityZ').uint16('m_worldForwardDirX').uint16('m_worldForwardDirY').uint16('m_worldForwardDirZ').uint16('m_worldRightDirX').uint16('m_worldRightDirY').uint16('m_worldRightDirZ').floatle('m_gForceLateral').floatle('m_gForceLongitudinal').floatle('m_gForceVertical').floatle('m_yaw').floatle('m_pitch').floatle('m_roll');
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXJzL3BhY2tldHMvQ2FyTW90aW9uRGF0YS50cyJdLCJuYW1lcyI6WyJGMVBhcnNlciIsIkNhck1vdGlvbkRhdGEiLCJjb25zdHJ1Y3RvciIsImZsb2F0bGUiLCJ1aW50MTYiXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLFFBQVAsTUFBcUIsYUFBckI7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLGVBQWUsTUFBTUMsYUFBTixTQUE0QkQsUUFBNUIsQ0FBcUM7QUFDbERFLEVBQUFBLFdBQVcsR0FBRztBQUNaO0FBQ0EsU0FBS0MsT0FBTCxDQUFhLGtCQUFiLEVBQ0dBLE9BREgsQ0FDVyxrQkFEWCxFQUVHQSxPQUZILENBRVcsa0JBRlgsRUFHR0EsT0FISCxDQUdXLGtCQUhYLEVBSUdBLE9BSkgsQ0FJVyxrQkFKWCxFQUtHQSxPQUxILENBS1csa0JBTFgsRUFNR0MsTUFOSCxDQU1VLG9CQU5WLEVBT0dBLE1BUEgsQ0FPVSxvQkFQVixFQVFHQSxNQVJILENBUVUsb0JBUlYsRUFTR0EsTUFUSCxDQVNVLGtCQVRWLEVBVUdBLE1BVkgsQ0FVVSxrQkFWVixFQVdHQSxNQVhILENBV1Usa0JBWFYsRUFZR0QsT0FaSCxDQVlXLGlCQVpYLEVBYUdBLE9BYkgsQ0FhVyxzQkFiWCxFQWNHQSxPQWRILENBY1csa0JBZFgsRUFlR0EsT0FmSCxDQWVXLE9BZlgsRUFnQkdBLE9BaEJILENBZ0JXLFNBaEJYLEVBaUJHQSxPQWpCSCxDQWlCVyxRQWpCWDtBQWtCRDs7QUFyQmlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEYxUGFyc2VyIGZyb20gJy4uL0YxUGFyc2VyJztcblxuLyoqXG4gKiBzdHJ1Y3QgQ2FyTW90aW9uRGF0YVxuICoge1xuICogICBmbG9hdCAgICAgICAgIG1fd29ybGRQb3NpdGlvblg7ICAgICAgICAgICAvLyBXb3JsZCBzcGFjZSBYIHBvc2l0aW9uXG4gKiAgIGZsb2F0ICAgICAgICAgbV93b3JsZFBvc2l0aW9uWTsgICAgICAgICAgIC8vIFdvcmxkIHNwYWNlIFkgcG9zaXRpb25cbiAqICAgZmxvYXQgICAgICAgICBtX3dvcmxkUG9zaXRpb25aOyAgICAgICAgICAgLy8gV29ybGQgc3BhY2UgWiBwb3NpdGlvblxuICogICBmbG9hdCAgICAgICAgIG1fd29ybGRWZWxvY2l0eVg7ICAgICAgICAgICAvLyBWZWxvY2l0eSBpbiB3b3JsZCBzcGFjZSBYXG4gKiAgIGZsb2F0ICAgICAgICAgbV93b3JsZFZlbG9jaXR5WTsgICAgICAgICAgIC8vIFZlbG9jaXR5IGluIHdvcmxkIHNwYWNlIFlcbiAqICAgZmxvYXQgICAgICAgICBtX3dvcmxkVmVsb2NpdHlaOyAgICAgICAgICAgLy8gVmVsb2NpdHkgaW4gd29ybGQgc3BhY2UgWlxuICogICBpbnQxNiAgICAgICAgIG1fd29ybGRGb3J3YXJkRGlyWDsgICAgICAgICAvLyBXb3JsZCBzcGFjZSBmb3J3YXJkIFggZGlyZWN0aW9uIChub3JtYWxpc2VkKVxuICogICBpbnQxNiAgICAgICAgIG1fd29ybGRGb3J3YXJkRGlyWTsgICAgICAgICAvLyBXb3JsZCBzcGFjZSBmb3J3YXJkIFkgZGlyZWN0aW9uIChub3JtYWxpc2VkKVxuICogICBpbnQxNiAgICAgICAgIG1fd29ybGRGb3J3YXJkRGlyWjsgICAgICAgICAvLyBXb3JsZCBzcGFjZSBmb3J3YXJkIFogZGlyZWN0aW9uIChub3JtYWxpc2VkKVxuICogICBpbnQxNiAgICAgICAgIG1fd29ybGRSaWdodERpclg7ICAgICAgICAgICAvLyBXb3JsZCBzcGFjZSByaWdodCBYIGRpcmVjdGlvbiAobm9ybWFsaXNlZClcbiAqICAgaW50MTYgICAgICAgICBtX3dvcmxkUmlnaHREaXJZOyAgICAgICAgICAgLy8gV29ybGQgc3BhY2UgcmlnaHQgWSBkaXJlY3Rpb24gKG5vcm1hbGlzZWQpXG4gKiAgIGludDE2ICAgICAgICAgbV93b3JsZFJpZ2h0RGlyWjsgICAgICAgICAgIC8vIFdvcmxkIHNwYWNlIHJpZ2h0IFogZGlyZWN0aW9uIChub3JtYWxpc2VkKVxuICogICBmbG9hdCAgICAgICAgIG1fZ0ZvcmNlTGF0ZXJhbDsgICAgICAgICAgICAvLyBMYXRlcmFsIEctRm9yY2UgY29tcG9uZW50XG4gKiAgIGZsb2F0ICAgICAgICAgbV9nRm9yY2VMb25naXR1ZGluYWw7ICAgICAgIC8vIExvbmdpdHVkaW5hbCBHLUZvcmNlIGNvbXBvbmVudFxuICogICBmbG9hdCAgICAgICAgIG1fZ0ZvcmNlVmVydGljYWw7ICAgICAgICAgICAvLyBWZXJ0aWNhbCBHLUZvcmNlIGNvbXBvbmVudFxuICogICBmbG9hdCAgICAgICAgIG1feWF3OyAgICAgICAgICAgICAgICAgICAgICAvLyBZYXcgYW5nbGUgaW4gcmFkaWFuc1xuICogICBmbG9hdCAgICAgICAgIG1fcGl0Y2g7ICAgICAgICAgICAgICAgICAgICAvLyBQaXRjaCBhbmdsZSBpbiByYWRpYW5zXG4gKiAgIGZsb2F0ICAgICAgICAgbV9yb2xsOyAgICAgICAgICAgICAgICAgICAgIC8vIFJvbGwgYW5nbGUgaW4gcmFkaWFuc1xuICogfTtcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyTW90aW9uRGF0YSBleHRlbmRzIEYxUGFyc2VyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmZsb2F0bGUoJ21fd29ybGRQb3NpdGlvblgnKVxuICAgICAgLmZsb2F0bGUoJ21fd29ybGRQb3NpdGlvblknKVxuICAgICAgLmZsb2F0bGUoJ21fd29ybGRQb3NpdGlvblonKVxuICAgICAgLmZsb2F0bGUoJ21fd29ybGRWZWxvY2l0eVgnKVxuICAgICAgLmZsb2F0bGUoJ21fd29ybGRWZWxvY2l0eVknKVxuICAgICAgLmZsb2F0bGUoJ21fd29ybGRWZWxvY2l0eVonKVxuICAgICAgLnVpbnQxNignbV93b3JsZEZvcndhcmREaXJYJylcbiAgICAgIC51aW50MTYoJ21fd29ybGRGb3J3YXJkRGlyWScpXG4gICAgICAudWludDE2KCdtX3dvcmxkRm9yd2FyZERpclonKVxuICAgICAgLnVpbnQxNignbV93b3JsZFJpZ2h0RGlyWCcpXG4gICAgICAudWludDE2KCdtX3dvcmxkUmlnaHREaXJZJylcbiAgICAgIC51aW50MTYoJ21fd29ybGRSaWdodERpclonKVxuICAgICAgLmZsb2F0bGUoJ21fZ0ZvcmNlTGF0ZXJhbCcpXG4gICAgICAuZmxvYXRsZSgnbV9nRm9yY2VMb25naXR1ZGluYWwnKVxuICAgICAgLmZsb2F0bGUoJ21fZ0ZvcmNlVmVydGljYWwnKVxuICAgICAgLmZsb2F0bGUoJ21feWF3JylcbiAgICAgIC5mbG9hdGxlKCdtX3BpdGNoJylcbiAgICAgIC5mbG9hdGxlKCdtX3JvbGwnKTtcbiAgfVxufSJdfQ==