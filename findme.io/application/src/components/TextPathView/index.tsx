import React, { memo, useCallback } from 'react';
import { Text, TouchableOpacity } from 'react-native';

type textPathViewProps<T> = {
    text: string;
    val: T;
    containerStyle?: {};
    textStyle?: {};
    onPress(val: T): void;
};

const TextPathView = <T extends object>({ containerStyle, textStyle, text, val, onPress }: textPathViewProps<T>) => {
  const handleOnPress = useCallback(() => {
    onPress && onPress(val);
  }, [onPress, val]);

  return (
    <TouchableOpacity onPress={handleOnPress} style={containerStyle}>
      <Text numberOfLines={1} style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default memo(TextPathView) as typeof TextPathView;
