"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binary_parser_1 = require("binary-parser");
class F1Parser extends binary_parser_1.Parser {
    /**
     *
     * @param {Buffer} buffer
     */
    fromBuffer(buffer) {
        return this.parse(buffer);
    }
}
exports.default = F1Parser;
//# sourceMappingURL=F1Parser.js.map