import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { StackNavigationOptions } from '@react-navigation/stack';

import { FC } from 'react';
import { RootStackParamList } from '@core/NavigatorScreens';
import { DeepReadonly, ValueOf } from '@type/ts_extension';
import { AxiosResponseHeaders, InternalAxiosRequestConfig, RawAxiosResponseHeaders } from 'axios/index';

export interface IStackScreen {
    name: string;
    component: FC<any>;
    options: BottomTabNavigationOptions | StackNavigationOptions;
}

export type MultipleStackScreen = Readonly<{
    [key in 'user' | 'auth']: Array<Readonly<IStackScreen>>;
}>;

export type SVGImageSourcePropTypes = any;
export interface INavigateOptions<T> {
    path: T extends null ? '' : keyof RootStackParamList;
    props: ValueOf<RootStackParamList>;
}

export interface IFlatListRender<T> {
    item: T;
    index: number;
}

export type INavigationParams<T extends keyof RootStackParamList> = {
    path: T;
    props: RootStackParamList[T];
}

export interface AxiosResponse<T = any, D = any> {
    data: T;
    status: number;
    statusText: string;
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
    config: InternalAxiosRequestConfig<D>;
    request?: any;
}
