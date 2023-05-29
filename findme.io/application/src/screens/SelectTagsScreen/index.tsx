import React from 'react';
import { SelectTagsScreenPresenter, selectTagsScreenPresenterProps } from '@screens/SelectTagsScreen/view';

export type selectTagsScreenContainerProps = {};

const SelectTagsScreenContainer: React.FC<selectTagsScreenContainerProps> = ({}) => {
  const ViewProps: selectTagsScreenPresenterProps = {};

  return (
    <SelectTagsScreenPresenter {...ViewProps} />
  );
};

export { SelectTagsScreenContainer };
