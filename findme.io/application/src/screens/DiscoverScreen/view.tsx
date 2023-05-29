import React, { useEffect } from 'react';
import { View } from 'react-native';

import { ScreenLayoutView } from '@components/common/hoc/ScreenLayout';
import { Styles } from '@styles/load';
import { colors } from '@utils/colors';
import { MainHeaderView } from '@core/Headers/MainHeader';
import TabBarView from '@components/TabBarView';
import MatchesListView from '@components/lists/MatchesListView';
import { DEVICE_WIDTH } from '@utils/scaling';

export type discoverScreenPresenterProps = {};

const DiscoverScreenPresenter: React.FC<discoverScreenPresenterProps> = ({}) => {
  return (
    <ScreenLayoutView
      useKeyboardAvoid={false}
      backgroundColor={colors.whiteFF}
      styles={[Styles.Container.serviceScreenLayoutHeader]}
    >
      <View style={Styles.Container.screenLayout}>
        <MainHeaderView
          LeftButton={{ hide: true }}
          headerText="matches"
        />
      </View>
      <View>
        <TabBarView
          containerStyles={Styles.MarginPadding.pb100}
          buttonTextStyles={[Styles.Text.smallTextBold18, { width: DEVICE_WIDTH / 2 }, Styles.Text.textCenter, Styles.MarginPadding.pb4]}
          containerButtonStyles={[Styles.Layout.w100, Styles.Layout.jc_sa, Styles.MarginPadding.g32, Styles.MarginPadding.mt20]}
          defaultIndex={0}
          labelList={['Mutually', 'Incoming']}
          componentList={[
            <MatchesListView type="mutually" />,
            <MatchesListView type="incoming" />,
          ]}
        />
      </View>
    </ScreenLayoutView>
  );
};

export { DiscoverScreenPresenter };

/**
 useInteraction();
  useEffect(() => {
    const d = Date.now();
    console.warn('zxc1', d);
    InteractionManager.runAfterInteractions(() => {
      const d2 = Date.now();
      console.warn('zxc2', d2 - d);
    });
  }, []);
*/
