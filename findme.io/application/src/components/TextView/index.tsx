import React, { PropsWithChildren } from 'react';
import { Text } from 'react-native';
import i18next from '@src/locale/i18next';

type textViewProps = PropsWithChildren<{
  text: string;
  styles?: {};
  numberOfLines?: number;
  vars?: {[key: string]: string};
}>;
const TextView: React.FC<textViewProps> = ({
  text,
  numberOfLines,
  styles,
  children,
  vars,
}) => {
  return (
    <Text numberOfLines={numberOfLines} style={styles}>
      {i18next.t(text, { ...vars })}
    </Text>
  );
};

export { TextView };
