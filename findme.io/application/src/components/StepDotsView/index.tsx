import React from 'react';
import { View } from 'react-native';
import { Styles } from '@styles/load';

type stepDotsViewProps = {
    count: number;
    activeIndex: number;
};

const StepDotsView: React.FC<stepDotsViewProps> = ({ activeIndex, count }) => {
  return (
    <View
      style={[
        Styles.Container.stepContainer,
        Styles.Container.grayBorderContainer,
        Styles.MarginPadding.g7]}
    >
      {
        new Array(count || 0).fill(0).map((el, index) => {
          return (
            <View
              style={[
                Styles.Container.stepItem,
                activeIndex === index ? Styles.Container.whiteFFBackgroundColor : {}]}
            />
          );
        })
      }
    </View>
  );
};

export { StepDotsView };
