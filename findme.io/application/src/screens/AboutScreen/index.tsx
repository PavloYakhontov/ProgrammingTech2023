import React from 'react';
import { AboutScreenPresenter, aboutScreenPresenterProps } from '@screens/AboutScreen/view';

export type aboutScreenContainerProps = {};

const AboutScreenContainer: React.FC<aboutScreenContainerProps> = ({}) => {
  const ViewProps: aboutScreenPresenterProps = {};

  return (
    <AboutScreenPresenter {...ViewProps} />
  );
};

export { AboutScreenContainer };
