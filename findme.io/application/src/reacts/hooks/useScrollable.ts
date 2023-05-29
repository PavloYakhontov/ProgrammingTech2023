import { useCallback, useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

export const useScrollable = <T extends { [key: string]: any }>(direction: 'x' | 'y', widthOrHeight: number, defaultIndex: number, type: 'scrollview' | 'flatlist') => {
  const scrollableRef = useRef<T>(null);
  const [getActiveIndex, setActiveIndex] = useState(defaultIndex);

  const handleButtonScroll = useCallback((index: number) => {
    if (scrollableRef && scrollableRef.current) {
      if (type === 'scrollview') {
        scrollableRef.current.scrollTo({
          animated: true,
          ...(direction === 'x' ? { x: widthOrHeight * index } : { y: widthOrHeight * index }),
        });
      } else {
        scrollableRef.current.scrollToOffset({
          offset: widthOrHeight * index,
          animated: true,
        });
      }
    }
  }, [direction, widthOrHeight]);

  const handleOnScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset } = event.nativeEvent;
    const viewSize = direction === 'x' ? layoutMeasurement.width : layoutMeasurement.height;
    const offset = direction === 'x' ? contentOffset.x : contentOffset.y;
    const currentIndex = Math.round(offset / viewSize);
    if (currentIndex !== getActiveIndex) {
      setActiveIndex(currentIndex);
    }
  }, [getActiveIndex, setActiveIndex]);

  return {
    scrollableRef,
    getActiveIndex,
    setActiveIndex,
    handleButtonScroll,
    handleOnScroll,
  };
};
