import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { usePersonaStore } from '@/store/personaStore';
import { PersonaListItem } from '@/components/PersonaListItem';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeaderOptions } from '@/components/HeaderOptions';
import { spacing, colors} from '@/theme';

export default function PersonasScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { personas, deletePersona, toggleFavorite, initializeDefaultPersonas } =
    usePersonaStore();
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);

  // Initialize default personas if needed
  useEffect(() => {
    initializeDefaultPersonas();
  }, [initializeDefaultPersonas]);

  const insets = useSafeAreaInsets();

  // Sort personas: favorites first, then by most recent message
  const sortedPersonas = [...personas].sort((a, b) => {
    // Favorites first
    if (a.favorite && !b.favorite) return -1;
    if (!a.favorite && b.favorite) return 1;

    // Then by most recent message
    const aLastMessage =
      a.messages && a.messages.length > 0
        ? a.messages[a.messages.length - 1].timestamp
        : 0;
    const bLastMessage =
      b.messages && b.messages.length > 0
        ? b.messages[b.messages.length - 1].timestamp
        : 0;

    return bLastMessage - aLastMessage;
  });

  const handleLongPress = (id: string) => {
    setSelectedPersona(id);
  };

  const handleCancelSelection = () => {
    setSelectedPersona(null);
  };

  const handleEdit = (id: string) => {
    router.push(`/persona/edit?id=${id}`);
    setSelectedPersona(null);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Persona',
      'Are you sure you want to delete this persona? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            deletePersona(id);
            setSelectedPersona(null);
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleExport = (id: string) => {
    // This would be implemented with file system access
    Alert.alert(
      'Export',
      'Chat history export feature will be implemented soon.'
    );
    setSelectedPersona(null);
  };

  const handleToggleFavorite = (id: string) => {
    toggleFavorite(id);
    setSelectedPersona(null);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? '#121212' : '#F5F5F5' },
      ]}
    >
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top,
            backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
            borderBottomColor: isDark ? '#333333' : '#DDDDDD',
          },
        ]}
      >
        {selectedPersona ? (
          <HeaderOptions
            isDark={isDark}
            onCancel={handleCancelSelection}
            onEdit={() => handleEdit(selectedPersona)}
            onDelete={() => handleDelete(selectedPersona)}
            onExport={() => handleExport(selectedPersona)}
            onToggleFavorite={() => handleToggleFavorite(selectedPersona)}
          />
        ) : (
          <Text
            style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}
          >
            Introvert Chat
          </Text>
        )}
      </View>

      {personas.length === 0 ? (
        <View style={styles.emptyState}>
          <Text
            style={[
              styles.emptyStateText,
              { color: isDark ? '#FFFFFF' : '#000000' },
            ]}
          >
            You don't have any personas yet.
          </Text>
          <Text
            style={[
              styles.emptyStateSubtext,
              { color: isDark ? '#BBBBBB' : '#666666' },
            ]}
          >
            Create one by tapping the + button below.
          </Text>
        </View>
      ) : (
        <FlatList
          data={sortedPersonas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PersonaListItem
              persona={item}
              isSelected={selectedPersona === item.id}
              onPress={() => router.push(`/persona/chat?id=${item.id}`)}
              onLongPress={() => handleLongPress(item.id)}
            />
          )}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: spacing.hairline,
                backgroundColor: colors.border,
                marginHorizontal: spacing.md,
              }}
            />
          )}
        />
      )}

      <TouchableOpacity
        style={[
          styles.fab,
          { backgroundColor: isDark ? '#4A90E2' : '#2E78B7' },
        ]}
        onPress={() => router.push('/persona/edit')}
      >
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 80,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 16,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
