import React, { useCallback } from 'react';
import { GestureResponderEvent, View } from 'react-native';
import { Styles } from '@styles/load';
import { TextView } from '@components/TextView';
import { ImageButtonView } from '@components/ImageButtonView';

import LeftArrow from '@assets/svg/leftArrow.svg';
import { forceNavigator } from '@core/Navigator';

type mainHeaderViewProps = Partial<{
  rightButton: JSX.Element;
  headerText: string;
  subHeaderText: string;
  onTouchCenter: (event: GestureResponderEvent) => void;
  LeftButton: Partial<{
    onOverrideGoBack?(): void;
    hide: boolean;
    disabled: boolean;
  }>;
  customHeader?: JSX.Element;
}>;
const MainHeaderView: React.FC<mainHeaderViewProps> = ({ headerText, subHeaderText, LeftButton, rightButton, onTouchCenter, customHeader }) => {
  const { goBack } = forceNavigator;
  const handleGoBack = useCallback(() => {
    if (LeftButton?.onOverrideGoBack) {
      LeftButton.onOverrideGoBack && LeftButton.onOverrideGoBack();
      return;
    }
    goBack && goBack();
  }, [LeftButton, goBack]);

  return (
    <View style={[Styles.Layout.w100, Styles.Layout.flexRow, Styles.Layout.jc_sb, Styles.Layout.min52_h]}>
      <View style={[Styles.Layout.w20pc]}>
        {!LeftButton?.hide && <ImageButtonView onPress={handleGoBack} disabled={LeftButton?.disabled} styles={[Styles.Button.smallImageButton, Styles.Layout.flexCenter]} width={18} height={18} Icon={LeftArrow} />}
      </View>
      <View style={[Styles.Layout.w60pc, Styles.Layout.flexCenter]} onTouchStart={onTouchCenter}>
        {customHeader || (
        <View>
          {headerText && <TextView styles={[Styles.Text.mediumText24Black, Styles.Text.textCenter]} text={headerText} />}
          {subHeaderText && <TextView styles={[Styles.Text.smallText12_40Black, Styles.Text.textCenter]} text={subHeaderText} />}
        </View>
        )}
      </View>
      <View style={[Styles.Layout.w20pc]}>
        {rightButton || null}
      </View>
    </View>
  );
};

export { MainHeaderView };
