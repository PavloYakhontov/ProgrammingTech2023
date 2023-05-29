import React, { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Styles } from '@styles/load';
import { KeyboardAvoidingComponent } from '@components/common/hoc/KeyboardAvoidingView';
import { colors } from '@utils/colors';
import { View } from 'react-native';

type screenLayoutViewProps = PropsWithChildren<{
    backgroundColor?: string;
    hasKeyboardAvoiding?: boolean;
    header?: JSX.Element
    styles?: {};
    useKeyboardAvoid?: boolean;
}>
const ScreenLayoutView: React.FC<screenLayoutViewProps> = ({ children, backgroundColor, hasKeyboardAvoiding, styles, header, useKeyboardAvoid }) => {
  return (
    <SafeAreaView style={[Styles.Layout.flex1, { backgroundColor }, styles]}>
      {useKeyboardAvoid ? (
        <KeyboardAvoidingComponent>
          {header}
          {
          hasKeyboardAvoiding ?
            children : children
        }
        </KeyboardAvoidingComponent>
      ) : (
        <React.Fragment>
          {header}
          {children}
        </React.Fragment>
      )}
    </SafeAreaView>
  );
};

ScreenLayoutView.defaultProps = {
  backgroundColor: colors.whiteFF,
};

export { ScreenLayoutView };
