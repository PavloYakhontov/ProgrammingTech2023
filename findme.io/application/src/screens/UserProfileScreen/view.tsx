import React, { useCallback } from 'react';

import DotsIcon from '@assets/svg/dots.svg';
import SettingsGearIcon from '@assets/svg/settings_val.svg';
import { ScreenLayoutView } from '@components/common/hoc/ScreenLayout';
import { MainHeaderView } from '@core/Headers/MainHeader';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { colors } from '@utils/colors';
import { Styles } from '@styles/load';
import { hDP } from '@utils/scaling';
import { FieldRowView } from '@components/UserProfileRowView';
import { ImageButtonView } from '@components/ImageButtonView';
import ReadMoreTextView from '@components/ReadMoreTextView';
import { MOCK_INTERESTS, MOCK_TAGS } from '@utils/__remove__/mocks/tags_interests';
import TextPathView from '@components/TextPathView';
import ImageGalleryView from '@components/ImageGalleryView';
import { FlexibleListView } from '@components/FlexibleListView';
import AnimatedAvatarView from '@components/common/animated/AnimatedAvatarView';
import AnimatedHeaderView from '@components/common/animated/AnimatedHeaderView';

export type userProfileScreenPresenterProps = {
  handleOnScroll(event: NativeSyntheticEvent<NativeScrollEvent>): void;
  headerImageAnim: Animated.Value;
};

const UserProfileScreenPresenter: React.FC<userProfileScreenPresenterProps> = ({ handleOnScroll, headerImageAnim }) => {
  return (
    <ScreenLayoutView backgroundColor={colors.whiteFF}>
      <AnimatedHeaderView
        animationValue={headerImageAnim}
        inputValue={[0, 90]}
        outputValue={[0, 1]}
      />
      <ScrollView
        onScroll={handleOnScroll}
        bounces
        pagingEnabled={false}
        scrollEnabled
      >
        <View style={[Styles.Container.screenLayout, Styles.Container.serviceScreenLayoutHeader, Styles.Layout.absolute, Styles.Layout.zIndex10]}>
          <MainHeaderView
            rightButton={(
              <ImageButtonView
                onPress={() => {}}
                styles={[Styles.Button.smallImageButton, Styles.Layout.flexCenter]}
                width={18}
                height={18}
                Icon={DotsIcon}
              />
            )}
          />
        </View>
        <AnimatedAvatarView
          animationValue={headerImageAnim}
          inputValue={[0, 90]}
          outputValue={[1, 0]}
        />
        <View style={Styles.Container.profileBlock}>
          {/* ~Username and age~ */}
          <FieldRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text="Jessica Parker, 23"
          >
            <Text style={Styles.Text.smallText14Black_070}>Current age - 23 years old</Text>
          </FieldRowView>
          {/* ~City and country~ */}
          <FieldRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text="location"
          >
            <Text style={Styles.Text.smallText14Black_070}>Current age - 23 years old</Text>
          </FieldRowView>
          {/* ~About~ */}
          <FieldRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text="about"
          >
            <ReadMoreTextView
              expandLines={3}
              buttonText="read_more"
              unfoldText="read_less"
              style={[Styles.Text.smallText14Black_070, Styles.MarginPadding.mv3]}
              text="My name is Jessica Parker and I enjoy meeting new people and finding ways to help them have an uplifting experience.
            I enjoy reading My name is Jessica Parker and I enjoy meeting new people
            and finding ways to help them have an uplifting experience."
            />
          </FieldRowView>
          {/* Gender */}
          <FieldRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text="gender"
          >
            <Text style={Styles.Text.smallText14Black_070}>Male</Text>
          </FieldRowView>
          {/* Interests */}
          <FieldRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text="interests"
          >
            <FlexibleListView
              empty={<View />}
              loader={<View />}
              isLoading={false}
              horizontal
              keyExtractor={(item) => `${item.id}`}
              items={MOCK_INTERESTS}
              scrollStyles={[Styles.MarginPadding.pt8]}
              contentContainerStyles={[Styles.MarginPadding.g6, Styles.Layout.max_w_100pc]}
              renderItem={(item, index) => {
                return (
                  <TextPathView<typeof item>
                    containerStyle={Styles.Container.interestsBody}
                    textStyle={Styles.Text.smallTextWhiteBold14}
                    text={`${item.label}`}
                    val={item}
                    onPress={(val) => console.log(val)}
                  />
                );
              }}
            />
          </FieldRowView>
          {/* Tags */}
          <FieldRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text="tags"
          >
            <FlexibleListView
              empty={<View />}
              loader={<View />}
              isLoading={false}
              horizontal
              keyExtractor={(item) => `${item.id}`}
              items={MOCK_TAGS}
              wrapped
              scrollStyles={[Styles.MarginPadding.pt8]}
              contentContainerStyles={[Styles.MarginPadding.g6]}
              renderItem={(item, index) => {
                return (
                  <TextPathView<typeof item>
                    containerStyle={Styles.Container.tagBody}
                    textStyle={Styles.Text.smallTextRedBold14}
                    text={`#${item.label}`}
                    val={item}
                    onPress={(val) => console.log(val)}
                  />
                );
              }}
            />
          </FieldRowView>
          {/* Gallery */}
          <FieldRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text="gallery"
            rightSide={(
              <ImageButtonView
                styles={[Styles.Button.gearImageButton, Styles.Layout.flexCenter]}
                width={24}
                height={24}
                Icon={SettingsGearIcon}
              />
)}
          >
            <ImageGalleryView photoList={[]} />
          </FieldRowView>
        </View>
      </ScrollView>
    </ScreenLayoutView>
  );
};

export { UserProfileScreenPresenter };
