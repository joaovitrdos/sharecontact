import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Alert, Linking } from 'react-native';
import * as Contacts from 'expo-contacts'; // Importando a API de contatos
import { Colors } from '../../constants/Colors'; 
import { CameraView, useCameraPermissions } from "expo-camera";
import Header from '../../components/Header';

export default function QRCodeScreen() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const qrCodeLock = useRef(false);

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission();

      if (!granted) {
        return Alert.alert('Camera', 'Permission is required to use this feature.');
      }
      setModalIsVisible(true);
      qrCodeLock.current = false;
    } catch (error) {
      setModalIsVisible(true);
    }
  }

  // Função para processar o QR Code e salvar o contato no dispositivo
  async function handleQrCodeRead(data: string) {
    setModalIsVisible(false);

    try {
      const parsed = JSON.parse(data);

      // Validação simples dos dados
      if (!parsed.name || !parsed.phoneNumber) {
        throw new Error('Dados incompletos no QR Code');
      }

      // Criar um objeto de contato com o nome e telefone
      const contact = {
        [Contacts.Fields.FirstName]: parsed.name,
        [Contacts.Fields.PhoneNumbers]: [
          {
            label: 'mobile',
            number: parsed.phoneNumber,
          },
        ],
      };

      // Solicitar permissão para adicionar contatos
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        // Adicionar o contato
        await Contacts.addContactAsync(contact);
        Alert.alert('Sucesso', 'Contato adicionado com sucesso!');
      } else {
        Alert.alert('Permissão Negada', 'Não foi possível adicionar o contato sem permissão.');
      }
    } catch (err) {
      console.error('Erro ao adicionar contato:', err);
      Alert.alert('Erro', 'O QR Code não contém dados válidos de contato.');
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.colors.background }}>
      <Header title="QR Code" showBackButton={false} />

      <View style={styles.container}>
        <TouchableOpacity style={styles.open} onPress={handleOpenCamera}>
          <Text style={styles.text}>Open Camera</Text>
        </TouchableOpacity>

        <Modal visible={modalIsVisible} style={{ flex: 1 }}>
          <CameraView
            style={{ flex: 1 }}
            facing="back"
            onBarcodeScanned={({ data }) => {
              if (data && !qrCodeLock.current) {
                qrCodeLock.current = true;
                setTimeout(() => handleQrCodeRead(data), 500);
              }
            }}
          />

          <TouchableOpacity
            style={styles.footer}
            onPress={() => setModalIsVisible(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.colors.background,
    fontSize: 16,
  },
  open: {
    backgroundColor: Colors.colors.black,
    fontSize: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 40,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center', 
    justifyContent: 'center', 
    height: 40,
    backgroundColor: Colors.colors.black,
    padding: 10,
    borderRadius: 30,
    marginHorizontal: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.colors.background,
    fontSize: 16,
  },
});
