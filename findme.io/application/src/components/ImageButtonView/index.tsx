import React from 'react';
import { GestureResponderEvent, Insets, TouchableOpacity } from 'react-native';

type imageButtonViewProps = {
  Icon?: any;
  styles?: {};
  width?: number;
  height?: number;
  activeOpacity?: number;
  color?: string;
  hitSlop?: Insets;
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}

const ImageButtonView: React.FC<imageButtonViewProps> = ({
  height,
  onLongPress,
  disabled,
  width,
  color,
  activeOpacity,
  hitSlop,
  Icon,
  onPress,
  styles }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={activeOpacity}
      onPress={onPress}
      onLongPress={onLongPress}
      hitSlop={hitSlop}
      style={styles}
    >
      <Icon width={width} height={height} color={color} />
    </TouchableOpacity>
  );
};

export { ImageButtonView };
