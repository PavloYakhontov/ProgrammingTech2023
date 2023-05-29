import React from 'react';
import { StatusBar, View } from 'react-native';
import { colors } from '@utils/colors';

type findStatusBarProps = {};
const FindStatusBar: React.FC<findStatusBarProps> = ({}) => {
  return (
    <View style={[]}>
      <StatusBar
        backgroundColor={colors.whiteFF}
        barStyle="dark-content"
        animated
        translucent
        networkActivityIndicatorVisible
      />
    </View>
  );
};

export { FindStatusBar };
