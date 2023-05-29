import { MOCK_CAROUSEL_IMAGES } from '@utils/__remove__/mocks/images';
import React, { memo, useCallback } from 'react';
import { FlatList, Image, ImageSourcePropType, ListRenderItem, TouchableOpacity, View } from 'react-native';
import { Styles } from '@styles/load';
import { FlexibleListView } from '@components/FlexibleListView';

type imageGalleryViewProps = {
    photoList: Array<string>;
};

const ImageGalleryView: React.FC<imageGalleryViewProps> = ({ photoList }) => {
  const renderPhoto = useCallback(<T = any>(item: T, index: number) => {
    if (index < 2) {
      return (
        <TouchableOpacity style={{ width: 142, height: 190 }}>
          <Image style={[Styles.Layout.w100, Styles.Layout.h100, { resizeMode: 'cover' }, Styles.Layout.borderR5]} source={{ uri: item as string }} />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity style={{ width: 92, height: 122 }}>
        <Image style={[Styles.Layout.w100, Styles.Layout.h100, { resizeMode: 'cover' }, Styles.Layout.borderR5]} source={{ uri: item as string }} />
      </TouchableOpacity>
    );
  }, []);

  return (
    <FlexibleListView
      empty={<View />}
      loader={<View />}
      isLoading={false}
      scrollStyles={[Styles.MarginPadding.pt8]}
      contentContainerStyles={[Styles.MarginPadding.g10, Styles.Layout.wrap, Styles.Layout.max_w_100pc, Styles.Layout.flexCenter]}
      horizontal
      keyExtractor={(item, index) => `${item}${index}`}
      renderItem={renderPhoto}
      items={MOCK_CAROUSEL_IMAGES}
    />
  );
};

export default memo(ImageGalleryView);
