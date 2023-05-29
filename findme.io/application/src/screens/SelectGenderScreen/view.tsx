import React from 'react';
import { Text } from 'react-native';

import { ScreenLayoutView } from '@components/common/hoc/ScreenLayout';

export type selectGenderScreenPresenterProps = {};

const SelectGenderScreenPresenter: React.FC<selectGenderScreenPresenterProps> = ({}) => {
  return (
    <ScreenLayoutView>
      <Text>Discover</Text>
    </ScreenLayoutView>
  );
};

export { SelectGenderScreenPresenter };
