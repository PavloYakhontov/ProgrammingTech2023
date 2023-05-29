import React, { useCallback } from 'react';
import { SignInScreenPresenter, signInScreenPresenterProps } from '@screens/SignInScreen/view';
import { FormadjoAsyncSubmitFn } from '@core/Validators/FormadjoForm';
import { ILoginFormTemplate } from '@utils/forms';
import { useSafeHTTP } from '@reacts/hooks/useSafeHTTP';
import DeviceInfo from 'react-native-device-info';
import { RequestForge } from '@core/http/RequestForge';
import { __app__ } from '@core/MainActivity';
import { globalActions } from '@redux/slices/global.slice';
import { useTypedDispatch } from '@reacts/hooks/useRedux';
import i18next from '@src/locale/i18next';

type signInScreenContainerProps = {};

const SignInScreenContainer: React.FC<signInScreenContainerProps> = () => {
  const dispatch = useTypedDispatch();
  const { httpCaller, loading } = useSafeHTTP();

  const OnFormSubmit: FormadjoAsyncSubmitFn<ILoginFormTemplate> = useCallback(async (values, addExtendedError) => {
    const { login, password } = values;
    const device_id = await DeviceInfo.getUniqueId();
    const loginResponse = await httpCaller(RequestForge.loginCall, { login, password, device_id });
    if (loginResponse && loginResponse?.data) {
      await __app__.getCurrentUser.saveTokens(loginResponse.data);
      dispatch(globalActions.setIsAuth(__app__.getCurrentUser.isAuth));
    } else {
      addExtendedError('login', { isError: true, errorMessage: '' });
      addExtendedError('password', { isError: true, errorMessage: i18next.t('error_invalid_login') });
    }
  }, []);

  const ViewProps: signInScreenPresenterProps = {
    OnFormSubmit,
    loading,
  };

  return (
    <SignInScreenPresenter {...ViewProps} />
  );
};

export { SignInScreenContainer };
