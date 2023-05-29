import { PressableTextView } from '@components/PressableTextView';
import { Styles } from '@styles/load';
import { colors } from '@utils/colors';
import React, { memo, useCallback, useState } from 'react';
import { Text, View } from 'react-native';

type readMoreTextViewProps = {
    text: string;
    buttonText: string;
    expandLines: number;
    unfoldText: string;
    style?: {};
};

const ReadMoreTextView: React.FC<readMoreTextViewProps> = ({ buttonText, expandLines, text, unfoldText, style }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleOnPress = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <View>
      <Text style={style} numberOfLines={!isExpanded ? expandLines : void 0}>{text}</Text>
      <PressableTextView
        onPress={handleOnPress}
        styles={Styles.Text.smallTextRedBold14}
        text={isExpanded ? unfoldText : buttonText}
        color={colors.redE9}
      />
    </View>
  );
};

export default memo(ReadMoreTextView);
