import React, { useCallback, useRef } from 'react';
import { UserProfileScreenPresenter, userProfileScreenPresenterProps } from '@screens/UserProfileScreen/view';
import { CONSTANTS } from '@utils/constants/strings';
import { Animated, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

export type userProfileScreenContainerProps = {};

const UserProfileScreenContainer: React.FC<userProfileScreenContainerProps> = ({}) => {
  const headerImageAnim = useRef(new Animated.Value(1)).current;

  const handleSettingsPress = useCallback(() => {

  }, []);

  const handleNameAndBirthdaySettingsPress = useCallback(() => {

  }, []);

  const handleOnScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset: { y } } = event.nativeEvent;
    const currentPercent = (y / CONSTANTS.headerMaxValue) * 100;
    if (currentPercent > 100) return;
    headerImageAnim.flattenOffset();
    headerImageAnim.setValue(currentPercent);
  }, [headerImageAnim]);

  const ViewProps: userProfileScreenPresenterProps = {
    handleOnScroll,
    headerImageAnim,
  };

  return (
    <UserProfileScreenPresenter {...ViewProps} />
  );
};

export { UserProfileScreenContainer };
