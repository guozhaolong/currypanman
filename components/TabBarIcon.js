import React from 'react';
import { Icon } from 'expo';
import Colors from '../constants/Colors';
import {Platform} from "react-native";

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon.Ionicons
        name={Platform.OS === 'ios'? 'ios-'+this.props.name : 'md-'+this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}