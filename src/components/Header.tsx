import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import BackButton from './BackButton';
import { useAuth } from '../contexts/AuthContext';
import { Colors } from '../constants/Colors';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  mb?: number;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = true, mb = 10 }) => {
  const router = useRouter();
  const { user } = useAuth();
  const showBack = showBackButton && router.canGoBack();

  return (
    <View style={[styles.container, { marginBottom: mb }]}>
      {showBack && (
        <View style={styles.backButton}>
          <BackButton />
        </View>
      )}
      <Text style={styles.title}>{title || ''}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.colors.background,
  } as ViewStyle,
  backButton: {
    position: 'absolute',
    left: 10,
  } as ViewStyle,
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.colors.white,
  } as TextStyle,
});
