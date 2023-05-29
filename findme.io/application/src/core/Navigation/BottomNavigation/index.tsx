import React, { memo, useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import DiscoverIcon from '@assets/svg/bottom/heart.svg';
import MatchIcon from '@assets/svg/bottom/matches.svg';
import AllUsersIcon from '@assets/svg/bottom/discover.svg';
import ChatsIcon from '@assets/svg/bottom/message.svg';
import ProfileIcon from '@assets/svg/bottom/profile.svg';
import { forceNavigator } from '@core/Navigator';
import { colors } from '@utils/colors';
import { RootStackParamList } from '@core/NavigatorScreens';
import styles from './styles';

type bottomNavigationProps = {};

const BottomNavigation: React.FC<bottomNavigationProps> = () => {
  const [getSelectedRoute, setSelectedRoute] = useState(1);

  const onPressSelectRoute = useCallback((currentRoute: keyof RootStackParamList, index: number) => () => {
    forceNavigator.navigate(currentRoute, {});
  }, []);

  useEffect(() => {
    const listener = (event: any) => {
      if (event.data.state) {
        const lastPath = event.data.state.routes[event.data.state.routes.length - 1];
        switch (lastPath.name) {
          case 'AllUsersScreen':
            setSelectedRoute(1);
            break;
          case 'MatchesScreen':
            setSelectedRoute(0);
            break;
          case 'DiscoverScreen':
            setSelectedRoute(2);
            break;
          case 'ChatsScreen':
            setSelectedRoute(3);
            break;
          case 'MyProfileScreen':
            setSelectedRoute(4);
            break;
          default:
            setSelectedRoute(0);
            break;
        }
        console.log(event.data.state.routes);
      }
    };
    forceNavigator.navigation.addListener('state', listener);
    return () => {
      forceNavigator.navigation.removeListener('state', listener);
    };
  }, []);

  const getColorByIndex = (index: number) => (getSelectedRoute === index ? colors.redE9 : colors.grayAD);
  const getBorderByIndex = (index: number) => (getSelectedRoute === index ? styles.borderTop : {});

  return (
    <View style={[styles.bgColor, styles.dims]}>
      <TouchableOpacity style={[styles.buttonStyles, getBorderByIndex(1)]} onPress={onPressSelectRoute('AllUsersScreen', 1)}>
        <AllUsersIcon color={getColorByIndex(1)} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.buttonStyles, getBorderByIndex(0)]} onPress={onPressSelectRoute('MatchesScreen', 0)}>
        <MatchIcon color={getColorByIndex(0)} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.buttonStyles, getBorderByIndex(2)]} onPress={onPressSelectRoute('DiscoverScreen', 2)}>
        <DiscoverIcon color={getColorByIndex(2)} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.buttonStyles, getBorderByIndex(3)]} onPress={onPressSelectRoute('ChatsScreen', 3)}>
        <ChatsIcon color={getColorByIndex(3)} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.buttonStyles, getBorderByIndex(4)]} onPress={onPressSelectRoute('MyProfileScreen', 4)}>
        <ProfileIcon color={getColorByIndex(4)} />
      </TouchableOpacity>
    </View>
  );
};
const memoized = memo(BottomNavigation);
export { memoized as BottomNavigation };
