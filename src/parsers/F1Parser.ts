import { Parser } from 'binary-parser';

export default class F1Parser extends Parser {
  /**
   *
   * @param {Buffer} buffer
   */
  fromBuffer(buffer: Buffer): Parser.Parsed<any> {
    return this.parse(buffer);
  }
}
