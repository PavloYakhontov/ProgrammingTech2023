import React, { useState } from 'react';
import { GestureResponderEvent, Text, TouchableOpacity, View } from 'react-native';
import { MessageEntity } from '../../../BLL/entity/MessageEntity';
import { currentUser } from '../../../BLL/CurrentUserProps';
import { MessageStyles } from '../../../Styles/MessageStyles';
import MessageInfoView from './MessageInfoView';
import { MessageStatus } from '../../../Types/enums';

type IProps = {
  messageEntityProps: MessageEntity;
  onMessagePress(ent: MessageEntity, coords: {x: number, y: number}): void;
};

type IState = {};

const PlainMessageView = (props: IProps) => {
  const [getState, setState] = useState<IState>({
    
  })
  const owner = props.messageEntityProps.sender === currentUser.currentUserId;

  const onPress = (event: GestureResponderEvent) => {
    let coords = {x: 0, y: 0};
    if (event !== void 0 && event !== null) {
      coords = {
        x: event.nativeEvent.pageX,
        y: event.nativeEvent.pageY
      }
    }
    props.onMessagePress && props.onMessagePress(props.messageEntityProps, coords)
  }

  return (
    <TouchableOpacity onPress={onPress} style={[MessageStyles.messageContainer, owner ? MessageStyles.myMessageContainer : MessageStyles.userMessageContainer]}>
      <View style={[owner ? MessageStyles.myMessageBody : MessageStyles.userMessageBody]}>
        {!owner && (
          <TouchableOpacity activeOpacity={0.9}>
            <Text style={MessageStyles.ownerMessage}>{props.messageEntityProps.sender}</Text>
          </TouchableOpacity>
        )}
        <View>
          <Text selectable={true} style={MessageStyles.messageText}>{props.messageEntityProps.plain_message}</Text>
        </View>
        <View>
          <MessageInfoView
            currentDate={props.messageEntityProps.created_at || Date.now()}
            currentStatus={props.messageEntityProps.status}
            sender={props.messageEntityProps.sender}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PlainMessageView;
