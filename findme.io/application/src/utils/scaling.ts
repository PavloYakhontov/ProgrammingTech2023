import { Dimensions, Image, NativeModules, PixelRatio, Platform, StatusBar } from 'react-native';

// const { StatusBarManager } = NativeModules;
export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;

// export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
// Set mockup width in dp example IphoneXS 414
export const MOCKUP_WIDTH = 375;
// Set mockup height in dp example IphoneXS 896
export const MOCKUP_HEIGHT = 812;

// Converts dp from mockup to current device
export const wDP = (mockupWidth: number) => {
  if (MOCKUP_WIDTH > DEVICE_WIDTH) {
    return PixelRatio.roundToNearestPixel(mockupWidth * (Math.round((DEVICE_WIDTH / MOCKUP_WIDTH) * 1000) / 1000));
  }
  return PixelRatio.roundToNearestPixel(mockupWidth * (DEVICE_WIDTH / MOCKUP_WIDTH));
};
// 1280 x 720
export const hDP = (mockupHeight: number) => {
  if (MOCKUP_HEIGHT > DEVICE_HEIGHT) {
    return PixelRatio.roundToNearestPixel(mockupHeight * (Math.round((DEVICE_HEIGHT / MOCKUP_HEIGHT) * 1000) / 1000));
  }
  return PixelRatio.roundToNearestPixel(mockupHeight * (DEVICE_HEIGHT / MOCKUP_HEIGHT));
};

export function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (dimen.height === 780 ||
      dimen.width === 780 ||
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 844 ||
      dimen.width === 844 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 926)
  );
}

export function fontSizeDP(fontSize: number, standardScreenHeight = 812) {
  const { height, width } = Dimensions.get('window');
  const standardLength = width > height ? width : height;
  const offset = width > height ? 0 : Platform.OS === 'ios' ? 78 : StatusBar.currentHeight; // iPhone X style SafeAreaView size in portrait

  const deviceHeight = isIphoneX() || Platform.OS === 'android' ? standardLength - offset! : standardLength;
  const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
  return Math.round(heightPercent);
}

export const dateParser = (timestamp: any, localtime = 0): string => {
  const parser = new Date(Date.parse(timestamp));
  const day = parser.getDate() === 0 ? 1 : parser.getDate();
  const month = parser.getMonth() === 0 ? 1 : parser.getMonth();
  const hours = parser.getHours();
  const minutes = parser.getMinutes();
  return `${day < 10 ? '0' : ''}${day}.${month < 9 ? '0' : ''}${
    localtime === 1 ? month + 1 : month
  }.${parser.getFullYear()} at ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};

export const timeParse = (timestamp: any) => {
  const parsed = new Date(Date.parse(timestamp));
  const hours: number = parsed.getHours();
  const minutes: number = parsed.getMinutes();
  return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};

export const DIMENSION_HEIGHT = {
  window: Dimensions.get('window').height,
  screen: Dimensions.get('screen').height,
  statusBar: StatusBar.currentHeight as number,
};
export const BOTTOM_INSET = Platform.OS === 'android' ? hDP(DIMENSION_HEIGHT.screen - DIMENSION_HEIGHT.window - DIMENSION_HEIGHT.statusBar) : 0;
