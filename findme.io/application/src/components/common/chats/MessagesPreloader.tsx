import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { colors } from '../../../Parts/colors'
import { chatStyles } from '../../../Styles/ChatStyles'
import { StylesOne } from '../../../Styles/StylesOne'

type IProps = {}

type IState = {
    show: boolean;
}

const MessagesPreloader = forwardRef<unknown, IProps>(({ }, _ref) => {
    const [getState, setState] = useState<IState>({
        show: false,
    })

    useImperativeHandle(_ref, () => ({
        show,
        hide,
    }))

    const show = () => {
        setState({ ...getState, show: true })
    }

    const hide = () => {
        setState({ ...getState, show: false })
    }


    return (
        <>
            {getState.show ? <View style={[StylesOne.w100, chatStyles.ChatPreloader , StylesOne.flexCenter, StylesOne.absolute]}>
                <View>
                    <Text>Loading...</Text>
                </View>
                <View>
                    <ActivityIndicator color={colors.White} size={'large'} />
                </View>
            </View> : <></>}
        </>
    )
});


export { MessagesPreloader }