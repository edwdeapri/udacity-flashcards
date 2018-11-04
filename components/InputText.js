import React from 'react';
import { TextInput } from 'react-native';

export default function InputText({ handleChange, value, placeholder }) {
  return (
    <TextInput
      onChangeText={handleChange}
      value={value}
      placeholder={placeholder}
    />
);
}
