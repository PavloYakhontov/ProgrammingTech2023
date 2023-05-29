import { IUserDiscoverModelShort } from '@type/models/user';
import React, { memo } from 'react';
import { Image, Text, View } from 'react-native';
import { Styles } from '@styles/load';

type nearbyItemViewProps = {
  model: IUserDiscoverModelShort;
};

const NearbyItemView: React.FC<nearbyItemViewProps> = ({ model }) => {
  return (
    <View style={[Styles.Layout.flexCol, Styles.Layout.jc_sb, Styles.Layout.ai_c]}>
      <View style={[Styles.Layout.wh85_px, Styles.Container.roundAvatar]}>
        <Image
          style={[Styles.Layout.w100,
            Styles.Layout.h100,
            Styles.Layout.fullRad,
            Styles.Container.whiteBorder2]}
          source={{ uri: 'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp' }}
        />
      </View>
      <View style={Styles.MarginPadding.pt8}>
        <Text style={[Styles.Text.smallText12Black, Styles.Text.textCenter]}>
          {model.full_name}
          {'\n'}
          {model.age}
        </Text>
      </View>
    </View>
  );
};

export default memo(NearbyItemView);
