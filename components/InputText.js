import React from 'react';
import { TextInput } from 'react-native';

export default function InputText({ handleChange, placeholder, value }) {
  return (
    <TextInput
      onChangeText={handleChange}
      placeholder={placeholder}
      value={value}
    />
);
}
