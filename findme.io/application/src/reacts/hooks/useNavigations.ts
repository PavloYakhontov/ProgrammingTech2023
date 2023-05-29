import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { forceNavigator } from '@core/Navigator';

export const useCancelBack = () => {
  useFocusEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      forceNavigator.goBack();
      return true;
    });
  });
};

export function useFocus(callback: Function, deps: Array<any> = []) {
  return useFocusEffect(
    useCallback(() => {
      callback();
    }, [forceNavigator.navigationStack, ...deps]),
  );
}

export function useBlur(callback: Function, deps: Array<any> = []) {
  return useFocusEffect(
    useCallback(() => {
      return () => callback();
    }, [forceNavigator.navigationStack, ...deps]),
  );
}
