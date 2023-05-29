import React, { memo, useCallback } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Styles } from '@styles/load';

type tabLabelListViewProps = {
    labels: ReadonlyArray<string>;
    setActiveIndex(n: number): void;
    activeIndex: number;
    buttonStyle?: {};
    containerStyle?: {};
    buttonTextStyles?: {};
};

const TabLabelListView: React.FC<tabLabelListViewProps> = ({
  activeIndex,
  labels,
  setActiveIndex,
  buttonStyle,
  containerStyle,
  buttonTextStyles,
}) => {
  const handleSetActive = useCallback(async (index: number) => {
    setActiveIndex && setActiveIndex(index);
  }, [setActiveIndex]);

  return (
    <View style={[Styles.Layout.w100]}>
      <ScrollView
        contentContainerStyle={containerStyle}
        horizontal
        scrollEnabled
        pagingEnabled={false}
      >
        {
        labels.map((el, index) => {
          return (
            <TouchableOpacity style={[buttonStyle, activeIndex === index ? Styles.Container.borderRedBottom : {}]} onPress={() => handleSetActive(index)}>
              <Text style={buttonTextStyles}>{el}</Text>
            </TouchableOpacity>
          );
        })
            }
      </ScrollView>
    </View>
  );
};

export default memo(TabLabelListView);
