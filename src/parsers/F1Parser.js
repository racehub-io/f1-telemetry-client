import { Parser } from 'binary-parser';

export default class F1Parser extends Parser {
  /**
   *
   * @param {Buffer} buffer
   */
  fromBuffer(buffer) {
    return this.parse(buffer);
  }
}
