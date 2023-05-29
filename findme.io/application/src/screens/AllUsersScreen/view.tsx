import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

import { ScreenLayoutView } from '@components/common/hoc/ScreenLayout';
import SettingsIcon from '@assets/svg/settings.svg';
import { ImageButtonView } from '@components/ImageButtonView';
import { MainHeaderView } from '@src/core/Headers/MainHeader';
import { Styles } from '@src/styles/load';
import { colors } from '@utils/colors';
import { user_short } from '@utils/__remove__/mocks/usermodel';
import { DEVICE_WIDTH } from '@utils/scaling';
import NearbyItemView from '@components/list-items/NearbyItemView';

export type allUsersScreenPresenterProps = {
  handleSettingsPress(): void;
  isRefreshing: boolean;
  onRefresh(): void;
};

const AllUsersScreenPresenter: React.FC<allUsersScreenPresenterProps> = ({ handleSettingsPress, isRefreshing, onRefresh }) => {
  return (
    <ScreenLayoutView
      useKeyboardAvoid={false}
      backgroundColor={colors.whiteFF}
      styles={[Styles.Container.serviceScreenLayoutHeader]}
    >
      <View style={Styles.Container.screenLayout}>
        <MainHeaderView
          LeftButton={{ hide: true }}
          headerText="nearby"
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
      <View style={[Styles.MarginPadding.pt20]}>
        <FlatList
          style={[Styles.Layout.h100]}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
          contentContainerStyle={[Styles.MarginPadding.g20]}
          keyExtractor={(item) => item.user_hash}
          data={user_short}
          numColumns={3}
          renderItem={({ item, index }) => {
            return (
              <View style={{ width: DEVICE_WIDTH / 3 }}>
                <NearbyItemView
                  model={item}
                />
              </View>
            );
          }}
        />
      </View>
    </ScreenLayoutView>
  );
};

export { AllUsersScreenPresenter };

//      <Button title="calc" onPress={() => console.log(__app__.geo.calculateKilometers({ x: 48.612962, y: 22.307024 }, { x: 48.639202, y: 22.313950 }))} />
