import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import Header from '../../components/Header';
import { AvatarContacts } from '../../components/AvatarContacts';
import { useFavorites } from '../../contexts/FavoriteContext';
import { Colors } from '../../constants/Colors';

export default function FavoriteScreen() {
  const { favorites, toggleFavorite } = useFavorites();

  // Ordena os favoritos em ordem alfabética por nome
  const sortedFavorites = [...favorites].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const handleRemoveFavorite = (contactId: string) => {
    const contact = favorites.find((c) => c.id === contactId);
    if (!contact) return;

    Alert.alert(
      'Remove Favorite',
      'Are you sure you want to remove this contact from your favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => toggleFavorite(contact),
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.contactItem}>
      <AvatarContacts name={item.name} image={item.image} />

      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        {item.phoneNumbers?.[0] && (
          <Text style={styles.contactNumber}>{item.phoneNumbers[0].number}</Text>
        )}
      </View>

      <TouchableOpacity
        onPress={() => handleRemoveFavorite(item.id)}
        style={styles.trashButton}
      >
        <Feather name="trash-2" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Favorites" showBackButton={false} />

      <FlatList
        data={sortedFavorites} // Aqui usamos a lista ordenada
        keyExtractor={(item) => item.id|| item.name}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No favorites found</Text>
        }
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colors.background,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingTop: 20,
  },
  emptyText: {
    color: Colors.colors.textLight,
    textAlign: 'center',
    fontSize: 18,
    marginTop: 60,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  contactInfo: {
    flex: 1,
    marginLeft: 12,
    gap: 4,
  },
  contactName: {
    fontSize: 18,
    color: Colors.colors.white,
  },
  contactNumber: {
    fontSize: 14,
    color: Colors.colors.textLight,
  },
  trashButton: {
    padding: 8,
  },
  separator: {
    height: 0.3,
    backgroundColor: Colors.colors.textLight,
    marginVertical: 8,
  },
});
