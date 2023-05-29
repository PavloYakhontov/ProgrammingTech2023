import React from 'react';
import { View } from 'react-native';
import { Styles } from '@styles/load';

type lineViewProps = {
  height: number;
  width?: string | number;
  paddingTop?: number | string;
};
const LineView: React.FC<lineViewProps> = ({ height, width, paddingTop }) => {
  return (
    <View style={[Styles.Container.line, { height, width, marginTop: paddingTop }]} />
  );
};

export { LineView };
