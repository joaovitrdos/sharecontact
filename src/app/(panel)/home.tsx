import { View, StyleSheet, TouchableOpacity, Alert, SectionList, Text, ActivityIndicator } from 'react-native';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Feather, Ionicons } from '@expo/vector-icons';
import { InputHome } from '../../components/InputContacts';
import { Contact } from '../../components/Contact';
import * as Contacts from 'expo-contacts';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import { AvatarContacts } from '../../components/AvatarContacts';
import FavoriteOutline from '../../assets/icons/FavoriteOutline';
import Favoritesolid from '../../assets/icons/Favoritesolid'; // <-- Novo ícone importado
import { useFavorites } from '../../contexts/FavoriteContext';
import QRCode from 'react-native-qrcode-svg'; // Importando a biblioteca para gerar o QR Code

export default function HomeScreen() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [contact, setContact] = useState(null);
  const [isQRCodeVisible, setIsQRCodeVisible] = useState(false); // Estado para controlar visibilidade do QR Code
  const [isLoading, setIsLoading] = useState(false); // Estado de loading
  const router = useRouter();
  const snapPoints = useMemo(() => ['1%', '50%', '70%'], []);
  const sheetRef = useRef(null);

  const { toggleFavorite, isFavorite } = useFavorites();

  function close() {
    setName('');
  }

  function handleBottomSheetOpen() {
    sheetRef.current?.expand();
  }

  function handleBottomSheetClose() {
    sheetRef.current?.snapToIndex(0);
    setIsQRCodeVisible(false); // Limpa o estado ao fechar o BottomSheet
  }

  async function fetchContacts() {
    try {
      const { status } = await Contacts.requestPermissionsAsync();

      if (status === Contacts.PermissionStatus.GRANTED) {
        const { data } = await Contacts.getContactsAsync({
          name,
          sort: 'firstName',
        });

        const list = data
          .map((c) => ({
            id: c.id,
            name: c.name,
            image: c.image,
          }))
          .reduce((acc, item) => {
            const firstLetter = item.name[0]?.toUpperCase();
            const existingEntry = acc.find((entry) => entry.title === firstLetter);

            if (existingEntry) {
              existingEntry.data.push(item);
            } else {
              acc.push({ title: firstLetter, data: [item] });
            }

            return acc;
          }, []);

        setContacts(list);
      }
    } catch (error) {
      Alert.alert('Contatos', 'Erro ao carregar contatos.');
    }
  }

  async function handleOpenDetails(id: string) {
    const response = await Contacts.getContactByIdAsync(id);
    if (response) {
      setContact(response);
      handleBottomSheetOpen();
      setIsQRCodeVisible(false); // Limpa o estado ao abrir um novo contato
    }
  }

  function handleQRCodeGeneration() {
    setIsLoading(true); // Inicia o loading
    setTimeout(() => {
      setIsQRCodeVisible(true); // Mostra o QR Code após o "loading"
      setIsLoading(false); // Finaliza o loading
    }, 1000); // Simula o tempo de carregamento (pode ser ajustado conforme necessário)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchContacts();
    }, 10);

    return () => clearTimeout(timeout);
  }, [name]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <InputHome>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
              <Feather name='search' size={18} color={Colors.colors.textLight} />
              <InputHome.Field
                placeholder='Search Name...'
                onChangeText={setName}
                value={name}
                autoComplete='off'
                autoCorrect={false}
                autoCapitalize='none'
              />
            </View>
            <TouchableOpacity onPress={close} style={{ marginLeft: -20 }}>
              <Feather name='x' size={18} color={Colors.colors.textLight} />
            </TouchableOpacity>
          </InputHome>
        </View>

        <SectionList
          showsVerticalScrollIndicator={false}
          sections={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Contact contact={item} onPress={() => handleOpenDetails(item.id)} />
          )}
          renderSectionHeader={({ section }) => (
            <Text style={styles.section}>{section.title}</Text>
          )}
          contentContainerStyle={styles.contentList}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 0.5,
                backgroundColor: Colors.colors.textLight,
                marginBottom: 15,
                marginTop: 15,
              }}
            />
          )}
          ListEmptyComponent={
            <Text style={{ color: Colors.colors.textLight, textAlign: 'center', fontSize: 20, marginTop: 60 }}>
              No contacts found
            </Text>
          }
        />
      </View>

      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: Colors.colors.backgroundBottomSheets, borderRadius: 20, borderColor: Colors.colors.dark, borderWidth: 0.2 }}
        handleComponent={() => (
          <View style={{ alignSelf: 'center', paddingTop: 10, paddingBottom: 20 }}>
            <View
              style={{ width: 45, height: 6, backgroundColor: Colors.colors.black, borderRadius: 4 }}
            />
          </View>
        )}
        style={{ paddingBottom: 20 }}
      >
        {contact && (
          <View style={{ padding: 20, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View
              style={{
                borderRadius: 999,
                width: 100,
                height: 100,
                borderWidth: 2,
                borderColor: Colors.colors.primary,
                backgroundColor: Colors.colors.black,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <AvatarContacts name={contact.name} image={contact.image} variant='large' />
            </View>

            <TouchableOpacity
              onPress={() => toggleFavorite(contact)}
              style={{ width: 30, height: 30, position: 'absolute', top: 20, right: 30 }}
            >
              {
                isFavorite(contact.id)
                  ? <Favoritesolid color='#000' />
                  : <FavoriteOutline color='#000' />
              }
            </TouchableOpacity>

            <Text style={{ color: Colors.colors.black, fontSize: 24, fontWeight: 'bold', marginTop: 50 }}>
              {contact.name}
            </Text>

            {contact.phoneNumbers?.length > 0 && (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Feather name='phone' size={18} color={Colors.colors.black} style={{ marginRight: 8 }} />
                <Text style={{ color: Colors.colors.black }}>{contact.phoneNumbers[0].number}</Text>
              </View>
            )}

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 20,
                marginTop: 50,
              }}
            >
              <TouchableOpacity
                style={{
                  width: 160,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  justifyContent: 'center',
                  backgroundColor: Colors.colors.background,
                  padding: 10,
                  borderColor: Colors.colors.black,
                  borderWidth: 1,
                  borderRadius: 20,
                }}
                onPress={handleQRCodeGeneration} // Chama a função para mostrar o QR Code
              >
                <Ionicons name='qr-code' size={24} color={Colors.colors.black} />
                <Text style={{ color: '#000' }}>Share Qr Code</Text>
              </TouchableOpacity>
            </View>

            {/* Mostrar QR Code somente se o estado for verdadeiro */}
            {isLoading ? (
              <ActivityIndicator size="large" color={Colors.colors.primary} style={{ marginTop: 30 }} />
            ) : (
              isQRCodeVisible && (
                <View style={{ marginTop: 50,}}>
                  <QRCode
                    value={JSON.stringify({
                      name: contact.name,
                      phoneNumber: contact.phoneNumbers?.[0]?.number || 'No phone number',
                    })}
                    size={122}
                    color="black"
                    backgroundColor="white"
                  />
                </View>
              )
            )}
          </View>
        )}
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.colors.background,
  },
  header: {
    zIndex: 1,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  section: {
    fontSize: 22,
    color: '#FFF',
    backgroundColor: Colors.colors.primary,
    width: 30,
    height: 30,
    borderRadius: 999,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 32,
  },
  contentList: {
    gap: 12,
  }
})