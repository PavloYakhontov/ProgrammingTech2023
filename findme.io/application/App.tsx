import React, { useEffect } from 'react';
import { Alert, BackHandler, LogBox, Platform, SafeAreaView, UIManager } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { MainNavigationContainer } from '@core/Navigation/MainNavigationScreen';
import { FindStatusBar } from '@core/StatusBar';
import { forceNavigator } from '@core/Navigator';
import { Styles } from '@styles/load';
import { useTypedDispatch } from '@reacts/hooks/useRedux';
import { globalActions } from '@redux/slices/global.slice';
import { __app__ } from '@core/MainActivity';

function RootApplication(): JSX.Element {
  const rootDispatch = useTypedDispatch();

  useEffect(() => {
    LogBox.ignoreLogs(['Require cycle: ', 'Warning: TypeError: property']);
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
    BackHandler.addEventListener('hardwareBackPress', () => {
      forceNavigator.goBack();
      return true;
    });
    rootDispatch(globalActions.setIsAuth(__app__.getCurrentUser.isAuth));
  }, [rootDispatch]);

  return (
    <NavigationContainer ref={forceNavigator.navigation}>
      <SafeAreaView style={Styles.Layout.flex1}>
        <FindStatusBar />
        <MainNavigationContainer />
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default RootApplication;
