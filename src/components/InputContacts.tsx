import { StyleSheet, TextInput, View, ViewProps, TextInputProps } from "react-native";
import { Colors } from "../constants/Colors";

type InputHomeProps = ViewProps & {
  children?: React.ReactNode;
};

function InputHome({ children, style, ...rest }: InputHomeProps) {
  return (
    <View style={[styles.container, style]} {...rest}>
      {children}
    </View>
  );
}

function Field({ style, ...rest }: TextInputProps) {
  return <TextInput style={[styles.input, style]} {...rest} />;
}

// Atribuição correta do subcomponente
const InputHomeWithField = Object.assign(InputHome, { Field });

export { InputHomeWithField as InputHome };

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF', // Usando sua constante de cores
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: Colors.colors.textDark,
    paddingHorizontal: 10,
    height: 50,
    width: '100%',
  },
  input: {
    width: '100%',
    flex: 1,
    fontSize: 16,
    color: '#000',
    borderColor: Colors.colors.textDark,
    // Usando sua constante de cores
  },
});