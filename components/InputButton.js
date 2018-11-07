import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import{ global }from '../utils/global';

export default function InputButton({
  backgroundColor,
  borderColor,
  children,
  color,
  isDisabled,
  onPress,
}) {
  return (
    <TouchableOpacity
      disabled={ isDisabled }
      onPress={ onPress }
      style={[
        global.buttonStyle,
        { backgroundColor: backgroundColor,
          borderColor: borderColor,
        },
      ]}>
      <Text style={[
          global.buttonText,
          { color: color },
        ]}>
        { children }
      </Text>
    </TouchableOpacity>
  );
}
