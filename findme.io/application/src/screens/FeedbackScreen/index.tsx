import React from 'react';
import { FeedbackScreenPresenter, feedbackScreenPresenterProps } from '@screens/FeedbackScreen/view';

export type feedbackScreenContainerProps = {};

const FeedbackScreenContainer: React.FC<feedbackScreenContainerProps> = ({}) => {
  const ViewProps: feedbackScreenPresenterProps = {};

  return (
    <FeedbackScreenPresenter {...ViewProps} />
  );
};

export { FeedbackScreenContainer };
