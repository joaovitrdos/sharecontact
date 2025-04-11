import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Colors } from '../constants/Colors'
import { useRouter } from 'expo-router'
import { Feather, SimpleLineIcons } from '@expo/vector-icons'
const BackButton = ({size = 20}) => {

    const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.back()} activeOpacity={0.6} style={styles.container}>
      <SimpleLineIcons name="arrow-left" size={size} color={Colors.colors.white} />
    </TouchableOpacity>
  )
}

export default BackButton

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
})  
