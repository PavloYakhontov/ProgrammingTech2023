import React from 'react';
import { Text } from 'react-native';

import { ScreenLayoutView } from '@components/common/hoc/ScreenLayout';

export type chatUserScreenPresenterProps = {};

const ChatUserScreenPresenter: React.FC<chatUserScreenPresenterProps> = ({}) => {
  return (
    <ScreenLayoutView>
      <Text>ChatsScreen</Text>
    </ScreenLayoutView>
  );
};

export { ChatUserScreenPresenter };
