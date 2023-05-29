import React from 'react';
import { Text } from 'react-native';

import { ScreenLayoutView } from '@components/common/hoc/ScreenLayout';

export type editProfileScreenPresenterProps = {};

const EditProfileScreenPresenter: React.FC<editProfileScreenPresenterProps> = ({}) => {
  return (
    <ScreenLayoutView>
      <Text>Discover</Text>
    </ScreenLayoutView>
  );
};

export { EditProfileScreenPresenter };
