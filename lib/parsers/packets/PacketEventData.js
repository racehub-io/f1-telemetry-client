function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import F1Parser from "../F1Parser";
import PacketHeader from "./PacketHeader";
/*
struct PacketEventData
{
  PacketHeader    m_header;               // Header  
  uint8           m_eventStringCode[4];   // Event string code, see above
};
*/

export default class PacketEventData extends F1Parser {
  constructor(buffer) {
    super();

    _defineProperty(this, "data", void 0);

    this.endianess("little").nest("m_header", {
      type: new PacketHeader()
    }).string("m_eventStringCode", {
      length: 4
    });
    this.data = this.fromBuffer(buffer);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXJzL3BhY2tldHMvUGFja2V0RXZlbnREYXRhLnRzIl0sIm5hbWVzIjpbIkYxUGFyc2VyIiwiUGFja2V0SGVhZGVyIiwiUGFja2V0RXZlbnREYXRhIiwiY29uc3RydWN0b3IiLCJidWZmZXIiLCJlbmRpYW5lc3MiLCJuZXN0IiwidHlwZSIsInN0cmluZyIsImxlbmd0aCIsImRhdGEiLCJmcm9tQnVmZmVyIl0sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU9BLFFBQVAsTUFBcUIsYUFBckI7QUFDQSxPQUFPQyxZQUFQLE1BQXlCLGdCQUF6QjtBQUVBOzs7Ozs7OztBQVFBLGVBQWUsTUFBTUMsZUFBTixTQUE4QkYsUUFBOUIsQ0FBdUM7QUFHcERHLEVBQUFBLFdBQVcsQ0FBQ0MsTUFBRCxFQUFpQjtBQUMxQjs7QUFEMEI7O0FBRTFCLFNBQUtDLFNBQUwsQ0FBZSxRQUFmLEVBQ0dDLElBREgsQ0FDUSxVQURSLEVBQ29CO0FBQ2hCQyxNQUFBQSxJQUFJLEVBQUUsSUFBSU4sWUFBSjtBQURVLEtBRHBCLEVBSUdPLE1BSkgsQ0FJVSxtQkFKVixFQUkrQjtBQUMzQkMsTUFBQUEsTUFBTSxFQUFFO0FBRG1CLEtBSi9CO0FBUUEsU0FBS0MsSUFBTCxHQUFZLEtBQUtDLFVBQUwsQ0FBZ0JQLE1BQWhCLENBQVo7QUFDRDs7QUFkbUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRjFQYXJzZXIgZnJvbSBcIi4uL0YxUGFyc2VyXCI7XG5pbXBvcnQgUGFja2V0SGVhZGVyIGZyb20gXCIuL1BhY2tldEhlYWRlclwiO1xuXG4vKlxuc3RydWN0IFBhY2tldEV2ZW50RGF0YVxue1xuICBQYWNrZXRIZWFkZXIgICAgbV9oZWFkZXI7ICAgICAgICAgICAgICAgLy8gSGVhZGVyICBcbiAgdWludDggICAgICAgICAgIG1fZXZlbnRTdHJpbmdDb2RlWzRdOyAgIC8vIEV2ZW50IHN0cmluZyBjb2RlLCBzZWUgYWJvdmVcbn07XG4qL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWNrZXRFdmVudERhdGEgZXh0ZW5kcyBGMVBhcnNlciB7XG4gIGRhdGE6IGFueTtcblxuICBjb25zdHJ1Y3RvcihidWZmZXI6IEJ1ZmZlcikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5lbmRpYW5lc3MoXCJsaXR0bGVcIilcbiAgICAgIC5uZXN0KFwibV9oZWFkZXJcIiwge1xuICAgICAgICB0eXBlOiBuZXcgUGFja2V0SGVhZGVyKClcbiAgICAgIH0pXG4gICAgICAuc3RyaW5nKFwibV9ldmVudFN0cmluZ0NvZGVcIiwge1xuICAgICAgICBsZW5ndGg6IDRcbiAgICAgIH0pO1xuXG4gICAgdGhpcy5kYXRhID0gdGhpcy5mcm9tQnVmZmVyKGJ1ZmZlcik7XG4gIH1cbn1cbiJdfQ==