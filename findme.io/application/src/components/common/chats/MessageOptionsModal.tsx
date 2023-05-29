import Clipboard from '@react-native-community/clipboard';
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Modal, Text, TouchableOpacity, View, ToastAndroid } from 'react-native';
import { useDispatch } from 'react-redux';
import { currentUser } from '../../../BLL/CurrentUserProps';
import { MessageEntity } from '../../../BLL/entity/MessageEntity'
import { colors } from '../../../Parts/colors';
import { DEVICE_WIDTH, mockupWidthToDP, mockupHeightToDP, DEVICE_HEIGHT } from '../../../Parts/utils';
import { backgrounds } from '../../../Styles/Backgrounds';
import { StylesFour } from '../../../Styles/StylesFour';
import { safeAreaInsetsTop, StylesOne } from '../../../Styles/StylesOne';
import { St } from '../../../Styles/StylesTwo';


type IProps = {
    onUpdateMessagePress(message: MessageEntity | null): void;
    onDeleteMessagePress(message: MessageEntity | null): void;
};

type IState = {
    visible: boolean;
    currentMessage: null | MessageEntity;
    coords: {
        x: number;
        y: number;
    }
};

export type MessageOptionsModalForward = {
    show(message: MessageEntity, coordinates: { x: number, y: number }): void;
    hide(): void;
}

const MessageOptionsModal = forwardRef<unknown, IProps>(({  onDeleteMessagePress, onUpdateMessagePress }, _ref) => {
    const dispatch = useDispatch(); 
    const [getState, setState] = useState<IState>({
        visible: false,
        currentMessage: null,
        coords: {
            x: DEVICE_WIDTH / 2,
            y: DEVICE_HEIGHT / 2,
        }
    })

    const isMyMessage = () => {
        const message = getState.currentMessage;
        if (message === null) {
            return false;
        }
       return message.sender === currentUser.currentUserId;
    }

    const _setAppropriateCoords = (pressCoords: { x: number; y: number }): { x: number; y: number } => {
        const result = { x: 0, y: 0 };
        const width = DEVICE_WIDTH - mockupWidthToDP(60);
        if (pressCoords !== void 0) {
            const menuWidth = mockupWidthToDP(156);
            const menuHeight = mockupHeightToDP(150);
            const offsetX = mockupWidthToDP(50);
            const offsetY = mockupHeightToDP(50 + safeAreaInsetsTop + mockupHeightToDP(40) + mockupHeightToDP(60));
            if (pressCoords.x + menuWidth > width + offsetX) {
                result.x = width - (pressCoords.x - menuWidth) - offsetX;
            } else {
                result.x = pressCoords.x;
            }
            if (pressCoords.y + menuHeight > DEVICE_HEIGHT) {
                result.y = pressCoords.y - offsetY;
            } else {
                result.y = pressCoords.y;
            }
            return result;
        } else {
            return result;
        }
    };

    function show(message: MessageEntity, coordinates: { x: number, y: number }) {
        const coords = _setAppropriateCoords(coordinates)
        setState({ ...getState, currentMessage: message, coords, visible: true })
    }


   async function onCopyPress() {
       if (getState.currentMessage !== null) {
            const message = getState.currentMessage?.messageMapping;
            await Clipboard.setString(message);
            ToastAndroid.show("Copied to clipboard", 2000);
            hide()
       }
    }

    function onUpdatePress() {
        const message = getState.currentMessage;
        if (!isMyMessage()) {
            return;
        }
        onUpdateMessagePress && onUpdateMessagePress(message)
        hide()
    }

    function onDeletePress() {
        const message = getState.currentMessage;
        if (!isMyMessage()) {
            return;
        }
        onDeleteMessagePress && onDeleteMessagePress(message)
        hide()
    }


    function hide() {
        setState({ ...getState, visible: false, currentMessage: null })
    }


    useImperativeHandle(_ref, () => ({
        show,
        hide,
    }))
    return (
        <Modal animationType="fade"
            transparent={true}
            visible={getState.visible}
            onRequestClose={hide}>
            <TouchableOpacity activeOpacity={1} onPress={hide} style={[StylesOne.wh100, backgrounds.bg_modal]}>
                <TouchableOpacity style={[StylesOne.flex_column, StylesOne.flex_jc_sa, StylesOne.flex_ai_c, { width: mockupWidthToDP(156), height: mockupHeightToDP(150), backgroundColor: colors.SignIn_Font, position: 'absolute', left: getState.coords.x, top: getState.coords.y, borderRadius: 16 }]} activeOpacity={1} onPress={() => { }}>
                    <TouchableOpacity onPress={onUpdatePress} style={[StylesOne.w100, StylesOne.flexCenter]}>
                        <Text style={StylesFour.myNewsLine_owner}>Update</Text>
                    </TouchableOpacity>
                    <View style={[StylesOne.horizontalLine]} />
                    <TouchableOpacity onPress={onCopyPress} style={[StylesOne.w100, StylesOne.flexCenter]}>
                        <Text style={StylesFour.myNewsLine_owner}>Copy</Text>
                    </TouchableOpacity>
                    <View style={[StylesOne.horizontalLine]} />
                    <TouchableOpacity onPress={onDeletePress} style={[StylesOne.w100, StylesOne.flexCenter]}>
                        <Text style={[StylesFour.myNewsLine_owner, {color: 'red'}]}>Delete</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal >
    )
});



export { MessageOptionsModal }
