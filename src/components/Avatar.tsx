import React from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';
import { Colors } from '../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

interface AvatarProps {
  name: string;
  size?: number;
  rounded?: number;
  style?: ViewStyle;
}

const Avatar: React.FC<AvatarProps> = ({ name, size = 150, rounded = 999, style = {} }) => {
  const firstLetter = name?.charAt(0)?.toUpperCase() || '?';

  return (
    <LinearGradient
      colors={['#8234E9', '#ffffff']} 
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[
        {
          width: size,
          height: size,
          borderRadius: rounded,
        },
        styles.avatar,
        style,
      ]}
    >
      <Text style={[styles.text, { fontSize: size / 2 }]}>{firstLetter}</Text>
    </LinearGradient>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.colors.dark,
    overflow: 'hidden',
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
