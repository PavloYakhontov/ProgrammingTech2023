import React, { useCallback, useMemo } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH, hDP } from '@utils/scaling';
import { colors } from '@utils/colors';
import { useTypedSelector } from '@reacts/hooks/useRedux';
import { useDispatch } from 'react-redux';
import { globalActions } from '@redux/slices/global.slice';
import { Styles } from '@styles/load';
import { PrimaryButtonView } from '@components/PrimaryButtonView';

type fatalApiErrorModalProps = {
  block: boolean;
};
const FatalApiErrorModal: React.FC<fatalApiErrorModalProps> = ({ block }) => {
  const dispatch = useDispatch();
  const state = useTypedSelector((state) => state.global);
  const memoizedBoundary = useMemo(() => state.fatalModal.boundary, [state]);
  const date = new Date(memoizedBoundary?.boundaryBody?.timeCode || Date.now());

  const onClose = useCallback(() => {
    dispatch(globalActions.closeFatalModal());
  }, [dispatch]);

  const onSendToEmail = useCallback(() => {
    dispatch(globalActions.closeFatalModal());
  }, [dispatch]);

  return (
    <Modal
      visible={!block && state.fatalModal.show}
      onRequestClose={onClose}
      animationType="fade"
      hardwareAccelerated
      transparent
    >
      <TouchableOpacity onPress={onClose} style={[Styles.Layout.absolute, { width: DEVICE_WIDTH, height: DEVICE_HEIGHT, backgroundColor: colors.black00_40 }]}>
        <TouchableOpacity activeOpacity={1} onPress={() => {}} style={[{ width: DEVICE_WIDTH, height: hDP(450), backgroundColor: colors.whiteFF, borderWidth: 1, borderColor: colors.grayE8, position: 'absolute', bottom: 0 }, Styles.MarginPadding.ph15, Styles.MarginPadding.pv20]}>
          <View>
            <Text style={[Styles.Text.mediumText24Black, Styles.MarginPadding.mb10]}>Oops, fatal error caused!</Text>
            <Text style={[Styles.Text.smallText13Black, Styles.MarginPadding.mb10]}>
              Time of error:
              {' '}
              {date.toTimeString()}
              _
              {date.toDateString()}
            </Text>
          </View>
          <View>
            <Text style={[Styles.Text.smallText13Black, Styles.MarginPadding.mb10]}>You may send it to developers email to make sure that this problem will be fixed as soon as possible</Text>
          </View>
          <View style={{ height: hDP(200) }}>
            <Text style={Styles.Text.smallText12_40Black}>Trace:</Text>
            <ScrollView>
              <View onStartShouldSetResponder={() => true} style={{ height: DEVICE_HEIGHT }}>
                <Text style={Styles.Text.smallText12_40Black}>
                  {memoizedBoundary?.boundaryBody?.trace || ''}
                </Text>
              </View>
            </ScrollView>
          </View>
          <View style={[Styles.MarginPadding.mt32]}>
            <PrimaryButtonView
              onPress={onSendToEmail}
              styles={{ outline: [Styles.Button.primaryButton], text: Styles.Text.primaryButtonText }}
              text="send"
            />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export { FatalApiErrorModal };
