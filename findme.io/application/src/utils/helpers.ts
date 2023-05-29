import { CONSTANTS } from '@utils/constants/strings';
import { Animated } from 'react-native';
import { wDP } from './scaling';

export const toRadiansCoords = (degrees: number): number => {
  const pi = Math.PI;
  return degrees * (pi / 180);
};

export const HaversineCalculation = (dLat: number, dLon: number, lat1: number, lat2: number): number => {
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadiansCoords(lat1)) *
    Math.cos(toRadiansCoords(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return +(CONSTANTS.earthRadius * c).toFixed(3);
};

export const queueMicrotask = (cb: () => void) => Promise.resolve()
  .then(cb)
  .catch((err) => setTimeout(() => { throw err; }, 0));

export const sleep = (ms: number) => new Promise((r: any) => setTimeout(r, ms));

export const panAndSkewAnimation = (pan: Animated.ValueXY, skewValue: Animated.Value) => {
  Animated.parallel(
    [
      Animated.spring(
        pan,
        { toValue: {
          x: wDP(0),
          y: 0,
        },
        useNativeDriver: false,
        },
      ),
      Animated.spring(
        skewValue,
        { toValue: 0,
          useNativeDriver: false,
        },
      ),
    ],
  ).start();
};

export function accessObjectField<T extends {[key: string]: any}>(obj: T, propPath: string) {
  const props = propPath.split('.');
  let currentObj = obj;

  for (const prop of props) {
    if (!currentObj || typeof currentObj !== 'object' || !(prop in currentObj)) {
      // Property doesn't exist or is not an object
      return undefined;
    }

    currentObj = currentObj[prop];
  }

  return currentObj;
}
