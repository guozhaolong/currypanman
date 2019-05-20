import { Dimensions } from 'react-native';
import {Constants} from "expo";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  width:width,
  height:height,
  statusBarHeight: Constants.statusBarHeight,
  topBarHeight: 40,
  isSmallDevice: width < 375,
};
