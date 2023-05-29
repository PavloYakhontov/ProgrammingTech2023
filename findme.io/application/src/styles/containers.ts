import { StyleSheet } from 'react-native';
import { DEVICE_WIDTH, hDP, wDP } from '@utils/scaling';
import { colors } from '@utils/colors';

export default StyleSheet.create({
  line: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
  },
  screenLayout: {
    paddingHorizontal: wDP(40),
  },
  serviceScreenLayoutHeader: {
    paddingTop: hDP(20),
  },
  serviceScreenLayout: {
    paddingTop: hDP(80),
  },
  grayBorder1: {
    borderColor: colors.grayE8,
    borderWidth: 1,
  },
  animatedInputContainer: {
    backgroundColor: colors.whiteFF,
    borderColor: colors.grayE8,
    borderWidth: 1,
    borderRadius: 15,
    zIndex: 9,
    height: hDP(60),
    paddingHorizontal: wDP(15),
  },
  borderRedBottom: {
    borderBottomColor: colors.redE9,
    borderBottomWidth: 2,
  },
  animatedInputPlaceholder: {
    backgroundColor: colors.whiteFF,
    zIndex: 10,
    paddingHorizontal: wDP(6),
    marginLeft: wDP(10),
  },
  blackBorder1: {
    borderColor: colors.black00,
    borderWidth: 1,
  },
  redBorder3: {
    borderColor: colors.redE9,
    borderWidth: 3,
  },
  whiteBorder2: {
    borderColor: colors.whiteFF,
    borderWidth: 2,
  },
  redBorder1: {
    borderColor: colors.redE9,
    borderWidth: 1,
  },
  redBackgroundColor: {
    backgroundColor: colors.redE9_10,
  },
  redE9BackgroundColor: {
    backgroundColor: colors.redE9,
  },
  whiteFFBackgroundColor: {
    backgroundColor: colors.whiteFF,
  },
  whiteFF50BackgroundColor: {
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  pinContainer: {
    width: wDP(61),
    height: hDP(34),
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  stepContainer: {
    width: wDP(20),
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  grayBorderContainer: {
    backgroundColor: colors.black00_50,
    borderRadius: 7,
  },
  stepItem: {
    backgroundColor: 'rgba(255,255,255, 0.5)',
    width: wDP(4),
    height: wDP(4),
    borderRadius: 100,
  },
  discoverCardInfo: {
    position: 'absolute',
    zIndex: 999,
    left: 0,
    bottom: 0,
    width: '100%',
    minHeight: hDP(120),
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    paddingTop: 10,
  },
  dotsLayout: {
    position: 'absolute',
    zIndex: 999,
    right: 0,
    top: hDP(150),
  },
  mapLayout: {
    position: 'absolute',
    zIndex: 999,
    left: 16,
    top: 20,
  },
  tagBody: {
    paddingHorizontal: hDP(8),
    paddingVertical: hDP(6),
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.redE9,
  },
  interestsBody: {
    paddingHorizontal: hDP(8),
    paddingVertical: hDP(6),
    backgroundColor: colors.redE9,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.redE9,
  },
  profileBlock: {
    zIndex: 15,
    marginBottom: hDP(110),
    position: 'relative',
    top: -40,
    backgroundColor: 'white',
    borderTopStartRadius: wDP(45),
    borderTopEndRadius: wDP(45),
    paddingHorizontal: wDP(40),
    paddingVertical: wDP(30),
    height: '100%',
    gap: hDP(30),
  },
  roundAvatar: {
    borderColor: colors.redE9,
    borderWidth: 3,
    borderRadius: 999,
  },
  fullScreenBody: {
    width: DEVICE_WIDTH,
    height: '100%',
    backgroundColor: 'transparent',
  },
  matchesCardActions: {
    width: '100%',
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  matchesCardBody: {
    backgroundColor: colors.whiteFF,
    width: wDP(140),
    height: hDP(200),
    borderRadius: 15,
    overflow: 'hidden',
  },
});
