import React, { useCallback, useState } from 'react';
import { AllUsersScreenPresenter, allUsersScreenPresenterProps } from '@screens/AllUsersScreen/view';

export type allUsersScreenContainerProps = {};
type allUsersScreenContainerState = {
  isRefreshing: boolean;
};

const AllUsersScreenContainer: React.FC<allUsersScreenContainerProps> = ({}) => {
  const [getState, setState] = useState<allUsersScreenContainerState>({
    isRefreshing: false,
  });

  const onRefresh = useCallback(() => {
  }, []);

  const handleSettingsPress = useCallback(() => {

  }, []);

  const ViewProps: allUsersScreenPresenterProps = {
    handleSettingsPress,
    isRefreshing: getState.isRefreshing,
    onRefresh,
  };

  return (
    <AllUsersScreenPresenter {...ViewProps} />
  );
};

export { AllUsersScreenContainer };
