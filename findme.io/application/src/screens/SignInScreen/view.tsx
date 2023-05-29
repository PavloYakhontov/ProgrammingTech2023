import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { ScreenLayoutView } from '@components/common/hoc/ScreenLayout';
import { colors } from '@utils/colors';
import { TextView } from '@components/TextView';
import { Styles } from '@styles/load';
import { AnimatedTextInputView } from '@components/AnimatedTextInputView';
import { PrimaryButtonView } from '@components/PrimaryButtonView';
import { MainHeaderView } from '@core/Headers/MainHeader';
import { FormadjoAsyncSubmitFn, FormadjoForm } from '@core/Validators/FormadjoForm';
import { ILoginFormTemplate, loginFormTemplate } from '@utils/forms';
import { wDP } from '@utils/scaling';

export type signInScreenPresenterProps = {
  OnFormSubmit: FormadjoAsyncSubmitFn<ILoginFormTemplate>;
  loading: boolean;
};

const SignInScreenPresenter: React.FC<signInScreenPresenterProps> = ({ OnFormSubmit, loading }) => {
  return (
    <ScreenLayoutView backgroundColor={colors.whiteFF} styles={[Styles.Container.screenLayout, Styles.Container.serviceScreenLayoutHeader]}>
      <MainHeaderView />
      <FormadjoForm<ILoginFormTemplate>
        removeErrorOnChange
        form={loginFormTemplate}
        onFinishSubmit={OnFormSubmit}
        initialProps={{ login: '', password: '' }}
      >
        {
          ({
            values,
            onSubmit,
            updateFormState,
            errorsList: { login, password },
          }) => {
            return (
              <React.Fragment>
                <View style={[Styles.MarginPadding.mt32]}>
                  <TextView text="sign_in" styles={Styles.Text.bigBoldBlack34} />
                  <TextView text="sign_in_msg" styles={Styles.Text.smallText14Black} />
                </View>
                <View style={Styles.MarginPadding.mt40}>
                  <AnimatedTextInputView
                    isError={login.isError}
                    placeholderColor={colors.black00_40}
                    placeholder="login"
                    onChange={(v) => updateFormState('login', v)}
                    styles={{
                      error: [Styles.Container.redBorder1],
                      outline: Styles.Container.animatedInputContainer,
                      input: [Styles.Input.animatedInputText, Styles.Text.smallText13Black],
                    }}
                  />
                  {login.isError && <Text style={[Styles.Text.smallTextRedBold14, Styles.MarginPadding.ml5, Styles.MarginPadding.mt5]}>{login.errorMessage}</Text>}
                  <AnimatedTextInputView
                    isError={password.isError}
                    placeholderColor={colors.black00_40}
                    placeholder="password"
                    onChange={(v) => updateFormState('password', v)}
                    styles={{
                      error: [Styles.Container.redBorder1],
                      outline: [Styles.Container.animatedInputContainer, Styles.MarginPadding.mt10],
                      input: [Styles.Input.animatedInputText, Styles.Text.smallText13Black],
                    }}
                  />
                  {password.isError && <Text style={[Styles.Text.smallTextRedBold14, Styles.MarginPadding.ml5, Styles.MarginPadding.mt5]}>{password.errorMessage}</Text>}
                </View>
                <View style={Styles.MarginPadding.mt18pc}>
                  <PrimaryButtonView
                    styles={{ outline: Styles.Button.primaryButton, text: Styles.Text.primaryButtonText }}
                    text="log_in"
                    onPress={onSubmit}
                  />
                  <View style={[Styles.Layout.w100, Styles.Layout.flexRow, Styles.Layout.jc_c, Styles.MarginPadding.mt32]}>
                    {loading ?
                      <ActivityIndicator color={colors.redE9} size={wDP(30)} />
                      :
                      null}
                  </View>
                </View>
              </React.Fragment>
            );
          }
          }
      </FormadjoForm>
    </ScreenLayoutView>
  );
};

export { SignInScreenPresenter };
