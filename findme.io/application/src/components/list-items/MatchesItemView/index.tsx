import React, { useCallback } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { IUserDiscoverModelShort, IUserDiscoverType } from '@type/models/user';
import { ImageButtonView } from '@components/ImageButtonView';
import { Styles } from '@styles/load';

import XMarkIcon from '@assets/svg/close-small.svg';
import HeartIcon from '@assets/svg/like.svg';
import { colors } from '@utils/colors';

type matchesItemViewProps = {
  model: IUserDiscoverModelShort;
  type: IUserDiscoverType;
};

const MatchesItemView: React.FC<matchesItemViewProps> = ({ model, type }) => {
  const onRemovePress = useCallback(() => {}, []);
  const onLikePress = useCallback(() => {}, []);
  return (
    <TouchableOpacity style={Styles.Container.matchesCardBody}>
      <Image style={[Styles.Layout.wh100_pc]} source={require('@assets/img/girl1.png')} />
      <View style={[Styles.Layout.absolute_bottom]}>
        <Text style={[Styles.Layout.flexRow, Styles.Text.primaryButtonText, Styles.MarginPadding.pb4, Styles.MarginPadding.pl16]}>
          <Text numberOfLines={1} style={[]}>
            {model.full_name}
            ,
            {' '}
          </Text>
          <Text style={[]}>{model.age}</Text>
        </Text>
        <View style={[Styles.Container.matchesCardActions, Styles.Layout.flexRow, Styles.Layout.ai_c, type !== 'incoming' ? [Styles.Layout.w100, Styles.Layout.flexCenter] : {}]}>
          <ImageButtonView
            color={colors.whiteFF}
            onPress={onRemovePress}
            styles={[Styles.Button.matchesActions, Styles.Layout.flexCenter, type === 'incoming' ? [Styles.Layout.w100] : {}]}
            width={24}
            height={24}
            Icon={XMarkIcon}
          />
          <View />
          {type !== 'incoming' ? (
            <ImageButtonView
              color={colors.whiteFF}
              onPress={onLikePress}
              styles={[Styles.Button.matchesActions, Styles.Layout.flexCenter]}
              width={24}
              height={24}
              Icon={HeartIcon}
            />
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export { MatchesItemView };
