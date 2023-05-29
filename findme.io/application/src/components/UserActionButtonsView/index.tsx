import { ImageButtonView } from '@components/ImageButtonView';
import { Styles } from '@src/styles/load';
import React from 'react';
import { View } from 'react-native';
import PassIcon from '@assets/svg/close-small.svg';
import HeartIcon from '@assets/svg/like.svg';
import StarIcon from '@assets/svg/star.svg';
import { colors } from '@utils/colors';

type userActionButtonsViewProps = {
  handleLikePress(): void;
  handleSkipPress(): void;
  handleFavoritePress(): void;
};

const UserActionButtonsView: React.FC<userActionButtonsViewProps> = ({ handleFavoritePress, handleLikePress, handleSkipPress }) => {
  return (
    <View style={[Styles.MarginPadding.pt20, Styles.Layout.flexRow, Styles.Layout.ai_c, Styles.Layout.jc_sb]}>
      <ImageButtonView
        onPress={handleSkipPress}
        styles={[Styles.Button.smallRoundedCenterButton, Styles.Layout.flexCenter, Styles.Container.whiteFFBackgroundColor, Styles.Container.grayBorder1]}
        width={30}
        color={colors.orangeF2}
        height={30}
        Icon={PassIcon}
      />
      <ImageButtonView
        onPress={handleLikePress}
        styles={[Styles.Button.bigRoundedCenterButton, Styles.Layout.flexCenter, Styles.Container.redE9BackgroundColor]}
        width={51}
        height={51}
        Icon={HeartIcon}
      />
      <ImageButtonView
        onPress={handleFavoritePress}
        styles={[Styles.Button.smallRoundedCenterButton, Styles.Layout.flexCenter, Styles.Container.whiteFFBackgroundColor, Styles.Container.grayBorder1]}
        width={30}
        height={30}
        Icon={StarIcon}
      />
    </View>
  );
};

export { UserActionButtonsView };
