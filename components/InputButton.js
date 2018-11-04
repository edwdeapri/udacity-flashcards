import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default function InputButton({ onPress, children, isDisabled }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={isDisabled}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
}
