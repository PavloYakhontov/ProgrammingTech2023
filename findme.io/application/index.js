import React from 'react';
import { AppRegistry, BackHandler } from 'react-native';
import { __app__ } from '@core/MainActivity';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistedStore, store } from '@redux/store/store';
import { forceNavigator } from '@core/Navigator';
import { name as appName } from './app.json';
import RootComponent from './App';

const RootApp = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <RootComponent />
      </PersistGate>
    </Provider>
  );
};

BackHandler.addEventListener('hardwareBackPress', () => {
  forceNavigator.goBack();
  return true;
});

AppRegistry.registerRunnable(appName, async (initialState) => {
  try {
    await __app__.onCreate(initialState).then(() => {
      AppRegistry.registerComponent(appName, () => RootApp);
      AppRegistry.runApplication(appName, initialState);
    });
  } catch (e) {
    await __app__.onFallbackCreate(initialState);
    AppRegistry.registerComponent(appName, () => RootApp);
    AppRegistry.runApplication(appName, initialState);
  }
});
