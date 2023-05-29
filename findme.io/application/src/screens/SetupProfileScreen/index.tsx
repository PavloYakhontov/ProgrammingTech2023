import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SetupProfileScreenPresenter, setupProfileScreenPresenterProps } from '@screens/SetupProfileScreen/view';
import { useTypedDispatch, useTypedSelector } from '@reacts/hooks/useRedux';
import { userRegisterActions } from '@redux/slices/auth/user-register/user-register.slice';
import { ScrollView } from 'react-native';
import { DEVICE_WIDTH } from '@utils/scaling';
import { forceNavigator } from '@core/Navigator';
import { useSafeHTTP } from '@reacts/hooks/useSafeHTTP';
import { RequestForge } from '@core/http/RequestForge';
import DeviceInfo from 'react-native-device-info';
import { __app__ } from '@core/MainActivity';
import { globalActions } from '@redux/slices/global.slice';
import { IBasicInformationFormTemplate, ILocationFormTemplate, IPersonalInformationFormTemplate } from '@utils/forms';
import I18next from '@src/locale/i18next';
import { FormadjoAsyncSubmitFn, FormadjoSubmitFn } from '@core/Validators/FormadjoForm';

export type setupProfileScreenContainerProps = {};

const SetupProfileScreenContainer: React.FC<setupProfileScreenContainerProps> = ({}) => {
  const [currentActiveSlide, setCurrentActiveSlide] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const dispatch = useTypedDispatch();
  const { httpCaller, loading } = useSafeHTTP();
  const state = useTypedSelector((state) => state.user_register);

  const _onScrollView = useCallback((idx: number) => {
    const nextSlide = DEVICE_WIDTH * idx;
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTo({
        x: nextSlide,
        animated: true,
      });
      setCurrentActiveSlide((prev) => prev + 1);
    }
  }, [scrollRef]);

  const onGoBack = useCallback(() => {
    if (currentActiveSlide === 0) {
      forceNavigator.erase(true);
      forceNavigator.navigate('WelcomeScreen', {});
      return;
    }
    const prevSlide = DEVICE_WIDTH * (currentActiveSlide - 1);
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTo({
        x: prevSlide,
        animated: true,
      });
    }
    setCurrentActiveSlide((prev) => prev - 1);
  }, [currentActiveSlide, scrollRef]);

  const onInitialSetupPress: FormadjoAsyncSubmitFn<IBasicInformationFormTemplate> = useCallback(async (values, addExtendedError) => {
    dispatch(userRegisterActions.updateBasicInformationData(values));
    const responseEmail = await httpCaller(RequestForge.checkIsPhoneExistsCall, { email: values.email });
    if (responseEmail && responseEmail.data?.isEmailExists) {
      addExtendedError('email', { isError: true, errorMessage: I18next.t('error_email_exists') });
      return;
    }
    _onScrollView(1);
  }, [dispatch, httpCaller, _onScrollView]);

  const onUserSetupPress: FormadjoSubmitFn<IPersonalInformationFormTemplate> = useCallback((values) => {
    dispatch(userRegisterActions.updateUserInformationData(values));
    _onScrollView(2);
  }, [dispatch, _onScrollView]);

  const onFinish: FormadjoAsyncSubmitFn<ILocationFormTemplate> = useCallback(async (values) => {
    const mergedValuesWithPhone = { ...state, ...values };
    const response = await httpCaller(RequestForge.registerCall, mergedValuesWithPhone);
    if (response) {
      const { email, password } = state;
      const device_id = await DeviceInfo.getUniqueId();
      const loginResponse = await httpCaller(RequestForge.loginCall, { login: email, password, device_id });
      if (loginResponse && loginResponse?.data) {
        await __app__.getCurrentUser.saveTokens(loginResponse.data);
        dispatch(globalActions.setIsAuth(__app__.getCurrentUser.isAuth));
      }
    }
  }, [dispatch, httpCaller, state]);

  const ViewProps: setupProfileScreenPresenterProps = {
    scrollRef,
    onInitialSetupPress,
    onUserSetupPress,
    onFinish,
    onGoBack,
    state,
    loading,
  };

  return (
    <SetupProfileScreenPresenter {...ViewProps} />
  );
};

export { SetupProfileScreenContainer };
