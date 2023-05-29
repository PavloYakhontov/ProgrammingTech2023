import { AxiosError } from 'axios';
import { Buffer } from 'buffer';

export class Boundary {
  private readonly ms: string;

  private readonly timeCode: number;

  private readonly trace: string | undefined;

  private readonly is500: boolean | undefined;

  private readonly _requestData: { url: string | undefined; method: string; data: any; } | undefined;

  constructor(error: AxiosError<unknown, unknown>, r: { url: string | undefined; method: string; data: any}) {
    this.ms = 'FATAL_ERROR_CAUSE';
    this.timeCode = Date.now();
    if (error.toJSON !== void 0) {
      this.trace = JSON.stringify(error);
      this.is500 = error.status === 500;
      this._requestData = r;
    }
  }

  public get boundaryBody() {
    return {
      ms: this.ms,
      timeCode: this.timeCode,
      trace: this.trace,
      isFatal500: this.is500,
    };
  }

  public get requestData(): { url: string | undefined; method: string; data: any } | undefined {
    return this._requestData;
  }

  public get requestDataB64(): string {
    if (!this._requestData || !this._requestData?.url || !this._requestData?.method) {
      return '';
    }
    return Buffer.from(JSON.stringify(this._requestData)).toString('base64');
  }
}
