export class Settings {
  private readonly _API_URL: string;

  private readonly _ENVIRONMENT: string;

  private readonly _API_V2: string;

  constructor() {
    this._API_URL = 'http://192.168.1.184:8080/';
    this._ENVIRONMENT = 'development';
    this._API_V2 = 'api/v2';
  }

  public get API_URL(): string {
    return this._API_URL;
  }

  public get ENVIRONMENT(): string {
    return this._ENVIRONMENT;
  }

  public get API_V2(): string {
    return this._API_V2;
  }
}

export const settings = new Settings();
