import React from 'react';
import { Text, View } from 'react-native';

import { ScreenLayoutView } from '@components/common/hoc/ScreenLayout';
import { colors } from '@utils/colors';
import { Styles } from '@styles/load';
import { MainHeaderView } from '@core/Headers/MainHeader';
import { ImageButtonView } from '@components/ImageButtonView';
import SettingsIcon from '@assets/svg/settings.svg';
import { DraggableContainerView } from '@components/common/draggable/DraggableContainerView';

export type matchesScreenPresenterProps = {
  handleSettingsPress(): void;
  handleLikePress(): void;
  handleSkipPress(): void;
  handleFavoritePress(): void;
};

const MatchesScreenPresenter: React.FC<matchesScreenPresenterProps> = ({ handleFavoritePress, handleLikePress, handleSettingsPress, handleSkipPress }) => {
  return (
    <ScreenLayoutView
      useKeyboardAvoid={false}
      backgroundColor={colors.whiteFF}
      styles={[Styles.Container.serviceScreenLayoutHeader]}
    >
      <View style={Styles.Container.screenLayout}>
        <MainHeaderView
          LeftButton={{ hide: true }}
          headerText="discover"
          subHeaderText="press_to_refresh"
          rightButton={(
            <ImageButtonView
              onPress={handleSettingsPress}
              styles={[Styles.Button.smallImageButton, Styles.Layout.flexCenter]}
              width={18}
              height={18}
              Icon={SettingsIcon}
            />
              )}
        />
      </View>
      <View>
        <DraggableContainerView
          handleFavoritePress={handleFavoritePress}
          handleLikePress={handleLikePress}
          handleSkipPress={handleSkipPress}
        />
      </View>
    </ScreenLayoutView>
  );
};

export { MatchesScreenPresenter };
