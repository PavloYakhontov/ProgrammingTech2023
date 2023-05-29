import { IUserDiscoverModelShort, IUserDiscoverType } from '@type/models/user';
import React, { memo } from 'react';
import { userSectionShort } from '@utils/__remove__/mocks/usermodel';
import { SectionList, Text, View } from 'react-native';
import { MatchesItemView } from '@components/list-items/MatchesItemView';
import { renderColumnsInSection } from '@screens/DiscoverScreen/utils';
import { Styles } from '@styles/load';
import { LineView } from '@components/LineView';
import { TextView } from '@components/TextView';

type matchesListViewProps = {
    type: IUserDiscoverType;
};

const MatchesListView: React.FC<matchesListViewProps> = ({ type }) => {
  return (
    <SectionList
      contentContainerStyle={Styles.MarginPadding.pb100}
      sections={userSectionShort}
      renderSectionHeader={({ section: { title } }) => (
        <View style={[Styles.Layout.w100, Styles.Layout.flexCenter, Styles.MarginPadding.mt20, Styles.MarginPadding.mb10]}>
          <LineView paddingTop={2} width="25%" height={0.5} />
          <Text style={[Styles.Text.smallText12_40Black, Styles.Text.textCenter, Styles.Layout.w20pc]}>{title}</Text>
          <LineView paddingTop={2} width="25%" height={0.5} />
        </View>
      )}
      renderItem={renderColumnsInSection<IUserDiscoverModelShort>((model) => (
        <MatchesItemView type={type} model={model} />
      ),
      (items) => (
        <View
          style={[
            Styles.Layout.w100,
            Styles.Layout.flexRow,
            Styles.Layout.jc_sb,
            Styles.MarginPadding.ph40,
            Styles.MarginPadding.mb15,
          ]}
        >
          {items}
        </View>
      ))}
    />
  );
};

export default memo(MatchesListView);
