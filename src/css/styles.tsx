import { StatusBar, StyleSheet } from 'react-native';
import dynamicStyles from './dynamicStyles';
import colorStyles from './colorStyles';
import fontStyles from './fontStyles';
import flexStyles from './flexStyles';

const statusBarHeight = StatusBar.currentHeight as number;
const notchHeight = statusBarHeight !== undefined ? statusBarHeight + 10 : statusBarHeight;

interface stylesInterface {
  [index: string]: {
    [key: string]: any
  }
};

const styles: stylesInterface = StyleSheet.create({
  notchIgnore: {
    marginTop: notchHeight
  },

  textCenter: {
    textAlign: 'center'
  },

  textLeft: {
    textAlign: 'left'
  },

  textFifteen: {
    fontSize: 15
  },

  textTwenty: {
    fontSize: 20
  },

  textThirty: {
    fontSize: 30
  },

  brThirty: {
    borderRadius: 30
  },

  'w-full': {
    width: '100%'
  },

  zIndexOne: {
    zIndex: 1
  },

  zIndexTwo: {
    zIndex: 2
  },

  positionAbsolute: {
    position: 'absolute'
  },

  ...dynamicStyles,

  ...fontStyles,

  ...colorStyles,

  ...flexStyles
});

export default styles;
