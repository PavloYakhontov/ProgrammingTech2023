import React from 'react';
import { DiscoverScreenPresenter, discoverScreenPresenterProps } from "@screens/DiscoverScreen/view";

export type discoverScreenContainerProps = {};

const DiscoverScreenContainer: React.FC<discoverScreenContainerProps> = ({}) => {

  const ViewProps: discoverScreenPresenterProps = {};

  return (
    <DiscoverScreenPresenter {...ViewProps} />
  );
};

export { DiscoverScreenContainer };
