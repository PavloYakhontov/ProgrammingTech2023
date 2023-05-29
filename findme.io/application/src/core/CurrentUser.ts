import AsyncStorage from '@react-native-async-storage/async-storage';

type userData = Required<{
  username: string;
  user_hash: string;
  avatar: string;
  fullName: string;
  birth: string;
  details: string;
  gender: string;
  email: string;
  mood_id: string;
  active: boolean;
  popularity: number;
  city: string;
  country: string;
}>;

export type tokens = {
  access_token: string;
  refresh_token: string;
  expiration_time: number;
}

export enum storageKeys {
  UserData = 'userData',
  Tokens = 'Tokens',
}

export class CurrentUser {
  get tokens(): tokens {
    return this._tokens;
  }

  private _userData: userData;

  private _tokens: tokens;

  constructor() {
    this._userData = {
      username: '',
      user_hash: '',
      avatar: '',
      fullName: '',
      birth: '',
      details: '',
      gender: '',
      email: '',
      mood_id: '',
      active: false,
      popularity: -1,
      city: '',
      country: '',
    };
    this._tokens = {
      access_token: '',
      refresh_token: '',
      expiration_time: 0,
    };
  }

  public get userData(): userData {
    return this._userData;
  }

  public get isAuth(): boolean {
    return Object.values(this._tokens).every((el) => !!el);
  }

  public async restoreUser() {
    try {
      const data = await AsyncStorage.getItem(storageKeys.UserData);
      if (data !== void 0 && data !== null) {
        const parsedData = JSON.parse(data);
        this._userData.user_hash = parsedData.userColor;
        this._userData.active = parsedData.active;
        this._userData.avatar = parsedData.avatar;
        this._userData.city = parsedData.city;
        this._userData.country = parsedData.country;
        this._userData.email = parsedData.email;
        this._userData.birth = parsedData.birth;
        this._userData.gender = parsedData.gender;
        this._userData.mood_id = parsedData.mood_id;
        this._userData.popularity = parsedData.popularity;
        this._userData.fullName = parsedData.fullName;
        this._userData.username = parsedData.username;
      }
      const tokens = await AsyncStorage.getItem(storageKeys.Tokens);
      if (tokens !== void 0 && tokens !== null) {
        const parsedTokens = JSON.parse(tokens);
        this._tokens.expiration_time = parsedTokens.expiration_time;
        this._tokens.access_token = parsedTokens.access_token;
        this._tokens.refresh_token = parsedTokens.refresh_token;
      }
    } catch (ex) {
      console.warn('restore user ex', ex);
    }
  }

  public async logOut() {
    try {
      this._userData = {
        username: '',
        user_hash: '',
        avatar: '',
        fullName: '',
        birth: '',
        details: '',
        gender: '',
        email: '',
        mood_id: '',
        active: false,
        popularity: -1,
        city: '',
        country: '',
      };
      this._tokens = {
        refresh_token: '',
        access_token: '',
        expiration_time: 0,
      };
      await this.saveUser();
    } catch (ex) {
      console.warn('log out ex', ex);
    }
  }

  public async saveTokens<T extends tokens>(tokenData: T | null) {
    try {
      if (tokenData) {
        this._tokens = tokenData;
        await this.saveUser();
      }
    } catch (e) {
      console.warn('save tokens ex', e);
    }
  }

  public async saveUser() {
    try {
      const jsonData = JSON.stringify(this._userData);
      const tokensData = JSON.stringify(this._tokens);
      await AsyncStorage.setItem(storageKeys.UserData, jsonData);
      await AsyncStorage.setItem(storageKeys.Tokens, tokensData);
    } catch (e) {
      console.warn('save user ex', e);
    }
  }
}

export const __current_user__ = new CurrentUser();
