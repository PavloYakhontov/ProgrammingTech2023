import { NavigationContainerRefWithCurrent, createNavigationContainerRef } from '@react-navigation/native';
import { INavigateOptions, IStackScreen, MultipleStackScreen } from '@type/service';
import { RootStackParamList, StackScreens } from '@core/NavigatorScreens';
import { BackHandler } from 'react-native';

export class Navigator {
  public static readonly StackScreens: MultipleStackScreen = StackScreens;

  private readonly _stackScreens: Array<IStackScreen>;

  private _navigationStack: Array<INavigateOptions<void>>;

  private readonly _navigation = createNavigationContainerRef<RootStackParamList>();

  private _serviceScreens: Array<string>;

  public constructor() {
    this._serviceScreens = [];
    this._stackScreens = [];
    this._navigationStack = [];
  }

  public get navigationStack() {
    return this._navigationStack;
  }

  public get navigation() {
    return this._navigation;
  }

  public get stackScreens(): Array<IStackScreen> {
    return this._stackScreens;
  }

  public navigate = <T extends keyof RootStackParamList>(path: T, props: RootStackParamList[T]) => {
    if (!this.navigation) {
      if (this._navigationStack.length === 1) { /* empty */ }
    }
    if (this._navigationStack.length > 2 && path === this._navigationStack[this._navigationStack.length - 1].path) {
      return;
    }
    if (this._navigation.isReady()) {
      this._navigationStack.push({ path, props });
      this._navigation.navigate(path as never, props as never);
    }
  };

  public get currentScreen() {
    return this._navigationStack[this._navigationStack.length];
  }

  public erase = (can: boolean = false) => {
    if (can) {
      this._navigationStack = [];
    }
  };

  public go(count: number) {
    const { props, path } = this._navigationStack[count];
    this._navigationStack.pop();
    this._navigation.navigate(path as never, props as never);
  }

  public onBackPress = () => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.goBack();
      return true;
    });
  };

  public goBack = () => {
    try {
      const l = this.navigationStack.length - 1;

      if (l === 0) {
        this.go(0);
      }
      if (!this.navigation || l <= 0) {
        return;
      }
      this.go(l - 1);
    } catch (e) {
      console.log(e);
    }
  };
}

export const forceNavigator = new Navigator();
