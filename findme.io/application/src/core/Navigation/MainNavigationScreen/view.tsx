import React, { PropsWithChildren } from 'react';
import { ScreenLayoutView } from '@components/common/hoc/ScreenLayout';
import { UserRouter } from '@core/Navigation/UserRouter';
import { Navigator } from '@core/Navigator';
import { FatalApiErrorModal } from '@components/common/modals/FatalApiErrorModal';
import { __app__ } from '@core/MainActivity';
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';

export type mainNavigationPresenterProps = PropsWithChildren<{
  isAuth: boolean;
}>;

const MainStack = createNativeStackNavigator();
const MainNavigationPresenter: React.FC<mainNavigationPresenterProps> = ({}) => {
  return (
    <ScreenLayoutView backgroundColor="white">
      {!__app__.getCurrentUser.isAuth ? (
        <MainStack.Navigator>
          <MainStack.Group>
            {Navigator.StackScreens.auth.map(({ component, name, options }) => {
              return <MainStack.Screen name={name} component={component} options={options as NativeStackNavigationOptions} key={name} />;
            })}
          </MainStack.Group>
        </MainStack.Navigator>
      )
        :
        <UserRouter Stack={MainStack} />}
      <React.Fragment>
        <FatalApiErrorModal block={false} />
      </React.Fragment>
    </ScreenLayoutView>
  );
};

export { MainNavigationPresenter };
