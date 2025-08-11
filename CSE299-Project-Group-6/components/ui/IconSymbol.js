
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Platform } from 'react-native';

export default function IconSymbol({ name, size = 24, color = 'black', ...props }) {
  return <MaterialIcons name={name} size={size} color={color} {...props} />;
}
