import React from 'react';
import { SelectInterestsScreenPresenter, selectInterestsScreenPresenterProps } from '@screens/SelectInterestsScreen/view';

export type selectInterestsScreenContainerProps = {};

const SelectInterestsScreenContainer: React.FC<selectInterestsScreenContainerProps> = ({}) => {
  const ViewProps: selectInterestsScreenPresenterProps = {};

  return (
    <SelectInterestsScreenPresenter {...ViewProps} />
  );
};

export { SelectInterestsScreenContainer };
