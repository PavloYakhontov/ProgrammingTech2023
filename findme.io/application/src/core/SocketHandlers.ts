import { Socket, SocketData, SocketEvents } from './Socket';
// import { modulesImpl } from '../redux/actions/modules';
// import { MessageEntity } from './entity/MessageEntity';
// import { MessageStatus } from '../Types/enums';
// import { PlainMessage } from '../Types/Models';

class SocketHandlers {
  private readonly _dispatch: Function;

  private _socketImpl: Socket;

  constructor(dispatch: Function, socketImpl: Socket) {
    this._dispatch = dispatch;
    this._socketImpl = socketImpl;
  }

  public getMessage = async (socketData: SocketData) => {
    if (socketData.data === void 0 || socketData.data === null) {
      return;
    }
    const newMessage = {
      companion: socketData.data.companion,
      created_at: socketData.data.created_at,
      plain_message: socketData.data.plain_message,
      sender: socketData.data.sender,
      status: socketData.data.status,
      type: socketData.data.type,
      message_hash: socketData.data.message_hash,
    };
    //    this._dispatch(modulesImpl.addMessageToStack(newMessage));
    if (this._socketImpl.socket.readyState === 1) {
      this._socketImpl.emitByEvent(SocketEvents.readAllMessages, socketData.data.sender);
    }
  };

  public serverGotMessage = async (socketData: SocketData) => {
    //    this._dispatch(modulesImpl.setStatus(MessageStatus.SentToServer, socketData.message.message_hash));
  };

  public readAllMessages = async (socketData: SocketData) => {
    if (socketData) {
      if (socketData.data.statusCode === 200) {
        //        this._dispatch(modulesImpl.setAllReadMessages(MessageStatus.ReadByUser, socketData.data.type));
      } else {
        console.log('error! readAllMessages ex');
      }
    }
  };

  public deleteMessage = async (socketData : SocketData) => {
    if (socketData) {
      if (socketData.data.isRemoved) {
        const mHash = socketData.data.message_hash;
        //        this._dispatch(modulesImpl.removeMessage());
      }
    }
  };
}

export { SocketHandlers };
