import React, { useCallback } from 'react';
import { PhoneScreenPresenter, phoneScreenPresenterProps } from '@screens/PhoneScreen/view';
import { forceNavigator } from '@core/Navigator';
import { useDispatch } from 'react-redux';
import { userRegisterActions } from '@redux/slices/auth/user-register/user-register.slice';
import { errorPart } from '@core/Validators/MainFormadjo';
import { RequestForge } from '@core/http/RequestForge';
import i18next from '@src/locale/i18next';
import { IPhoneFormTemplate } from '@utils/forms';
import { useSafeHTTP } from '@reacts/hooks/useSafeHTTP';

type phoneScreenContainerProps = {};
const PhoneScreenContainer: React.FC<phoneScreenContainerProps> = ({}) => {
  const dispatch = useDispatch();
  const { httpCaller } = useSafeHTTP();
  const onUpdatePhone = useCallback(async (value: string) => {
    await dispatch(userRegisterActions.updatePhoneNumber(value));
  }, [dispatch]);

  const onContinuePress = useCallback(async (values: { phone: string }, setExtendedError: (k: keyof IPhoneFormTemplate, v: errorPart) => void) => {
    await onUpdatePhone(values.phone);
    const res = await httpCaller(RequestForge.checkIsPhoneExistsCall, values);
    if (!res || res?.data?.isPhoneExists) {
      setExtendedError('phone', { isError: true, errorMessage: i18next.t('user_already_exists') });
      return;
    }
    forceNavigator.navigate('VerifyPhoneScreen', {});
  }, [onUpdatePhone, httpCaller]);

  const ViewProps: phoneScreenPresenterProps = {
    onContinuePress,
  };

  return (
    <PhoneScreenPresenter {...ViewProps} />
  );
};

export { PhoneScreenContainer };
