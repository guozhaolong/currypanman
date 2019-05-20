import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import Colors from '../constants/Colors'

export const Button = ({ title, children, style, textStyle, ...rest }) => (
  <TouchableOpacity activeOpacity={0.8} style={[styles.button, style]} {...rest}>
    <Text style={[styles.text, textStyle]}>{title || children}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.primary,
    borderWidth: StyleSheet.hairlineWidth,
  },
  text: {
    fontSize: 16,
    color: Colors.primary,
  },
})

export default Button