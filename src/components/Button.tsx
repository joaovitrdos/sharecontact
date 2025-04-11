import { TouchableOpacity, Text, StyleSheet, ActivityIndicator} from 'react-native';
import { Colors } from '../constants/Colors';

export default function Button({ title, onPress, loading, disabled }: any) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled}>
      <Text style={styles.buttonText}>{title}</Text>
      {loading && <ActivityIndicator size="small" color={Colors.colors.primary} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: Colors.colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.colors.background,
    fontSize: 22,
    fontWeight: 'bold',
  },
});
