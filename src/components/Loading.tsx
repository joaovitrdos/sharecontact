import { View, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'

export default function Loading({ color=Colors.colors.primary}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.colors.background}}>
        <Image source={require("../assets/images/logo-transparent(logo).png")} style={styles.foto}/>
    </View>
  )
}

const styles = StyleSheet.create({
  foto: {
    flex: 1,
    width: 100,
    height: 100,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
})