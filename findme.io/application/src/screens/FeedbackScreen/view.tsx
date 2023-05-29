import React from 'react';
import { Text } from 'react-native';

import { ScreenLayoutView } from '@components/common/hoc/ScreenLayout';

export type feedbackScreenPresenterProps = {};

const FeedbackScreenPresenter: React.FC<feedbackScreenPresenterProps> = ({}) => {
  return (
    <ScreenLayoutView>
      <Text>Discover</Text>
    </ScreenLayoutView>
  );
};

export { FeedbackScreenPresenter };
