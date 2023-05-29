import React, { memo } from 'react';
import { Animated, View } from 'react-native';
import { Styles } from '@styles/load';
import { TextView } from '@components/TextView';

type animatedHeaderViewProps = {
    animationValue: Animated.Value;
    inputValue: Array<number>;
    outputValue: Array<number>;
};

const AnimatedHeaderView: React.FC<animatedHeaderViewProps> = ({ animationValue, inputValue, outputValue }) => {
  return (
    <Animated.View
      style={[
        { opacity: animationValue.interpolate({
          inputRange: inputValue,
          outputRange: outputValue,
        }) },
        Styles.Layout.flexCenter,
        Styles.Layout.absolute,
        Styles.Layout.zIndex10,
        Styles.Layout.w100,
      ]}
    >
      <View
        style={[Styles.MarginPadding.pv10, Styles.Layout.w100, Styles.Container.whiteFFBackgroundColor]}
      >
        <TextView styles={[Styles.Text.mediumText24Black, Styles.Text.textCenter]} text="my_profile" />
        <TextView styles={[Styles.Text.smallText12_40Black, Styles.Text.textCenter]} text="Evgeniy Kokaiko" />
      </View>
    </Animated.View>
  );
};

export default memo(AnimatedHeaderView);
