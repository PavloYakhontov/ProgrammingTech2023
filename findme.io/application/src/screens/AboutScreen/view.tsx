import React from 'react';
import { Button, Text } from 'react-native';

import { ScreenLayoutView } from '@components/common/hoc/ScreenLayout';
import { __app__ } from '@core/MainActivity';

export type aboutScreenPresenterProps = {};

const AboutScreenPresenter: React.FC<aboutScreenPresenterProps> = ({}) => {
  return (
    <ScreenLayoutView>
      <Button title="calc" onPress={() => console.log(__app__.geo.calculateKilometers({ x: 48.612962, y: 22.307024 }, { x: 48.639202, y: 22.313950 }))} />
    </ScreenLayoutView>
  );
};

export { AboutScreenPresenter };
