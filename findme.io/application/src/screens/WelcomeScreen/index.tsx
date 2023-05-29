import React, { useCallback } from 'react';
import { WelcomeScreenPresenter, welcomeScreenPresenterProps } from '@screens/WelcomeScreen/view';
import { forceNavigator } from '@core/Navigator';

type welcomeScreenContainerProps = {};
const WelcomeScreenContainer = ({}) => {
  const onGoToAuthPress = useCallback(() => {
    forceNavigator.navigate('SignInScreen', {});
  }, []);

  const onCreateAccountPress = useCallback(() => {
    forceNavigator.navigate('SignupScreen', {});
  }, []);

  const ViewProps: welcomeScreenPresenterProps = {
    onCreateAccountPress,
    onGoToAuthPress,
  };

  return (
    <WelcomeScreenPresenter {...ViewProps} />
  );
};

export { WelcomeScreenContainer };
