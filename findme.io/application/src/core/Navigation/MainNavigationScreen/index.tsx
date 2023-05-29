import React, { PropsWithChildren, useEffect, useState } from 'react';
import { AppState, Text, View } from 'react-native';
import { useTypedSelector } from '@reacts/hooks/useRedux';
import { MainNavigationPresenter, mainNavigationPresenterProps } from './view';

type mainNavigationContainerProps = PropsWithChildren<{

}>;

type mainNavigationContainerState = {

};
const MainNavigationContainer: React.FC<mainNavigationContainerProps> = ({}) => {
  const [getState, setState] = useState<mainNavigationContainerState>({});
  const isAuthState = useTypedSelector((state) => state.global);
  const ApplicationState = () => {
    const subscription = AppState.addEventListener('change', (state) => {
      switch (state) {
        case 'active':
          console.log('app active');
          break;
        case 'background':
          console.log('app background');
          break;
        case 'inactive':
          console.log('app inactive');
          break;
        case 'unknown':
          console.log('app unknown');
          break;
        case 'extension':
          console.log('app extension');
          break;
        default:
          console.log('default');
      }
    });
    return () => {
      subscription.remove();
    };
  };

  useEffect(ApplicationState, []);

  const ViewProps: mainNavigationPresenterProps = {
    isAuth: isAuthState.isAuth,
  };

  return <MainNavigationPresenter {...ViewProps} />;
};

export { MainNavigationContainer };
