import React, { useCallback } from 'react';
import { GestureResponderEvent, Image, ImageSourcePropType, Insets, TouchableOpacity } from 'react-native';
import { TextView } from '@components/TextView';
import { SVGImageSourcePropTypes } from '@type/service';

type primaryButtonViewProps = {
    text?: string;
    leftIcon?: SVGImageSourcePropTypes;
    rightIcon?: SVGImageSourcePropTypes;
    styles?: {
        outline?: {};
        text?: {};
    }
    onPress?: (event: GestureResponderEvent) => void;
    onLongPress?: (event: GestureResponderEvent) => void;
    activeOpacity?: number;
    delayLongPress?: number;
    hitSlop?: Insets;
    numberOfLines?: number;
    vars?: {[key: string]: string};
    disabled?: boolean;
};

const PrimaryButtonView: React.FC<primaryButtonViewProps> = ({
  delayLongPress,
  onLongPress,
  onPress,
  hitSlop,
  activeOpacity,
  styles,
  text,
  numberOfLines,
  leftIcon,
  vars,
  rightIcon,
  disabled,
}) => {
  const handleOnPress = useCallback((event: GestureResponderEvent) => {
    onPress && onPress(event);
  }, [onPress]);

  const handleOnLongPress = useCallback((event: GestureResponderEvent) => {
    onLongPress && onLongPress(event);
  }, [onLongPress]);

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={activeOpacity}
      onPress={handleOnPress}
      onLongPress={handleOnLongPress}
      hitSlop={hitSlop}
      delayLongPress={delayLongPress}
      style={styles?.outline}
    >
      {leftIcon || null}
      {text && <TextView vars={vars} text={text} styles={styles?.text} numberOfLines={numberOfLines} />}
      {rightIcon || null}
    </TouchableOpacity>
  );
};

export { PrimaryButtonView };
