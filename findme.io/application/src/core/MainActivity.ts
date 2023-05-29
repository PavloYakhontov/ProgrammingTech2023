import { forceNavigator } from '@core/Navigator';
import { PushNotifications } from './PushNotifications';
import { Activity } from './base/Activity';
import { NativeModules } from './NativeModules';
import { GeolocationService } from './Geolocation';
import { CurrentUser, __current_user__ } from './CurrentUser';
import { Settings, settings } from './Settings';

class MainActivity extends Activity {
  public readonly _user: CurrentUser;

  private readonly _native: NativeModules;

  private readonly _geo: GeolocationService;

  private readonly _notify: PushNotifications;

  private readonly _settings: Settings;

  public constructor() {
    super();
    this._user = __current_user__;
    this._native = new NativeModules();
    this._geo = new GeolocationService();
    this._notify = new PushNotifications();
    this._settings = settings;
  }

  public async onCreate(initialProps: any): Promise<void> {
    await forceNavigator.onBackPress();
    await this._user.restoreUser();
    await this._geo.updateGeo();
    await this._notify.onCreate(initialProps);
    const isAuth = this._user.isAuth;
    if (!isAuth) {
      forceNavigator.navigate('WelcomeScreen', {});
    } else {
      forceNavigator.navigationStack.unshift({
        path: 'MatchesScreen',
        props: {},
      });
    }
  }

  public onUpdate(): Promise<void> {
    return Promise.resolve(undefined);
  }

  public onFallbackCreate(initialProps: any): Promise<void> {
    return Promise.resolve(undefined);
  }

  public get getCurrentUser(): CurrentUser {
    return this._user;
  }

  public get geo(): GeolocationService {
    return this._geo;
  }

  public get getNative(): NativeModules {
    return this._native;
  }

  public get settings(): Settings {
    return this._settings;
  }
}

export const __app__ = new MainActivity();
