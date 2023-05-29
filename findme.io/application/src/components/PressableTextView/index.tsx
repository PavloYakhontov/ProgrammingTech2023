import React, { useCallback } from 'react';
import { GestureResponderEvent, Insets, Pressable, Text, TouchableOpacity } from 'react-native';
import { TextView } from '@components/TextView';
import i18next from '@src/locale/i18next';

type pressableTextViewProps = {
    text: string;
    color?: string;
    styles?: {};
    hitSlop?: Insets;
    onPress?: (event: GestureResponderEvent) => void;
    numberOfLines?: number;
};
const PressableTextView: React.FC<pressableTextViewProps> = ({ hitSlop, text, styles, color, onPress, numberOfLines }) => {
  const handleOnPress = useCallback((event: GestureResponderEvent) => {
    onPress && onPress(event);
  }, [onPress]);

  return (
    <Text onPress={handleOnPress} numberOfLines={numberOfLines} style={styles}>
      {i18next.t(text)}
    </Text>
  );
};

export { PressableTextView };
