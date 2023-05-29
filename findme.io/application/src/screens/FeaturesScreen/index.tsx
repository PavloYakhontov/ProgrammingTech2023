import React from 'react';
import { FeaturesScreenPresenter, featuresScreenPresenterProps } from '@screens/FeaturesScreen/view';

export type featuresScreenContainerProps = {};

const FeaturesScreenContainer: React.FC<featuresScreenContainerProps> = ({}) => {
  const ViewProps: featuresScreenPresenterProps = {};

  return (
    <FeaturesScreenPresenter {...ViewProps} />
  );
};

export { FeaturesScreenContainer };
