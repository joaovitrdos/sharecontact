import { View, Image, Text, StyleSheet, TouchableOpacity, TouchableOpacityProps, ImageProps } from 'react-native'
import React from 'react'
import { AvatarContacts } from '../components/AvatarContacts'

export type ContactProps = {
  id: string
  name: string
  image?: ImageProps
}

export type Props =  TouchableOpacityProps & {
  contact: ContactProps
  nameColor?: 'primary' | 'secondary' // 👈 nova prop pra cor
}

export function Contact({ contact, nameColor = 'primary', ...rest }: Props) {
  const textColor = nameColor === 'primary' ? '#000' : '#1E90FF' // preto ou azul, por exemplo

  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <AvatarContacts name={contact.name} image={contact.image}/>
      <Text style={[styles.name, { color: textColor }]}>{contact.name}</Text>
    </TouchableOpacity> 
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: "100%",
    gap: 15,
    alignItems: "center"
    
  },
  name: {
    fontWeight: "bold",
    fontSize: 18
  }
})
