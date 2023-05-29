import React from 'react';
import { ChatsScreenPresenter, chatsScreenPresenterProps } from '@screens/ChatsScreen/view';

export type chatsScreenContainerProps = {};

const ChatsScreenContainer: React.FC<chatsScreenContainerProps> = ({}) => {
  const ViewProps: chatsScreenPresenterProps = {};

  return (
    <ChatsScreenPresenter {...ViewProps} />
  );
};

export { ChatsScreenContainer };
