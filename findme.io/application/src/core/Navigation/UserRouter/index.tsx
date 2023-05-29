import React from 'react';
import { BottomNavigation } from '@core/Navigation/BottomNavigation';
import { Navigator } from '@core/Navigator';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

type userRouterProps = {
  Stack: ReturnType<typeof createNativeStackNavigator>
};

const UserRouter: React.FC<userRouterProps> = ({ Stack }) => {
  return (
    <>
      <Stack.Navigator>
        {Navigator.StackScreens.user.map(({ component, name, options }) => {
          return <Stack.Screen name={name} component={component} options={options as NativeStackNavigationOptions} key={name} />;
        })}
      </Stack.Navigator>
      <BottomNavigation />
    </>
  );
};

export { UserRouter };
