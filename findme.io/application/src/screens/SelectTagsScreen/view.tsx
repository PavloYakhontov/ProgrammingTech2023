import React from 'react';
import { Text } from 'react-native';

import { ScreenLayoutView } from '@components/common/hoc/ScreenLayout';

export type selectTagsScreenPresenterProps = {};

const SelectTagsScreenPresenter: React.FC<selectTagsScreenPresenterProps> = ({}) => {
  return (
    <ScreenLayoutView>
      <Text>Discover</Text>
    </ScreenLayoutView>
  );
};

export { SelectTagsScreenPresenter };
