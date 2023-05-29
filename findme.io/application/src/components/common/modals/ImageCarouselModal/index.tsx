import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react';
import { FlatList, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Styles } from '@styles/load';
import { MainHeaderView } from '@core/Headers/MainHeader';
import { DEVICE_WIDTH } from '@utils/scaling';
import { useScrollable } from '@reacts/hooks/useScrollable';

type imageCarouselModalProps = {};

export type imageCarouselModalForward = {
  onClose(): void;
  onOpen(photos: Array<string>): void;
};

type imageCarouselModalState = {
  photos: Array<string>;
  visible: boolean;
};

const ImageCarouselModal = forwardRef<imageCarouselModalForward, imageCarouselModalProps>(({}, ref) => {
  const { scrollableRef, handleOnScroll, handleButtonScroll, getActiveIndex, setActiveIndex } = useScrollable<FlatList>('x', DEVICE_WIDTH, 0, 'flatlist');
  const [getState, setState] = useState<imageCarouselModalState>({
    photos: [],
    visible: false,
  });

  const uniquePointer = useMemo(() => Date.now(), [getState.photos]);

  const onClose = useCallback(() => {
    setState((prev) => ({ ...prev, visible: false, photos: [] }));
    setActiveIndex(0);
  }, [setActiveIndex]);

  const onOpen = useCallback((photos: Array<string>) => {
    setState((prev) => ({ ...prev, visible: true, photos }));
  }, []);

  useImperativeHandle(ref, () => ({
    onClose,
    onOpen,
  }));

  if (!getState.visible) {
    return null;
  }

  return (
    <Modal
      visible={getState.visible}
      onRequestClose={onClose}
      animationType="fade"
      hardwareAccelerated
      presentationStyle="fullScreen"
      style={[Styles.Layout.whfull_px]}
    >
      <View style={[Styles.Container.screenLayout, Styles.Container.serviceScreenLayoutHeader, Styles.Layout.zIndex10, Styles.MarginPadding.mb20]}>
        <MainHeaderView
          customHeader={(
            <View>
              <Text style={[Styles.Text.smallTextBold18]}>
                {getActiveIndex + 1}
                {' '}
                /
                {' '}
                { getState.photos.length }
              </Text>
            </View>
      )}
          LeftButton={{ onOverrideGoBack: onClose }}
        />
      </View>
      <View style={Styles.Layout.h560}>
        <FlatList
          ref={scrollableRef}
          onScroll={handleOnScroll}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={(item, index) => `${item}${index}`}
          pagingEnabled
          getItemLayout={(data, index) => ({
            index,
            length: getState.photos.length,
            offset: DEVICE_WIDTH * index,
          })}
          data={getState.photos}
          renderItem={({ item, index }) => {
            return (
              <View style={[Styles.Layout.wfull_px, Styles.Layout.h100]}>
                <Image style={[Styles.Layout.wh100_pc, { resizeMode: 'cover' }]} source={{ uri: `${item}?reloader=${uniquePointer}` }} />
              </View>
            );
          }}
        />
      </View>
      <View style={[Styles.MarginPadding.mt20]}>
        <FlatList
          contentContainerStyle={[Styles.MarginPadding.g10, Styles.MarginPadding.ph60]}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={getState.photos}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => handleButtonScroll(index)} style={[Styles.Layout.wh65_px, Styles.Layout.borderR10, Styles.Layout.overflowHidden]}>
                <Image style={[Styles.Layout.wh100_pc, Styles.Layout.zIndex10]} source={{ uri: `${item}?reloader=${uniquePointer}` }} />
                {getActiveIndex !== index && <View style={[Styles.Layout.wh100_pc, Styles.Layout.zIndex10, Styles.Container.whiteFF50BackgroundColor, Styles.Layout.absolute]} />}
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </Modal>
  );
});

export { ImageCarouselModal };
