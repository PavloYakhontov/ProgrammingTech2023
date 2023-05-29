import React, { PropsWithChildren } from 'react';
import { ScreenLayoutView } from '@components/common/hoc/ScreenLayout';
import { Text, View } from 'react-native';
import { TransitionCarouselView } from '@components/TransitionCarouselView';
import { CarouselPhotos } from '@utils/constants/images';
import { Styles } from '@styles/load';
import { TextView } from '@components/TextView';
import { PrimaryButtonView } from '@components/PrimaryButtonView';
import { PressableTextView } from '@components/PressableTextView';

export type welcomeScreenPresenterProps = PropsWithChildren<{
  onCreateAccountPress: () => void;
  onGoToAuthPress: () => void;
}>
const WelcomeScreenPresenter: React.FC<welcomeScreenPresenterProps> = ({ onCreateAccountPress, onGoToAuthPress }) => {
  return (
    <ScreenLayoutView>
      <View style={[Styles.MarginPadding.mt32]}>
        <TransitionCarouselView
          photoList={CarouselPhotos}
          firstIndexActive={1}
          autoscroll
        />
      </View>
      <View style={[Styles.MarginPadding.mt40]}>
        <TextView styles={[Styles.Text.textCenter, Styles.MarginPadding.mb10, Styles.Text.redHeader]} text="welcome" />
        <TextView styles={[Styles.Text.textCenter, Styles.Text.redSubHeader]} text="users_going_through" />
      </View>
      <View style={[Styles.Layout.flexRow, Styles.Layout.jc_c, Styles.Layout.w100, Styles.MarginPadding.ph40, Styles.MarginPadding.mt50]}>
        <PrimaryButtonView
          styles={{ outline: Styles.Button.primaryButton, text: Styles.Text.primaryButtonText }}
          text="create_an_account"
          onPress={onCreateAccountPress}
        />
      </View>
      <Text style={[Styles.Text.textCenter, Styles.MarginPadding.mt20]}>
        <TextView text="already_have_acc" styles={[Styles.Text.smallText14Black]} />
        {'  '}
        <PressableTextView styles={Styles.Text.smallText16Red} onPress={onGoToAuthPress} text="sign_in" />
      </Text>
    </ScreenLayoutView>
  );
};

export { WelcomeScreenPresenter };
