import { StyleSheet } from 'react-native';
import { DEVICE_WIDTH, hDP } from '@utils/scaling';
import { colors } from '@utils/colors';

export default StyleSheet.create({
  dims: {
    width: DEVICE_WIDTH,
    height: hDP(60),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bgColor: {
    backgroundColor: colors.whiteF3,
    borderTopWidth: 1,
    borderTopColor: colors.grayE8,
  },
  borderTop: {
    borderTopColor: colors.redE9,
    borderTopWidth: 2,
  },
  buttonStyles: {
    height: '100%',
    width: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
