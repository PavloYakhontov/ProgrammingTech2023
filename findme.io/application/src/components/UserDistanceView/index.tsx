import React from 'react';
import { Text, View } from 'react-native';
import { hDP, wDP } from '@utils/scaling';
import MapPin from '@assets/svg/map-pin.svg';
import { Styles } from '@styles/load';

type userDistanceViewProps = {
    distance: string;
};

const UserDistanceView: React.FC<userDistanceViewProps> = ({ distance }) => {
  return (
    <View
      style={[
        Styles.Container.pinContainer,
        Styles.Container.grayBorderContainer,
        Styles.Layout.flexRow,
        Styles.MarginPadding.g2]}
    >
      <MapPin width={14} height={14} />
      <Text style={[Styles.Text.smallBoldWhite12]}>
        {distance}
      </Text>
    </View>
  );
};

export { UserDistanceView };
