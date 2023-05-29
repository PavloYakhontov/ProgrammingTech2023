import React from 'react';
import { View } from 'react-native';

import { ScreenLayoutView } from '@components/common/hoc/ScreenLayout';
import { Styles } from '@styles/load';
import { MainHeaderView } from '@core/Headers/MainHeader';
import { colors } from '@utils/colors';

export type settingsScreenPresenterProps = {};

const SettingsScreenPresenter: React.FC<
  settingsScreenPresenterProps
> = ({}) => {
  return (
    <ScreenLayoutView
      useKeyboardAvoid={false}
      backgroundColor={colors.whiteFF}
      styles={[Styles.Container.serviceScreenLayoutHeader]}
    >
      <View style={Styles.Container.screenLayout}>
        <MainHeaderView
          headerText="settings"
        />
      </View>
      <View style={[]}>

      </View>
    </ScreenLayoutView>
  );
};

export { SettingsScreenPresenter };
