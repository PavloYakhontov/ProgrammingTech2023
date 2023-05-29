import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, AndroidVisibility } from '@notifee/react-native';
import { Activity } from '@core/base/Activity';

type pushIndividual = 1 | 2; // 1 - background, 2 - foreground
export class PushNotifications implements Omit<Activity, 'onUpdate' | 'onFallbackCreate'> {
  private defaultChannel: string;

  constructor() {
    this.defaultChannel = '';
  }

  public async onCreate(initialProps: any): Promise<void> {
    this.defaultChannel = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    await notifee.requestPermission();
    await this.requestFCMPermission();
    await this.handleBackground();
    messaging().onMessage((ev) => this.onMessageHandler(ev, 2));
  }

  public handleBackground = async () => {
    messaging().setBackgroundMessageHandler((ev) => this.onMessageHandler(ev, 1));
  };

  private get getToken() {
    return messaging().getToken();
  }

  public requestFCMPermission = async () => {
    const authResponse = await messaging().requestPermission();
    const enabled = authResponse === messaging.AuthorizationStatus.AUTHORIZED || authResponse === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      this.getToken.then((el) => {
        console.log(el);
      });
    }
  };

  public openSettings = async () => {
    await notifee.openNotificationSettings(this.defaultChannel);
  };

  public onMessageHandler = async (remoteMessage: FirebaseMessagingTypes.RemoteMessage, type: pushIndividual) => {
    const { notification, data } = remoteMessage;
    console.log(notification, data);
    if (notification) {
      await notifee.displayNotification({
        title: notification.title,
        body: notification.body,
        data,
        android: {
          importance: AndroidImportance.HIGH,
          onlyAlertOnce: true,

          channelId: this.defaultChannel,
          // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
          pressAction: {
            id: 'default',
          },
        },
      });
    }
  };
}
