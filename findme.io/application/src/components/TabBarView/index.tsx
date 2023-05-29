import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';
import { Styles } from '@styles/load';
import { DEVICE_WIDTH } from '@utils/scaling';
import { useScrollable } from '@reacts/hooks/useScrollable';
import TabLabelListView from './TabLabelListView';

type tabBarViewProps = {
    labelList: ReadonlyArray<string>;
    componentList: ReadonlyArray<JSX.Element>;
    defaultIndex: number;
    containerStyles?: {};
    buttonStyles?: {};
    containerButtonStyles?: {};
    buttonTextStyles?: {};
};

const TabBarView: React.FC<tabBarViewProps> = ({
  componentList,
  defaultIndex,
  labelList,
  buttonStyles,
  containerButtonStyles,
  buttonTextStyles,
  containerStyles }) => {
  const { scrollableRef, handleOnScroll, handleButtonScroll, getActiveIndex } = useScrollable<ScrollView>('x', DEVICE_WIDTH, defaultIndex, 'scrollview');

  useEffect(() => {
    if (labelList.length !== componentList.length) {
      Alert.alert('Warning', 'Length of items in list and labels are not equal');
    }
  }, []);

  return (
    <View style={containerStyles}>
      <TabLabelListView
        activeIndex={getActiveIndex}
        setActiveIndex={handleButtonScroll}
        labels={labelList}
        buttonStyle={buttonStyles}
        containerStyle={containerButtonStyles}
        buttonTextStyles={buttonTextStyles}
      />
      <ScrollView
        ref={scrollableRef}
        onScroll={handleOnScroll}
        horizontal
        pagingEnabled
      >
        {componentList.map((component) => {
          return (
            <View style={[Styles.Container.fullScreenBody]}>
              {component}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default memo(TabBarView);
