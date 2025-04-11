import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'

const Input = (props: any) => {
  return (
    <View style={[styles.container, props.containerStyle && props.containerStyle]}>
    {
        props.icon && props.icon
    }
    <TextInput
    style={{flex: 1, color: Colors.colors.white}}
    placeholderTextColor={Colors.colors.textLight}
    ref={props.inputRef && props.inputRef}
    {...props}
    />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 0.4,
    borderColor: Colors.colors.textLight,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
})