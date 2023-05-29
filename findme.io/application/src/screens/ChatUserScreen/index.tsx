import React from 'react';
import { ChatUserScreenPresenter, chatUserScreenPresenterProps } from '@screens/ChatUserScreen/view';

export type chatUserScreenContainerProps = {};

const ChatUserScreenContainer: React.FC<chatUserScreenContainerProps> = ({}) => {
  const ViewProps: chatUserScreenPresenterProps = {};

  return (
    <ChatUserScreenPresenter {...ViewProps} />
  );
};

export { ChatUserScreenContainer };
