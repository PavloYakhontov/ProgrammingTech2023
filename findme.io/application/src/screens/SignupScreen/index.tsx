import React, { useCallback } from 'react';
import { Alert } from 'react-native';
import { SignupScreenPresenter, signupScreenPresenterProps } from '@screens/SignupScreen/view';
import { forceNavigator } from '@core/Navigator';

export type signupScreenContainerProps = {};

const SignupScreenContainer: React.FC<signupScreenContainerProps> = ({}) => {
  const onUsePhoneNumberPress = useCallback(() => {
    forceNavigator.navigate('PhoneScreen', {});
  }, []);

  const onFacebookPress = useCallback(() => {
    Alert.alert('Facebook!', 'STUB!');
  }, []);

  const onGooglePress = useCallback(() => {
    Alert.alert('Google!', 'STUB!');
  }, []);

  const ViewProps: signupScreenPresenterProps = {
    onUsePhoneNumberPress,
    onFacebookPress,
    onGooglePress,
  };

  return (
    <SignupScreenPresenter {...ViewProps} />
  );
};

export { SignupScreenContainer };
