import F1Parser from '../F1Parser';
/*
struct ParticipantData
{
  uint8      m_aiControlled;           // Whether the vehicle is AI (1) or Human (0) controlled
  uint8      m_driverId;               // Driver id - see appendix
  uint8      m_teamId;                 // Team id - see appendix
  uint8      m_raceNumber;             // Race number of the car
  uint8      m_nationality;            // Nationality of the driver
  char       m_name[48];               // Name of participant in UTF-8 format – null terminated                                       // Will be truncated with … (U+2026) if too long
};
*/

export default class ParticipantData extends F1Parser {
  constructor() {
    super();
    this.uint8('m_aiControlled').uint8('m_driverId').uint8('m_teamId').uint8('m_raceNumber').uint8('m_nationality').string('m_name', {
      length: 48,
      stripNull: true
    });
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXJzL3BhY2tldHMvUGFydGljaXBhbnREYXRhLnRzIl0sIm5hbWVzIjpbIkYxUGFyc2VyIiwiUGFydGljaXBhbnREYXRhIiwiY29uc3RydWN0b3IiLCJ1aW50OCIsInN0cmluZyIsImxlbmd0aCIsInN0cmlwTnVsbCJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsUUFBUCxNQUFxQixhQUFyQjtBQUVBOzs7Ozs7Ozs7Ozs7QUFXQSxlQUFlLE1BQU1DLGVBQU4sU0FBOEJELFFBQTlCLENBQXVDO0FBQ3BERSxFQUFBQSxXQUFXLEdBQUc7QUFDWjtBQUNBLFNBQUtDLEtBQUwsQ0FBVyxnQkFBWCxFQUNHQSxLQURILENBQ1MsWUFEVCxFQUVHQSxLQUZILENBRVMsVUFGVCxFQUdHQSxLQUhILENBR1MsY0FIVCxFQUlHQSxLQUpILENBSVMsZUFKVCxFQUtHQyxNQUxILENBS1UsUUFMVixFQUtvQjtBQUNoQkMsTUFBQUEsTUFBTSxFQUFFLEVBRFE7QUFFaEJDLE1BQUFBLFNBQVMsRUFBRTtBQUZLLEtBTHBCO0FBU0Q7O0FBWm1EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEYxUGFyc2VyIGZyb20gJy4uL0YxUGFyc2VyJztcblxuLypcbnN0cnVjdCBQYXJ0aWNpcGFudERhdGFcbntcbiAgdWludDggICAgICBtX2FpQ29udHJvbGxlZDsgICAgICAgICAgIC8vIFdoZXRoZXIgdGhlIHZlaGljbGUgaXMgQUkgKDEpIG9yIEh1bWFuICgwKSBjb250cm9sbGVkXG4gIHVpbnQ4ICAgICAgbV9kcml2ZXJJZDsgICAgICAgICAgICAgICAvLyBEcml2ZXIgaWQgLSBzZWUgYXBwZW5kaXhcbiAgdWludDggICAgICBtX3RlYW1JZDsgICAgICAgICAgICAgICAgIC8vIFRlYW0gaWQgLSBzZWUgYXBwZW5kaXhcbiAgdWludDggICAgICBtX3JhY2VOdW1iZXI7ICAgICAgICAgICAgIC8vIFJhY2UgbnVtYmVyIG9mIHRoZSBjYXJcbiAgdWludDggICAgICBtX25hdGlvbmFsaXR5OyAgICAgICAgICAgIC8vIE5hdGlvbmFsaXR5IG9mIHRoZSBkcml2ZXJcbiAgY2hhciAgICAgICBtX25hbWVbNDhdOyAgICAgICAgICAgICAgIC8vIE5hbWUgb2YgcGFydGljaXBhbnQgaW4gVVRGLTggZm9ybWF0IOKAkyBudWxsIHRlcm1pbmF0ZWQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXaWxsIGJlIHRydW5jYXRlZCB3aXRoIOKApiAoVSsyMDI2KSBpZiB0b28gbG9uZ1xufTtcbiovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJ0aWNpcGFudERhdGEgZXh0ZW5kcyBGMVBhcnNlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy51aW50OCgnbV9haUNvbnRyb2xsZWQnKVxuICAgICAgLnVpbnQ4KCdtX2RyaXZlcklkJylcbiAgICAgIC51aW50OCgnbV90ZWFtSWQnKVxuICAgICAgLnVpbnQ4KCdtX3JhY2VOdW1iZXInKVxuICAgICAgLnVpbnQ4KCdtX25hdGlvbmFsaXR5JylcbiAgICAgIC5zdHJpbmcoJ21fbmFtZScsIHtcbiAgICAgICAgbGVuZ3RoOiA0OCxcbiAgICAgICAgc3RyaXBOdWxsOiB0cnVlXG4gICAgICB9KVxuICB9XG59Il19