import React from 'react';
import { SettingsScreenPresenter, settingsScreenPresenterProps } from '@screens/SettingsScreen/view';

export type settingsScreenContainerProps = {};

const SettingsScreenContainer: React.FC<settingsScreenContainerProps> = ({}) => {
  const ViewProps: settingsScreenPresenterProps = {};

  return (
    <SettingsScreenPresenter {...ViewProps} />
  );
};

export { SettingsScreenContainer };
