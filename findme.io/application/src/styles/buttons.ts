import { StyleSheet } from 'react-native';
import { colors } from '@utils/colors';
import { hDP, wDP } from '@utils/scaling';

export default StyleSheet.create({
  primaryButton: {
    backgroundColor: colors.redE9,
    borderRadius: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hDP(18),
  },
  secondaryButton: {
    backgroundColor: colors.whiteFF,
    borderRadius: 15,
    borderColor: colors.whiteF3,
    borderWidth: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hDP(18),
  },
  imageButton: {
    backgroundColor: colors.whiteFF,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.whiteF3,
    width: wDP(64),
    height: wDP(64),
  },
  smallImageButton: {
    backgroundColor: colors.whiteFF,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.whiteF3,
    width: wDP(52),
    height: wDP(52),
  },
  gearImageButton: {
    backgroundColor: colors.whiteFF,
    width: wDP(24),
    height: wDP(24),
  },
  matchesActions: {
    backgroundColor: 'transparent',
    width: '50%',
    height: hDP(40),
  },
  bigRoundedCenterButton: {
    width: wDP(99),
    height: wDP(99),
    borderRadius: 100,
  },
  smallRoundedCenterButton: {
    width: wDP(78),
    height: wDP(78),
    borderRadius: 100,
  },
});
