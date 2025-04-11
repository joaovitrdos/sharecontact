import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Login from './login';
import Loading from '../components/Loading';
import { Colors } from '../constants/Colors';

export default function ActiveScreen() {
  return <Loading />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.colors.background
  },
});
