import { MultipleStackScreen } from '@type/service';
import { SignInScreenContainer } from '@screens/SignInScreen';
import { SignupScreenContainer } from '@screens/SignupScreen';
import { WelcomeScreenContainer } from '@screens/WelcomeScreen';
import { AllUsersScreenContainer } from '@screens/AllUsersScreen';
import { MatchesScreenContainer } from '@screens/MatchesScreen';
import { DiscoverScreenContainer } from '@screens/DiscoverScreen';
import { ChatsScreenContainer } from '@screens/ChatsScreen';
import { UserProfileScreenContainer } from '@screens/UserProfileScreen';
import { PhoneScreenContainer } from '@screens/PhoneScreen';
import { VerifyScreenContainer } from '@screens/VerifyPhoneScreen';
import { SetupProfileScreenContainer } from '@screens/SetupProfileScreen';
import { MyProfileScreenContainer } from '@screens/MyProfileScreen';
import { SettingsScreenContainer } from '@screens/SettingsScreen';
import { SelectTagsScreenContainer } from '@screens/SelectTagsScreen';
import { SelectInterestsScreenContainer } from '@screens/SelectInterestsScreen';
import { SelectGenderScreenContainer } from '@screens/SelectGenderScreen';

export type RootStackParamList = {
  UserRouter: { screen: string, params: {} };
  SignInScreen: {};
  SignupScreen: {};
  SettingsScreen: {};
  MyProfileScreen: {};
  PhoneScreen: {};
  VerifyPhoneScreen: {};
  SetupProfileScreen: {};
  SelectTagsScreen: {};
  SelectInterestsScreen: {};
  SelectGenderScreen: {};
  WelcomeScreen: {};
  AllUsersScreen: {};
  MatchesScreen: {};
  DiscoverScreen: {};
  ChatsScreen: {};
  UserProfileScreen: {};
};
export const StackScreens: MultipleStackScreen = {
  auth: [
    {
      name: 'WelcomeScreen',
      component: WelcomeScreenContainer,
      options: {
        headerShown: false,
      },
    },
    {
      name: 'SignInScreen',
      component: SignInScreenContainer,
      options: {
        headerShown: false,
      },
    },
    {
      name: 'SignupScreen',
      component: SignupScreenContainer,
      options: {
        headerShown: false,
      },
    },
    {
      name: 'PhoneScreen',
      component: PhoneScreenContainer,
      options: {
        headerShown: false,
      },
    },
    {
      name: 'VerifyPhoneScreen',
      component: VerifyScreenContainer,
      options: {
        headerShown: false,
      },
    },
    {
      name: 'SetupProfileScreen',
      component: SetupProfileScreenContainer,
      options: {
        headerShown: false,
      },
    },
  ],

  // USER NAVIGATION (ALREADY AUTHORIZED)
  user: [
    {
      name: 'MatchesScreen',
      component: MatchesScreenContainer,
      options: {
        headerShown: false,
      },
    },
    {
      name: 'AllUsersScreen',
      component: AllUsersScreenContainer,
      options: {
        headerShown: false,
      },
    },
    {
      name: 'DiscoverScreen',
      component: DiscoverScreenContainer,
      options: {
        headerShown: false,
      },
    },
    {
      name: 'ChatsScreen',
      component: ChatsScreenContainer,
      options: {
        headerShown: false,
      },
    },
    {
      name: 'UserProfileScreen',
      component: UserProfileScreenContainer,
      options: {
        headerShown: false,
      },
    },
    {
      name: 'MyProfileScreen',
      component: MyProfileScreenContainer,
      options: {
        headerShown: false,
      },
    },
    {
      name: 'SettingsScreen',
      component: SettingsScreenContainer,
      options: {
        headerShown: false,
      },
    },
    {
      name: 'SelectTagsScreen',
      component: SelectTagsScreenContainer,
      options: {
        headerShown: false,
      },
    },
    {
      name: 'SelectInterestsScreen',
      component: SelectInterestsScreenContainer,
      options: {
        headerShown: false,
      },
    },
    {
      name: 'SelectGenderScreen',
      component: SelectGenderScreenContainer,
      options: {
        headerShown: false,
      },
    },
  ],
};
