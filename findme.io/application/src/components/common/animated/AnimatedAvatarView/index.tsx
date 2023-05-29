import { TextView } from '@components/TextView';
import React, { memo } from 'react';
import { Styles } from '@styles/load';
import { Animated, View } from 'react-native';
import { DEVICE_WIDTH, hDP } from '@utils/scaling';

type animatedAvatarViewProps = {
    animationValue: Animated.Value;
    inputValue: Array<number>;
    outputValue: Array<number>;
};

const AnimatedAvatarView: React.FC<animatedAvatarViewProps> = ({ animationValue, outputValue, inputValue }) => {
  return (
    <View style={{ backgroundColor: '#000000' }}>
      <Animated.Image
        style={{ width: DEVICE_WIDTH,
          height: hDP(415),
          resizeMode: 'cover',
          opacity: animationValue.interpolate({
            inputRange: inputValue,
            outputRange: outputValue,
            extrapolate: 'clamp',
          }) }}
        source={require('@assets/img/photo.png')}
      />
    </View>
  );
};

export default memo(AnimatedAvatarView);
