import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SVGImageSourcePropTypes } from '@type/service';
import { Styles } from '@styles/load';

type buttonMatrixViewProps = {
  onNumberButtonPress(n: number): void;
  eraseButton: {
    disabled: boolean;
    onPress(): void;
    icon: SVGImageSourcePropTypes;
  };
};

const StatelessButtonMatrixView: React.FC<buttonMatrixViewProps> = ({ onNumberButtonPress, eraseButton: { onPress, icon, disabled } }) => {
  const handleEraseButtonPress = useCallback(() => {
    onPress && onPress();
  }, [onNumberButtonPress]);

  const handleNumberButtonPress = useCallback((num: number) => {
    onNumberButtonPress && onNumberButtonPress(num);
  }, [onNumberButtonPress]);

  const onRenderNumberView = useCallback((n: number) => {
    return (
      <View style={[Styles.Layout.w33_3pc, Styles.Layout.h60, Styles.Layout.flexCenter]}>
        <TouchableOpacity
          style={[
            Styles.Container.blackBorder1,
            Styles.Layout.flexCenter,
            Styles.Layout.wh70_px,
            Styles.Layout.fullRad,
          ]}
          onPress={() => handleNumberButtonPress(n)}
        >
          <Text style={[Styles.Text.mediumText24Black, Styles.Text.textCenter]}>{n}</Text>
        </TouchableOpacity>
      </View>
    );
  }, [handleNumberButtonPress]);

  return (
    <View
      style={[
        Styles.Layout.flexRow,
        Styles.Layout.wrap,
        Styles.Layout.jc_sb,
        Styles.Layout.ai_fs,
        Styles.Layout.w100,
        Styles.MarginPadding.r_g30,
      ]}
    >
      {onRenderNumberView(7)}
      {onRenderNumberView(8)}
      {onRenderNumberView(9)}
      {onRenderNumberView(4)}
      {onRenderNumberView(5)}
      {onRenderNumberView(6)}
      {onRenderNumberView(3)}
      {onRenderNumberView(2)}
      {onRenderNumberView(1)}
      <View style={[Styles.Layout.h100_px, Styles.Layout.w33_3pc]} />
      {onRenderNumberView(0)}
      <View style={[Styles.Layout.h60, Styles.Layout.w33_3pc, Styles.Layout.flexCenter]}>
        <TouchableOpacity style={[Styles.Layout.wh70_px, Styles.Layout.flexCenter]} onPress={handleEraseButtonPress}>
          {icon}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { StatelessButtonMatrixView };
