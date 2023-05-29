import React from 'react';
import { Text, View } from 'react-native';
import Logo from '@assets/svg/trademark.svg';

import { ScreenLayoutView } from '@components/common/hoc/ScreenLayout';
import { TextView } from '@components/TextView';
import { Styles } from '@styles/load';
import { PrimaryButtonView } from '@components/PrimaryButtonView';
import { colors } from '@utils/colors';
import { LineView } from '@components/LineView';
import { ImageButtonView } from '@components/ImageButtonView';

import Facebook from '@assets/svg/facebook.svg';
import Google from '@assets/svg/google.svg';
import { PressableTextView } from '@components/PressableTextView';

export type signupScreenPresenterProps = {
  onUsePhoneNumberPress(): void;
  onFacebookPress(): void;
  onGooglePress(): void;
};
// TODO: make possibility to connect to account using this device
const CURRENTLY_DISABLED = true;
const SignupScreenPresenter: React.FC<signupScreenPresenterProps> = ({ onUsePhoneNumberPress, onFacebookPress, onGooglePress }) => {
  return (
    <ScreenLayoutView backgroundColor={colors.whiteFF} styles={[Styles.MarginPadding.ph40]}>
      <View style={[Styles.Layout.flexCol, Styles.Layout.ai_c, Styles.MarginPadding.pt20pc]}>
        <View>
          <Logo width={150} height={150} />
        </View>
        <View style={[Styles.MarginPadding.mb32, Styles.MarginPadding.mt80]}>
          <TextView styles={[Styles.Text.smallTextBold18, Styles.Text.textCenter]} text="sign_up_continue" />
        </View>
      </View>
      <View>
        <PrimaryButtonView
          disabled={CURRENTLY_DISABLED}
          styles={{ outline: [Styles.Button.primaryButton, CURRENTLY_DISABLED && { backgroundColor: colors.redE9_50 }], text: Styles.Text.primaryButtonText }}
          text="continue_as"
          vars={{ mongus: '~Disabled~' }}
        />
        <View style={[Styles.MarginPadding.mt20]}>
          <PrimaryButtonView
            styles={{ outline: Styles.Button.secondaryButton, text: Styles.Text.smallText16RedBold }}
            text="use_phone"
            onPress={onUsePhoneNumberPress}
          />
        </View>
      </View>
      <View style={[Styles.Layout.flexRow, Styles.Layout.ai_c, Styles.Layout.jc_c, Styles.MarginPadding.mt18pc]}>
        <LineView paddingTop={2} width="35%" height={0.5} />
        <TextView text="or_sign_up" styles={[Styles.Text.smallText12Black, Styles.MarginPadding.ph15]} />
        <LineView paddingTop={2} width="35%" height={0.5} />
      </View>
      <View style={[Styles.Layout.flexRow, Styles.MarginPadding.g20, Styles.Layout.flexCenter, Styles.MarginPadding.pt20]}>
        <ImageButtonView
          width={32}
          height={32}
          styles={[Styles.Button.imageButton, Styles.Layout.flexCenter]}
          Icon={Facebook}
          onPress={onFacebookPress}
        />
        <ImageButtonView
          width={32}
          height={32}
          styles={[Styles.Button.imageButton, Styles.Layout.flexCenter]}
          Icon={Google}
          onPress={onGooglePress}
        />
      </View>
      <Text style={[Styles.Text.textCenter, Styles.MarginPadding.mt20]}>
        <PressableTextView text="terms" styles={Styles.Text.smallTextRed14} />
        {'      '}
        <PressableTextView text="privacy" styles={Styles.Text.smallTextRed14} />
      </Text>
    </ScreenLayoutView>
  );
};

export { SignupScreenPresenter };
