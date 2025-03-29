import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { X, Check, Star } from 'lucide-react-native';
import { usePersonaStore } from '@/store/personaStore';
import { Avatar } from '@/components/Avatar';
import * as ImagePicker from 'expo-image-picker';
import { ColorPicker } from '@/components/ColorPicker';
import { EmojiPicker } from '@/components/EmojiPicker';
import { TextInput } from 'react-native';

export default function EditPersonaScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { id } = useLocalSearchParams<{ id: string }>();
  const { personas, addPersona, updatePersona } = usePersonaStore();
  
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [emoji, setEmoji] = useState('');
  const [favorite, setFavorite] = useState(false);

  const isEditing = !!id;
  
  useEffect(() => {
    if (isEditing) {
      const persona = personas.find(p => p.id === id);
      if (persona) {
        setName(persona.name);
        setColor(persona.color || '');
        setAvatar(persona.avatar || null);
        setEmoji(persona.emoji || '');
        setFavorite(persona.favorite || false);
      }
    }
  }, [id, personas]);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Name is required");
      return;
    }

    if (isEditing) {
      updatePersona(id, {
        name,
        color,
        avatar,
        emoji,
        favorite,
      });
    } else {
      addPersona({
        name,
        color,
        avatar,
        emoji,
        favorite,
      });
    }
    
    router.back();
  };

  const pickImage = async () => {
    if (avatar) {
      setAvatar(null);
      return;
    }
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <X size={24} color={isDark ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          {isEditing ? 'Edit Persona' : 'New Persona'}
        </Text>
        <TouchableOpacity onPress={handleSave} style={styles.headerButton}>
          <Check size={24} color={isDark ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={pickImage}>
            <Avatar 
              uri={avatar} 
              name={name || 'New'} 
              size={100} 
              color={color}
              emoji={emoji}
            />
            <View style={[styles.avatarEditBadge, { backgroundColor: avatar ? 'red' : color }]}>
              <Text style={styles.avatarEditText}>{avatar?"Clear":"+ Photo"}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: isDark ? '#FFFFFF' : '#000000' }]}>Name *</Text>
          <TextInput
            style={[
              styles.input, 
              { 
                color: isDark ? '#FFFFFF' : '#000000',
                backgroundColor: isDark ? '#2A2A2A' : '#FFFFFF',
                borderColor: isDark ? '#444444' : '#DDDDDD',
              }
            ]}
            value={name}
            onChangeText={setName}
            placeholder="Enter persona name"
            placeholderTextColor={isDark ? '#777777' : '#999999'}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: isDark ? '#FFFFFF' : '#000000' }]}>Color</Text>
          <ColorPicker selectedColor={color} onSelectColor={setColor} />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: isDark ? '#FFFFFF' : '#000000' }]}>Emoji</Text>
          <EmojiPicker selectedEmoji={emoji} onSelectEmoji={setEmoji} />
        </View>

        <View style={styles.formGroup}>
          <TouchableOpacity 
            style={[
              styles.favoriteButton, 
              { 
                backgroundColor: isDark ? '#2A2A2A' : '#FFFFFF',
                borderColor: isDark ? '#444444' : '#DDDDDD',
              }
            ]} 
            onPress={toggleFavorite}
          >
            <Star 
              size={24} 
              color={favorite ? '#FFD700' : isDark ? '#777777' : '#999999'} 
              fill={favorite ? '#FFD700' : 'none'} 
            />
            <Text 
              style={[
                styles.favoriteText, 
                { color: isDark ? '#FFFFFF' : '#000000' }
              ]}
            >
              {favorite ? 'Favorited' : 'Add to Favorites'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    borderBottomColor: '#DDDDDD',
  },
  headerButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatarEditBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  avatarEditText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  favoriteText: {
    marginLeft: 12,
    fontSize: 16,
  },
});