import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { DEVICE_WIDTH } from '@utils/scaling';

type parallaxScrollViewProps = PropsWithChildren<{
  parallaxedHeader: JSX.Element;
  headerHeight: number;
  velocity: number;
}>;

const ParallaxScrollView: React.FC<parallaxScrollViewProps> = ({ children, headerHeight, parallaxedHeader, velocity }) => {
  return (
    <View>
      <View style={{ width: DEVICE_WIDTH, height: headerHeight }}>
        {parallaxedHeader || null}
      </View>
      <ScrollView />
    </View>
  );
};

export { ParallaxScrollView };
