import React from 'react';
import { View } from 'react-native';
import { hDP, wDP } from '@utils/scaling';

import { UserActionButtonsView } from '@components/UserActionButtonsView';
import { Styles } from '@styles/load';
import { user_short } from '@utils/__remove__/mocks/usermodel';
import { DraggableItemView } from '../DraggableItemView';

type draggableContainerViewProps = {
  handleLikePress(): void;
  handleSkipPress(): void;
  handleFavoritePress(): void;
};

const DraggableContainerView: React.FC<draggableContainerViewProps> = ({ handleFavoritePress, handleLikePress, handleSkipPress }) => {
  const renderMatchingCards = (): Array<JSX.Element> | null => {
    if (!user_short || user_short.length <= 0) {
      return null;
    }
    return user_short.map((user, index) => {
      return (
        <DraggableItemView
          handleSkipPress={handleSkipPress}
          handleLikePress={handleLikePress}
          key={user.user_hash}
          model={user}
          index={index}
        />
      );
    });
  };

  return (
    <View style={{ paddingHorizontal: wDP(40), width: '100%' }}>
      <View
        style={[{
          width: '100%',
          height: hDP(480),
          backgroundColor: 'white',
          position: 'relative',
          marginTop: hDP(24),
        },
        Styles.Container.grayBorder1,
        Styles.Layout.borderR15]}
      >
        {/* TODO: EMPTY VIEW HERE */}
        {renderMatchingCards()}
      </View>
      <UserActionButtonsView
        handleFavoritePress={handleFavoritePress}
        handleLikePress={handleLikePress}
        handleSkipPress={handleSkipPress}
      />
    </View>
  );
};

export { DraggableContainerView };
