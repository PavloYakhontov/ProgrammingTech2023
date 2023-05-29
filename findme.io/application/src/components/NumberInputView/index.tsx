import React from 'react';
import PhoneInput from 'react-native-phone-number-input';
import { Styles } from '@styles/load';

type numberInputViewProps = {
  value: string;
  onChange(v: string): void;
  disabled: boolean;
  isError?: boolean;
};
const NumberInputView: React.FC<numberInputViewProps> = ({ onChange, value, disabled, isError }) => {
  return (
    <PhoneInput
      textContainerStyle={Styles.Layout.whiteFF_bg}
      codeTextStyle={[Styles.Text.smallText14Black, Styles.Layout.whiteFF_bg]}
      textInputStyle={[Styles.Text.smallText14Black, Styles.Layout.whiteFF_bg]}
      containerStyle={[Styles.Container.animatedInputContainer, { height: void 0 }, Styles.Layout.w100, isError ? Styles.Container.redBorder1 : {}]}
      disabled={disabled}
      defaultCode="UA"
      value={value}
      onChangeFormattedText={onChange}
    />
  );
};

export { NumberInputView };
