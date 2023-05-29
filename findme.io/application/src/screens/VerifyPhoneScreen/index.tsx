import React, { useCallback, useEffect, useRef, useState } from 'react';
import { VerifyScreenPresenter, verifyScreenPresenterProps } from '@screens/VerifyPhoneScreen/view';
import { CONSTANTS } from '@utils/constants/strings';
import { useTypedDispatch } from '@reacts/hooks/useRedux';
import { forceNavigator } from '@core/Navigator';

type verifyScreenContainerProps = {};

type verifyScreenContainerState = {
  codeInputValue: string;
};
// There is no free provider for code validation, so this stuff is currently unavailable
const TEST_PHONE_CODE = '5427';

const VerifyScreenContainer: React.FC<verifyScreenContainerProps> = ({}) => {
  // this stuff after all steps markup should be in redux;
  const dispatch = useTypedDispatch();
  const [getState, setState] = useState<verifyScreenContainerState>({
    codeInputValue: '',
  });
  const timerRef = useRef({
    runTimer: () => {},
  });

  const onEraseInput = useCallback(() => {
    const v = getState.codeInputValue;
    if (v.length <= 0) {
      return;
    }
    setState({ ...getState, codeInputValue: v.substring(0, v.length - 1) });
  }, [getState]);

  const onPressNumber = useCallback((n: number) => {
    const v = getState.codeInputValue;
    if (v.length >= CONSTANTS.countOfNums) {
      return;
    }
    const newInputVal = v + n;
    setState({ ...getState, codeInputValue: newInputVal });
    console.log(getState.codeInputValue);
    if (newInputVal.length === CONSTANTS.countOfNums) {
      if (newInputVal === TEST_PHONE_CODE) {
        forceNavigator.navigate('SetupProfileScreen', {});
      }
    }
  }, [getState]);

  const onResendPress = useCallback(() => {
    if (timerRef && timerRef.current) {
      timerRef.current.runTimer();
    }
  }, [timerRef, timerRef.current]);

  useEffect(() => {
    if (timerRef && timerRef.current) {
      timerRef.current.runTimer();
    }
  }, []);

  const onCodeInputChange = useCallback((v: string) => {
    setState({ ...getState, codeInputValue: v });
  }, [getState]);

  const ViewProps: verifyScreenPresenterProps = {
    codeInputValue: getState.codeInputValue,
    onCodeInputChange,
    onPressNumber,
    onEraseInput,
    timerRef,
    onResendPress,
  };

  return (
    <VerifyScreenPresenter {...ViewProps} />
  );
};

export { VerifyScreenContainer };
