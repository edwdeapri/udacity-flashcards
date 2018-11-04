import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default function InputButton({ isDisabled, onPress, children }) {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={onPress}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
}
