import React, { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { IFlatListRender } from '@type/service';
import { TransitionCarouselItemView } from '@components/TransitionItemView';
import { useBlur, useFocus } from '@reacts/hooks/useNavigations';
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';

type transitionCarouselViewProps = PropsWithChildren<{
    autoscroll: boolean;
    photoList: Array<string>;
    firstIndexActive: number;
    styles?: {
        outerStyles?: {};
        scrollStyles?: {};
        itemStyles?: {};
    }
}>;

const transitionTimeout = 4000;
const TransitionCarouselView: React.FC<transitionCarouselViewProps> = ({ autoscroll, firstIndexActive, photoList, styles }) => {
  const [get, set] = useState(0);
  const listRef = useRef(null);
  const timeout = useRef<TimeoutId | null>(null);
  const backing = useRef(false);

  const getItemLayout = (data: any, index: number) => ({
    length: photoList.length,
    offset: 145 * index,
    index,
  });

  const _renderList = useCallback(({ item, index }: IFlatListRender<string>) => {
    return (
      <TransitionCarouselItemView uri={item} currentIndex={index} activeIndex={get} styles={{}} />
    );
  }, [get, set]);

  const _callAutoscroll = useCallback((index: number) => {
    timeout.current = setTimeout(() => {
      handleAutoscroll(transitionTimeout, index);
    }, transitionTimeout);
  }, [timeout]);

  const handleAutoscroll = useCallback((timer: number, nextIndex: number) => {
    if (listRef.current) {
      if (nextIndex < photoList.length) {
        (listRef.current as FlatList).scrollToIndex({
          index: nextIndex,
          animated: true,
        });
      }
      if (backing.current) {
        if (nextIndex === 0) {
          backing.current = false;
          _callAutoscroll(nextIndex + 1);
          return;
        }
        _callAutoscroll(nextIndex - 1);
      } else {
        if (nextIndex >= photoList.length - 1) {
          backing.current = true;
          _callAutoscroll(nextIndex - 1);
          return;
        }
        _callAutoscroll(nextIndex + 1);
      }
    }
  }, [listRef]);

  const onTouchStart = useCallback(() => {
    clearTimeout(timeout.current as TimeoutId);
    timeout.current = setTimeout(() => {
      handleAutoscroll(transitionTimeout, get + 1);
    }, transitionTimeout + 1);
  }, [listRef]);

  const handleOnScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;
    // make sure that is this index is convenient and right (rewrite this stuff)
    const currentIndex = Math.round(contentOffset / 145);
    if (get !== currentIndex) {
      set(currentIndex);
    }
  }, [set, get]);

  useFocus(() => {
    if (photoList.length > 0 && autoscroll) {
      _callAutoscroll(get + 1);
    }
  }, []);

  useBlur(() => {
    if (timeout.current !== null) {
      clearTimeout(timeout.current);
    }
    set(1);
  }, []);

  return (
    <FlatList
      horizontal
      pagingEnabled
      decelerationRate={0}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      onTouchStart={() => { autoscroll && onTouchStart(); }}
      snapToAlignment="center"
      onScroll={handleOnScroll}
      ref={listRef}
      keyExtractor={(item) => item}
      data={photoList}
      renderItem={_renderList as unknown as ListRenderItem<string>}
      getItemLayout={getItemLayout}
    />
  );
};

export { TransitionCarouselView };
