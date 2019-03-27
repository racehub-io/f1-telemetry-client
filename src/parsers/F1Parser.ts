import { Parser } from "binary-parser";

export class F1Parser extends Parser {
  /**
   *
   * @param {Buffer} buffer
   */
  fromBuffer(buffer: Buffer): Parser.Parsed<any> {
    return this.parse(buffer);
  }
}
