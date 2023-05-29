import React, { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Styles } from '@styles/load';

type keyboardAvoidingComponentProps = PropsWithChildren<{

}>
function KeyboardAvoidingComponent<T extends keyboardAvoidingComponentProps>({ children }: T) {
  if (Platform.OS === 'android') {
    return (
      <ScrollView
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[Styles.Layout.grow1]}
        style={Styles.Layout.grow1}
      >
        {children}
      </ScrollView>
    );
  }
  return (
    <KeyboardAvoidingView behavior="position">
      <ScrollView showsVerticalScrollIndicator={false} removeClippedSubviews={false} keyboardShouldPersistTaps="always">
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export { KeyboardAvoidingComponent };
