import React, { useCallback, useState } from "react";
import { ImageSourcePropType, TextInput, View } from 'react-native';
import { Styles } from '@styles/load';

type textInputViewProps = {
  leftIcon: any;
  rightIcon: any;
  placeholder: string;
  onChange: (v: string) => void;
  mLength: number;
  styles?: {
    outline?: {};
    input?: {};
  };
  autoCapitalize?: 'none' | 'sentences' | 'words';
  editable?: boolean;
  onFocus?(): void;
  onBlur?(): void;
  placeholderColor?: string;
  activeOpacity?: number;
  debounced?: boolean;
  multiline?: boolean;
  returnKeyLabel?: string;
};

type textInputViewState = {
  searchValue: string;
};
const TextInputView: React.FC<textInputViewProps> = ({
  autoCapitalize,
  debounced,
  editable,
  onBlur,
  placeholderColor,
  onFocus,
  activeOpacity,
  styles,
  mLength,
  leftIcon,
  rightIcon,
  placeholder,
  onChange,
  multiline,
  returnKeyLabel }) => {
  const [getState, setState] = useState<textInputViewState>({
    searchValue: '',
  });
  let timer: null | any = null;

  const handleOnChange = useCallback((value: string) => {
    setState({ ...getState, searchValue: value });
    if (debounced) {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
      timer = setTimeout(async () => {
        onChange && onChange(value);
      }, 300);
    } else {
      onChange && onChange(value);
    }
  }, [getState, setState, onChange, timer, debounced]);

  return (
    <View style={[Styles.Layout.flexRow, Styles.Layout.ai_c, styles?.outline]}>
      {leftIcon}
      <TextInput
        style={styles?.input}
        onChangeText={handleOnChange}
        placeholder={placeholder}
        maxLength={mLength}
        multiline={multiline}
        returnKeyLabel={returnKeyLabel}
        autoCapitalize={autoCapitalize}
        editable={editable}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholderTextColor={placeholderColor}
        value={getState.searchValue}
      />
      {rightIcon}
    </View>
  );
};

export { TextInputView };
