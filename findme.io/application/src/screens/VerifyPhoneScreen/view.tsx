import React, { MutableRefObject, RefObject } from 'react';
import { Text, View } from 'react-native';

import { ScreenLayoutView } from '@components/common/hoc/ScreenLayout';
import { MainHeaderView } from '@core/Headers/MainHeader';
import { Styles } from '@styles/load';
import { TextView } from '@components/TextView';
import { colors } from '@utils/colors';
import { StatelessButtonMatrixView } from '@components/ButtonMatrixView';
import EraseIcon from '@assets/svg/erase.svg';
import { CodeNumberInputView } from '@components/CodeNumberInputView';
import { CONSTANTS } from '@utils/constants/strings';
import { TimerTextView } from '@components/TimerTextView';
import { PressableTextView } from '@components/PressableTextView';

export type verifyScreenPresenterProps = {
  codeInputValue: string;
  onCodeInputChange(s: string): void;
  onEraseInput(): void;
  onPressNumber(n: number): void;
  timerRef: MutableRefObject<{ runTimer: () => void }>;
  onResendPress(): void;
};

const VerifyScreenPresenter: React.FC<verifyScreenPresenterProps> = ({ codeInputValue, onCodeInputChange, onEraseInput, onPressNumber, timerRef, onResendPress }) => {
  return (
    <ScreenLayoutView
      backgroundColor={colors.whiteFF}
      styles={[Styles.Container.screenLayout, Styles.Container.serviceScreenLayoutHeader]}
    >
      <MainHeaderView />
      <View style={[Styles.MarginPadding.mt32, Styles.MarginPadding.mb32]}>
        <View style={Styles.MarginPadding.mb10}>
          <TimerTextView ref={timerRef}>
            <View style={[Styles.Layout.w100, Styles.Layout.flexCenter]}>
              <PressableTextView styles={[Styles.Text.bigBoldRed34, Styles.Text.textCenter]} onPress={onResendPress} text="send_again" />
            </View>
          </TimerTextView>
        </View>
        <TextView text="text_timer" styles={[Styles.Text.smallTextRegular18, Styles.Text.textCenter]} />
      </View>
      <View style={[Styles.MarginPadding.mb64]}>
        <CodeNumberInputView
          onChange={onCodeInputChange}
          overValue={codeInputValue}
          countOfDigits={CONSTANTS.countOfNums}
        />
      </View>
      <View>
        <StatelessButtonMatrixView
          onNumberButtonPress={onPressNumber}
          eraseButton={{
            icon: <EraseIcon />,
            disabled: false,
            onPress: onEraseInput }}
        />
      </View>
    </ScreenLayoutView>
  );
};

export { VerifyScreenPresenter };
