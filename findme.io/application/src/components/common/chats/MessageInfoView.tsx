import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { MessageEntity } from '../../../BLL/entity/MessageEntity';
import { currentUser } from '../../../BLL/CurrentUserProps';
import { MessageStyles } from '../../../Styles/MessageStyles';
import { timeParse } from '../../../Parts/utils';
import { MessageStatus } from '../../../Types/enums';
import { messageStatuses } from '../../../assets/images';
import {StylesOne} from "../../../Styles/StylesOne";
import {colors} from "../../../Parts/colors";

type IProps = {
  currentStatus: number;
  currentDate: number | string;
  sender: string;
};

type IState = {
  messageStatus: MessageStatus;
};

const PlainMessageView = (props: IProps) => {
  const [getState, setState] = useState<IState>({
    messageStatus: props.currentStatus,
  })
    const owner = props.sender === currentUser.currentUserId;
    const date = timeParse(props.currentDate);
    const tintColor = {tintColor: colors.WhiteChalk}
    const tintGreen = {tintColor: colors.acceptColor}


    useEffect(() => {
        if (getState.messageStatus !== props.currentStatus) {
          setState({...getState, messageStatus: props.currentStatus})
        }
    }, [props.currentStatus])

  const renderStatus = () => {
    switch (props.currentStatus) {
      case MessageStatus.ErrorOnSending:
        return <Image style={[StylesOne.wh100, StylesOne.rm_c, tintColor]} source={messageStatuses.error} />;
      case MessageStatus.AwaitForSending:
        return <Image style={[StylesOne.wh100, StylesOne.rm_c, tintColor]} source={messageStatuses.awaiting} />;
      case MessageStatus.SentToServer:
        return <Image style={[StylesOne.wh100, StylesOne.rm_c, tintColor]} source={messageStatuses.sent} />;
      case MessageStatus.ReadByUser:
        return <Image style={[StylesOne.wh100, StylesOne.rm_c, tintGreen]} source={messageStatuses.read} />;
    }
  };


  return (
    <View style={[]}>
      <View style={[StylesOne.flex_row, StylesOne.flex_jc_fe, StylesOne.flex_ai_c]}>
        <View>
          <Text style={MessageStyles.messageDate}>{date}</Text>
        </View>
        {owner && <View style={MessageStyles.messageStatus}>{renderStatus()}</View>}
      </View>
    </View>
  );
};

export default PlainMessageView;
