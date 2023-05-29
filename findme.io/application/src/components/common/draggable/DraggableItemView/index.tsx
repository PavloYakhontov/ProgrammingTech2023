import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  GestureResponderEvent,
  Image, NativeScrollEvent, NativeSyntheticEvent,
  PanResponder,
  Text,
  View,
} from 'react-native';
import { DEVICE_WIDTH, hDP, wDP } from '@utils/scaling';
import { UserDistanceView } from '@components/UserDistanceView';
import { StepDotsView } from '@components/StepDotsView';
import { Styles } from '@src/styles/load';
import { IUserDiscoverModelShort } from '@type/models/user';
import { panAndSkewAnimation } from '@utils/helpers';

type draggableItemViewProps = {
  index: number;
  model: IUserDiscoverModelShort;
  handleLikePress(): void;
  handleSkipPress(): void;
};
type draggableItemViewState = {
  activeImage: number;
};

const DraggableItemView: React.FC<draggableItemViewProps> = ({ index, model }) => {
  const [getState, setState] = useState<draggableItemViewState>({
    activeImage: 0,
  });
  const pan = useRef(new Animated.ValueXY({ x: wDP(0), y: 0 })).current;
  const skewValue = useRef(new Animated.Value(0)).current;
  const calculatedDistance = useMemo(() => {
    return Math.round(Math.random() * 10);
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        const { dx } = gestureState;
        skewValue.flattenOffset();
        skewValue.setValue(dx);
        Animated.event([null, {
          dx: pan.x,
        }], { useNativeDriver: false })(e, gestureState);
      },
      onPanResponderRelease: (event: GestureResponderEvent) => {
        console.log(event.nativeEvent);
        const { pageX } = event.nativeEvent;
        if (pageX <= 30 || pageX >= DEVICE_WIDTH - 30) {

        } else {
          pan.flattenOffset();
          skewValue.flattenOffset();
          panAndSkewAnimation(pan, skewValue);
        }
      },
    }),
  ).current;

  const handleOnScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const viewSize = event.nativeEvent.layoutMeasurement.height;
    const contentOffset = event.nativeEvent.contentOffset.y;
    const currentIndex = Math.round(contentOffset / viewSize);
    if (currentIndex !== getState.activeImage) {
      setState((prev) => ({ ...prev, activeImage: currentIndex }));
    }
  }, [getState]);

  const renderImageList = ({ item, index }: {item: string; index: number}) => {
    return (
      <Image
        style={[
          Styles.Layout.w100,
          Styles.Layout.borderR15,
          Styles.Layout.h480,
          Styles.Layout.cover,
        ]}
        source={require('@assets/img/girl1.png')}
      />
    );
  };

  return (
    <Animated.View
      renderToHardwareTextureAndroid
      style={[Styles.Layout.absolute,
        Styles.Layout.w100,
        Styles.Layout.borderR15, {
          transform: [
            { translateX: pan.x },
            { translateY: pan.y },
            { skewY: skewValue.interpolate({
              inputRange: [0, DEVICE_WIDTH],
              outputRange: ['0deg', '30deg'],
            }),
            }],
        }]}
      {...panResponder.panHandlers}
    >
      <View style={[Styles.Layout.w100, Styles.Layout.h480]}>
        <View style={Styles.Container.mapLayout}>
          <UserDistanceView distance={`${calculatedDistance} km`} />
        </View>
        <View style={Styles.Container.dotsLayout}>
          <StepDotsView activeIndex={getState.activeImage} count={model.images.length} />
        </View>
        <View style={[Styles.Container.discoverCardInfo, Styles.MarginPadding.ph15]}>
          <Text numberOfLines={2} style={Styles.Text.mediumText24White}>
            {model.full_name}
            ,
            {' '}
            {model.age}
          </Text>
          <Text numberOfLines={4} style={Styles.Text.smallText16White}>{model.details}</Text>
        </View>
        <View>
          <FlatList
            onScroll={handleOnScroll}
            data={model.images || []}
            renderItem={renderImageList}
            keyExtractor={(item, index) => `${item}${index}`}
            disableScrollViewPanResponder
            decelerationRate="fast"
            pagingEnabled
            horizontal={false}
          />
        </View>
      </View>
    </Animated.View>
  );
};

export { DraggableItemView };
