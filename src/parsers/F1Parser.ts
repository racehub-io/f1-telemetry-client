import {Parser} from 'binary-parser';

export class F1Parser<T> extends Parser {
  /**
   *
   * @param {Buffer} buffer
   */
  // tslint:disable-next-line:no-any
  fromBuffer(buffer: Buffer): T {
    return this.parse(buffer);
  }
}
