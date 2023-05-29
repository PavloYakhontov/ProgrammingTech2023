import React, { useCallback, useRef } from 'react';
import { TextInput, View } from 'react-native';
import { Styles } from '@styles/load';
import { colors } from '@utils/colors';
import { CONSTANTS } from '@utils/constants/strings';

type codeNumberInputViewProps = {
  countOfDigits?: number;
  overValue: string;
  onChange?(v: string): void;
  clickable?: boolean;
};
const CodeNumberInputView: React.FC<codeNumberInputViewProps> = ({ countOfDigits, overValue, onChange, clickable }) => {
  const hiddenInputRef = useRef<TextInput>(null);

  const onPressInField = useCallback(() => {
    if (!clickable && hiddenInputRef && hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  }, [hiddenInputRef]);

  return (
    <View style={[Styles.Layout.w100, Styles.MarginPadding.g7, Styles.Layout.flexRow]}>
      <TextInput
        onChangeText={onChange}
        ref={hiddenInputRef}
        value={overValue}
        style={[Styles.Layout.w0, Styles.Layout.h0, Styles.Layout.absolute]}
      />
      {new Array(+countOfDigits!).fill('num_field').map((el, index) => {
        return (
          <View
            onTouchStart={onPressInField}
            key={`${el}_${index}`}
            style={[Styles.Container.animatedInputContainer,
              Styles.Layout.wh65_px,
              overValue.length === index && { borderColor: colors.redE9 }]}
          >
            <TextInput
              editable={false}
              caretHidden
              value={overValue.length >= index ? overValue[index] : ''}
              showSoftInputOnFocus
              pointerEvents="none"
              accessible={false}
              style={[
                Styles.Layout.w100,
                Styles.Layout.h100,
                Styles.Text.mediumText24Black,
                Styles.Text.textCenter]}
            />
          </View>
        );
      })}
    </View>
  );
};

CodeNumberInputView.defaultProps = {
  countOfDigits: 0,
  overValue: '',
  onChange: () => {},
  clickable: true,
};

export { CodeNumberInputView };
