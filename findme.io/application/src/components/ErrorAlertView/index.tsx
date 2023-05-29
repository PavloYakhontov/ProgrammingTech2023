import React, { PropsWithRef, forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { View } from 'react-native';
import { TextView } from '@components/TextView';

type errorAlertViewProps = Required<PropsWithRef<{
  text: string;
}>>;


type errorAlertViewForward = Required<{
  handleOnShow(): void;
}>;

const ErrorAlertView = forwardRef<errorAlertViewForward, errorAlertViewProps>(({ text }, ref) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const handleOnShow = useCallback(() => {

  }, []);

  useImperativeHandle(ref, () => ({
    handleOnShow,
  }));

  return (
    <View>
      <TextView text={text} />
    </View>
  );
});

export { ErrorAlertView };
