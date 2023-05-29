import React from 'react';
import { SelectGenderScreenPresenter, selectGenderScreenPresenterProps } from '@screens/SelectGenderScreen/view';

export type selectGenderScreenContainerProps = {};

const SelectGenderScreenContainer: React.FC<selectGenderScreenContainerProps> = ({}) => {
  const ViewProps: selectGenderScreenPresenterProps = {};

  return (
    <SelectGenderScreenPresenter {...ViewProps} />
  );
};

export { SelectGenderScreenContainer };
