import React, { useCallback } from 'react';
import { MatchesScreenPresenter, matchesScreenPresenterProps } from '@screens/MatchesScreen/view';

export type matchesScreenContainerProps = {};

const MatchesScreenContainer: React.FC<matchesScreenContainerProps> = ({}) => {
  const handleSettingsPress = useCallback(() => {

  }, []);

  const handleLikePress = useCallback(() => {

  }, []);

  const handleSkipPress = useCallback(() => {

  }, []);

  const handleFavoritePress = useCallback(() => {

  }, []);

  const ViewProps: matchesScreenPresenterProps = {
    handleSettingsPress,
    handleLikePress,
    handleSkipPress,
    handleFavoritePress,
  };

  return (
    <MatchesScreenPresenter {...ViewProps} />
  );
};

export { MatchesScreenContainer };
