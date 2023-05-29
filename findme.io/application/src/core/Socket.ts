import { SocketHandlers } from './SocketHandlers';

export enum SocketEvents {
  sendMessage = 'SendMessage',
  readAllMessages = 'ReadAllMessages',
  connect = 'Connect',
  close = 'Close',
  addedMessage = 'AddedMessage',
  removeOneMessage = 'RemoveOneMessage',
}

export type SocketData = {
  event: string;
  data: any;
  message?: any;
};
// 'ws://ec2-3-69-148-251.eu-central-1.compute.amazonaws.com:8080/messaging'
class Socket {
  private readonly _cHash: string;

  private _socket: WebSocket;

  private _makeDispatch: Function;

  private readonly serverURL: string = 'ws://192.168.1.90:8080/messaging';

  private readonly _handlers: SocketHandlers;

  private _userName: string;

  constructor(cHash: string, token: string | null, dispatch: Function, userName: string) {
    this._handlers = new SocketHandlers(dispatch, this);
    this._cHash = cHash;
    this._userName = userName;
    this._makeDispatch = dispatch;
    this._socket = new WebSocket(`${this.serverURL}/valhalla/${cHash}?token=${token}`);
    this._socket.onopen = () => {
      this.emitByEvent(SocketEvents.connect, '');
      this.emitByEvent(SocketEvents.readAllMessages, this._userName);
      console.log('Socket opened successfully!');
    };
    this._socket.onclose = () => {
      this.emitByEvent(SocketEvents.close, 0);
    };
    this._socket.onerror = (e) => {
      console.log('socket onError ex', e.message);
      // this._connectAndOpenSocket()
    };
    this._socket.onmessage = this.handleByEvent;
  }

  public closeSocket = async () => {
    await this._socket.close(1000, 'Socket Closed By User');
  };

  get handlers(): SocketHandlers {
    return this._handlers;
  }

  public get socket(): WebSocket {
    return this._socket;
  }

  public emitByEvent = async (eventName: SocketEvents, data: any) => {
    const socketBody: { event: string; data: any } = {
      event: eventName || 'default',
      data,
    };
    const bodyStr = JSON.stringify(socketBody);
    if (this._socket.readyState === 1) {
      this._socket.send(bodyStr);
    } else {
      // await this._connectAndOpenSocket()
    }
  };

  private _connectAndOpenSocket = async () => {
    this._socket = new WebSocket(`${this.serverURL}/${this._cHash}`);
  };

  private handleByEvent = async (evt: WebSocketMessageEvent) => {
    try {
      const socketData: SocketData = JSON.parse(evt.data);
      console.log(socketData, 'new EVENT');
      switch (socketData.event) {
        case SocketEvents.sendMessage:
          await this.handlers.getMessage(socketData);
          break;
        case SocketEvents.addedMessage:
          await this.handlers.serverGotMessage(socketData);
          break;
        case SocketEvents.readAllMessages:
          console.log('readallmessages');
          await this.handlers.readAllMessages(socketData);
          break;
        case SocketEvents.removeOneMessage:
          await this.handlers.deleteMessage(socketData);
          break;
        default:
          console.log('messs');
          console.log('default event');
          break;
      }
    } catch (e) {
      console.warn('SocketError!', e);
    }
  };
}

export { Socket };
