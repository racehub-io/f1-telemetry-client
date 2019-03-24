function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import F1Parser from "../F1Parser";
import ParticipantData from "./ParticipantData";
import PacketHeader from "./PacketHeader";
/*
struct PacketParticipantsData
{
    PacketHeader    m_header;            // Header
    uint8           m_numCars;           // Number of cars in the data
    ParticipantData m_participants[20];
};
*/

export default class PacketParticipantsData extends F1Parser {
  constructor(buffer) {
    super();

    _defineProperty(this, "data", void 0);

    this.endianess("little").nest("m_header", {
      type: new PacketHeader()
    }).uint8("m_numCars").array("m_participants", {
      length: 20,
      type: new ParticipantData()
    });
    this.data = this.fromBuffer(buffer);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXJzL3BhY2tldHMvUGFja2V0UGFydGljaXBhbnRzRGF0YS50cyJdLCJuYW1lcyI6WyJGMVBhcnNlciIsIlBhcnRpY2lwYW50RGF0YSIsIlBhY2tldEhlYWRlciIsIlBhY2tldFBhcnRpY2lwYW50c0RhdGEiLCJjb25zdHJ1Y3RvciIsImJ1ZmZlciIsImVuZGlhbmVzcyIsIm5lc3QiLCJ0eXBlIiwidWludDgiLCJhcnJheSIsImxlbmd0aCIsImRhdGEiLCJmcm9tQnVmZmVyIl0sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU9BLFFBQVAsTUFBcUIsYUFBckI7QUFDQSxPQUFPQyxlQUFQLE1BQTRCLG1CQUE1QjtBQUNBLE9BQU9DLFlBQVAsTUFBeUIsZ0JBQXpCO0FBRUE7Ozs7Ozs7OztBQVNBLGVBQWUsTUFBTUMsc0JBQU4sU0FBcUNILFFBQXJDLENBQThDO0FBRzNESSxFQUFBQSxXQUFXLENBQUNDLE1BQUQsRUFBaUI7QUFDMUI7O0FBRDBCOztBQUcxQixTQUFLQyxTQUFMLENBQWUsUUFBZixFQUNHQyxJQURILENBQ1EsVUFEUixFQUNvQjtBQUNoQkMsTUFBQUEsSUFBSSxFQUFFLElBQUlOLFlBQUo7QUFEVSxLQURwQixFQUlHTyxLQUpILENBSVMsV0FKVCxFQUtHQyxLQUxILENBS1MsZ0JBTFQsRUFLMkI7QUFDdkJDLE1BQUFBLE1BQU0sRUFBRSxFQURlO0FBRXZCSCxNQUFBQSxJQUFJLEVBQUUsSUFBSVAsZUFBSjtBQUZpQixLQUwzQjtBQVVBLFNBQUtXLElBQUwsR0FBWSxLQUFLQyxVQUFMLENBQWdCUixNQUFoQixDQUFaO0FBQ0Q7O0FBakIwRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGMVBhcnNlciBmcm9tIFwiLi4vRjFQYXJzZXJcIjtcbmltcG9ydCBQYXJ0aWNpcGFudERhdGEgZnJvbSBcIi4vUGFydGljaXBhbnREYXRhXCI7XG5pbXBvcnQgUGFja2V0SGVhZGVyIGZyb20gXCIuL1BhY2tldEhlYWRlclwiO1xuXG4vKlxuc3RydWN0IFBhY2tldFBhcnRpY2lwYW50c0RhdGFcbntcbiAgICBQYWNrZXRIZWFkZXIgICAgbV9oZWFkZXI7ICAgICAgICAgICAgLy8gSGVhZGVyXG4gICAgdWludDggICAgICAgICAgIG1fbnVtQ2FyczsgICAgICAgICAgIC8vIE51bWJlciBvZiBjYXJzIGluIHRoZSBkYXRhXG4gICAgUGFydGljaXBhbnREYXRhIG1fcGFydGljaXBhbnRzWzIwXTtcbn07XG4qL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWNrZXRQYXJ0aWNpcGFudHNEYXRhIGV4dGVuZHMgRjFQYXJzZXIge1xuICBkYXRhOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoYnVmZmVyOiBCdWZmZXIpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5lbmRpYW5lc3MoXCJsaXR0bGVcIilcbiAgICAgIC5uZXN0KFwibV9oZWFkZXJcIiwge1xuICAgICAgICB0eXBlOiBuZXcgUGFja2V0SGVhZGVyKClcbiAgICAgIH0pXG4gICAgICAudWludDgoXCJtX251bUNhcnNcIilcbiAgICAgIC5hcnJheShcIm1fcGFydGljaXBhbnRzXCIsIHtcbiAgICAgICAgbGVuZ3RoOiAyMCxcbiAgICAgICAgdHlwZTogbmV3IFBhcnRpY2lwYW50RGF0YSgpXG4gICAgICB9KTtcblxuICAgIHRoaXMuZGF0YSA9IHRoaXMuZnJvbUJ1ZmZlcihidWZmZXIpO1xuICB9XG59XG4iXX0=