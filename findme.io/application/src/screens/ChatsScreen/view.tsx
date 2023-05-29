import React from 'react';
import { Text } from 'react-native';

import { ScreenLayoutView } from '@components/common/hoc/ScreenLayout';

export type chatsScreenPresenterProps = {};

const ChatsScreenPresenter: React.FC<chatsScreenPresenterProps> = ({}) => {
  return (
    <ScreenLayoutView>
      <Text>ChatsScreen</Text>
    </ScreenLayoutView>
  );
};

export { ChatsScreenPresenter };
