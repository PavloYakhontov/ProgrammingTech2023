import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { ScreenLayoutView } from '@components/common/hoc/ScreenLayout';
import { colors } from '@utils/colors';
import { Styles } from '@styles/load';
import { MainHeaderView } from '@core/Headers/MainHeader';
import { TextView } from '@components/TextView';
import { AnimatedTextInputView } from '@components/AnimatedTextInputView';
import { SelectBirthdayView } from '@components/SelectBirthdayView';
import { FormadjoAsyncSubmitFn, FormadjoForm, FormadjoSubmitFn } from '@core/Validators/FormadjoForm';
import {
  IBasicInformationFormTemplate,
  ILocationFormTemplate,
  IPersonalInformationFormTemplate, basicInformationFormTemplate, locationFormTemplate, personalInformationFormTemplate,
} from '@utils/forms';
import { wDP } from '@utils/scaling';
import { ImageButtonView } from '@components/ImageButtonView';
import RightArrowIcon from '@assets/svg/rightArrow.svg';
import { PrimaryButtonView } from '@components/PrimaryButtonView';
import {
  IUserRegisterSlice,
} from '@type/models/user';

export type setupProfileScreenPresenterProps = {
  onInitialSetupPress: FormadjoAsyncSubmitFn<IBasicInformationFormTemplate>;
  onUserSetupPress:FormadjoSubmitFn<IPersonalInformationFormTemplate>;
  onFinish:FormadjoSubmitFn<ILocationFormTemplate>;
  scrollRef: React.RefObject<ScrollView>;
  onGoBack(): void;
  state: IUserRegisterSlice;
  loading: boolean;
};

const SetupProfileScreenPresenter: React.FC<setupProfileScreenPresenterProps> = ({
  onInitialSetupPress,
  onFinish,
  onUserSetupPress,
  scrollRef,
  onGoBack,
  state,
  loading,
}) => {
  return (
    <ScreenLayoutView
      backgroundColor={colors.whiteFF}
      styles={[Styles.Container.serviceScreenLayoutHeader]}
    >
      <View style={[Styles.Container.screenLayout]}>
        <MainHeaderView
          headerText="configure"
          subHeaderText="account"
          LeftButton={{ onOverrideGoBack: onGoBack }}
        />
      </View>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        scrollEnabled={false}
      >
        {/* BASIC INFORMATION */}
        <FormadjoForm<IBasicInformationFormTemplate>
          removeErrorOnChange
          initialProps={{ email: '', password: '', rePassword: '' }}
          onFinishSubmit={onInitialSetupPress}
          form={basicInformationFormTemplate}
        >
          {({ values,
            updateFormState,
            updateManyFormState,
            onSubmit,
            errorsList: { email, rePassword, password },
          }) => {
            return (
              <View style={[Styles.Container.screenLayout, Styles.MarginPadding.mt50, Styles.Layout.w_device]}>
                <View style={[Styles.MarginPadding.ml8]}>
                  <TextView text="basic_info" styles={Styles.Text.smallTextBold18} />
                </View>
                <AnimatedTextInputView
                  defaultValue={values.email}
                  autoComplete="email"
                  isError={email.isError}
                  placeholderColor={colors.black00_40}
                  placeholder="Email"
                  onChange={(v) => updateFormState('email', v.trim())}
                  styles={{
                    error: [Styles.Container.redBorder1],
                    outline: [Styles.Container.animatedInputContainer, Styles.MarginPadding.mt10],
                    input: [Styles.Input.animatedInputText, Styles.Text.smallText13Black] }}
                />
                {email.isError && <Text style={[Styles.Text.smallTextRedBold14, Styles.MarginPadding.ml5, Styles.MarginPadding.mt5]}>{email.errorMessage}</Text>}
                <AnimatedTextInputView
                  isError={password.isError}
                  placeholderColor={colors.black00_40}
                  placeholder="Password"
                  onChange={(v) => updateFormState('password', v.trim())}
                  styles={{
                    error: [Styles.Container.redBorder1],
                    outline: [Styles.Container.animatedInputContainer, Styles.MarginPadding.mt10],
                    input: [Styles.Input.animatedInputText, Styles.Text.smallText13Black] }}
                />
                {password.isError && <Text style={[Styles.Text.smallTextRedBold14, Styles.MarginPadding.ml5, Styles.MarginPadding.mt5]}>{password.errorMessage}</Text>}
                <AnimatedTextInputView
                  isError={rePassword.isError}
                  placeholderColor={colors.black00_40}
                  placeholder="Re-Password"
                  onChange={(v) => updateFormState('rePassword', v.trim())}
                  styles={{
                    error: [Styles.Container.redBorder1],
                    outline: [Styles.Container.animatedInputContainer, Styles.MarginPadding.mt10],
                    input: [Styles.Input.animatedInputText, Styles.Text.smallText13Black] }}
                />
                {rePassword.isError && <Text style={[Styles.Text.smallTextRedBold14, Styles.MarginPadding.ml5, Styles.MarginPadding.mt5]}>{rePassword.errorMessage}</Text>}
                <View style={[Styles.Layout.w100, Styles.Layout.flexRow, Styles.Layout.jc_fe, Styles.MarginPadding.mt30pc]}>
                  <ImageButtonView
                    onPress={onSubmit}
                    styles={[
                      Styles.Container.redBorder3,
                      Styles.Layout.wh65_px,
                      Styles.Layout.fullRad,
                      Styles.Layout.flexCenter,
                    ]}
                    width={wDP(25)}
                    height={wDP(25)}
                    Icon={RightArrowIcon}
                  />
                </View>
              </View>
            );
          }}
        </FormadjoForm>

        {/* ADVANCED INFORMATION */}
        <FormadjoForm<IPersonalInformationFormTemplate>
          initialProps={{ firstName: '', lastName: '', birthday: Date.now(), details: '' }}
          onFinishSubmit={onUserSetupPress}
          form={personalInformationFormTemplate}
        >
          {({ values,
            updateFormState,
            updateManyFormState,
            onSubmit,
            errorsList: { details, birthday, lastName, firstName },
          }) => {
            return (
              <View style={[Styles.Container.screenLayout, Styles.Layout.w_device]}>
                <View style={Styles.MarginPadding.mt50}>
                  <View style={[Styles.MarginPadding.ml8]}>
                    <TextView text="some_info_about_you" styles={Styles.Text.smallTextBold18} />
                  </View>
                  <AnimatedTextInputView
                    placeholderColor={colors.black00_40}
                    placeholder="First Name"
                    isError={firstName.isError}
                    onChange={(v) => updateFormState('firstName', v.trim())}
                    styles={{
                      error: [Styles.Container.redBorder1],
                      outline: [Styles.Container.animatedInputContainer, Styles.MarginPadding.mt10],
                      input: [Styles.Input.animatedInputText, Styles.Text.smallText13Black] }}
                  />
                  {firstName.isError && <Text style={[Styles.Text.smallTextRedBold14, Styles.MarginPadding.ml5, Styles.MarginPadding.mt5]}>{firstName.errorMessage}</Text>}
                  <AnimatedTextInputView
                    placeholderColor={colors.black00_40}
                    placeholder="Last Name"
                    isError={lastName.isError}
                    onChange={(v) => updateFormState('lastName', v.trim())}
                    styles={{
                      error: [Styles.Container.redBorder1],
                      outline: [Styles.Container.animatedInputContainer, Styles.MarginPadding.mt10],
                      input: [Styles.Input.animatedInputText, Styles.Text.smallText13Black] }}
                  />
                  {lastName.isError && <Text style={[Styles.Text.smallTextRedBold14, Styles.MarginPadding.ml5, Styles.MarginPadding.mt5]}>{lastName.errorMessage}</Text>}
                  <AnimatedTextInputView
                    multiline
                    placeholderColor={colors.black00_40}
                    placeholder="Provide some details about you"
                    isError={details.isError}
                    onChange={(v) => updateFormState('details', v.trim())}
                    styles={{
                      error: [Styles.Container.redBorder1],
                      outline: [Styles.Container.animatedInputContainer, Styles.MarginPadding.mt10],
                      input: [Styles.Input.animatedInputText, Styles.Text.smallText13Black] }}
                  />
                  {details.isError && <Text style={[Styles.Text.smallTextRedBold14, Styles.MarginPadding.ml5, Styles.MarginPadding.mt5]}>{details.errorMessage}</Text>}
                </View>
                <View style={[Styles.MarginPadding.mt10]}>
                  <SelectBirthdayView
                    value={values.birthday}
                    setSelectedDate={(v) => updateFormState('birthday', v)}
                  />
                </View>
                <View style={[Styles.Layout.w100, Styles.Layout.flexRow, Styles.Layout.jc_fe, Styles.MarginPadding.mt30pc]}>
                  <ImageButtonView
                    onPress={onSubmit}
                    styles={[
                      Styles.Container.redBorder3,
                      Styles.Layout.wh65_px,
                      Styles.Layout.fullRad,
                      Styles.Layout.flexCenter,
                    ]}
                    width={wDP(25)}
                    height={wDP(25)}
                    Icon={RightArrowIcon}
                  />
                </View>
              </View>
            );
          }}
        </FormadjoForm>
        <FormadjoForm<ILocationFormTemplate>
          initialProps={{ city: '', country: '' }}
          onFinishSubmit={onFinish}
          form={locationFormTemplate}
        >
          {({ values,
            updateFormState,
            updateManyFormState,
            onSubmit,
            errorsList: { city, country },
          }) => {
            return (
              <View style={[Styles.Container.screenLayout, Styles.Layout.w_device]}>
                <View style={Styles.MarginPadding.mt50}>
                  <View style={[Styles.MarginPadding.ml8]}>
                    <TextView text="your_location" styles={Styles.Text.smallTextBold18} />
                  </View>
                </View>
                <AnimatedTextInputView
                  defaultValue={values.country}
                  autoComplete="postal-address-country"
                  isError={country.isError}
                  placeholderColor={colors.black00_40}
                  placeholder="Country"
                  onChange={(v) => updateFormState('country', v.trim())}
                  styles={{
                    error: [Styles.Container.redBorder1],
                    outline: [Styles.Container.animatedInputContainer, Styles.MarginPadding.mt10],
                    input: [Styles.Input.animatedInputText, Styles.Text.smallText13Black] }}
                />
                {country.isError && <Text style={[Styles.Text.smallTextRedBold14, Styles.MarginPadding.ml5, Styles.MarginPadding.mt5]}>{country.errorMessage}</Text>}
                <AnimatedTextInputView
                  isError={city.isError}
                  placeholderColor={colors.black00_40}
                  placeholder="City"
                  onChange={(v) => updateFormState('city', v.trim())}
                  styles={{
                    error: [Styles.Container.redBorder1],
                    outline: [Styles.Container.animatedInputContainer, Styles.MarginPadding.mt10],
                    input: [Styles.Input.animatedInputText, Styles.Text.smallText13Black] }}
                />
                {city.isError && <Text style={[Styles.Text.smallTextRedBold14, Styles.MarginPadding.ml5, Styles.MarginPadding.mt5]}>{city.errorMessage}</Text>}
                <View style={[Styles.Layout.w100, Styles.Layout.flexRow, Styles.Layout.jc_c, Styles.MarginPadding.mt30pc]}>
                  <PrimaryButtonView
                    onPress={onSubmit}
                    styles={{ outline: Styles.Button.primaryButton, text: Styles.Text.primaryButtonText }}
                    text="finish"
                  />
                </View>
                <View style={[Styles.Layout.w100, Styles.Layout.flexRow, Styles.Layout.jc_c, Styles.MarginPadding.mt32]}>
                  {loading ?
                    <ActivityIndicator color={colors.redE9} size={wDP(30)} />
                    :
                    null}
                </View>
              </View>
            );
          }}
        </FormadjoForm>
      </ScrollView>
    </ScreenLayoutView>
  );
};

export { SetupProfileScreenPresenter };
