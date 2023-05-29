import React from 'react';
import { Text } from 'react-native';

import { ScreenLayoutView } from '@components/common/hoc/ScreenLayout';

export type featuresScreenPresenterProps = {};

const FeaturesScreenPresenter: React.FC<featuresScreenPresenterProps> = ({}) => {
  return (
    <ScreenLayoutView>
      <Text>Discover</Text>
    </ScreenLayoutView>
  );
};

export { FeaturesScreenPresenter };
