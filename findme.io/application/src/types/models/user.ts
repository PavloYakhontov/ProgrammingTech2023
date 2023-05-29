import { ISliceBaseModel } from '@type/models/index';

export type IUserDiscoverType = 'mutually' | 'incoming';
export interface IUserRegisterSlice extends ISliceBaseModel {
  email: string;
  phone: string;
  password: string;
  rePassword: string;
  firstName: string;
  lastName: string;
  birthday: string;
  details: string;
  city: string;
  country: string;
  hasInterest: boolean;
  gender: string;
  hasTags: boolean;
  hasSelectedMood: boolean;
}

export interface IUserDiscoverModelShort {
  type?: IUserDiscoverType;
  alreadyLiked?: boolean;
  full_name: string;
  details: string;
  user_hash: string;
  images: Array<string>;
  coords: { x: number; y: number };
  age: number;
  dateOfCreation?: number;
}

export interface IUserDiscoverModelFull extends IUserDiscoverModelShort {
  birthday: Date;
  gender: 'male' | 'female' | 'another' | 'unknown';
  email: string;
  mood: string;
  active: boolean;
  popularity: number;
  city: string;
  phone: string;
  country: string;
}
