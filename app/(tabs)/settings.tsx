import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '@/store/userStore';
import { Avatar } from '@/components/Avatar';
import { useUpdates, reloadAsync } from 'expo-updates';
import * as ImagePicker from 'expo-image-picker';
import colors from '@/theme/colors';
import { HeaderContainer } from '@/components/HeaderContainer';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();

  const { isUpdatePending } = useUpdates();

  const isDark = colorScheme === 'dark';
  const { user, updateUser } = useUserStore();
  const [name, setName] = useState(user.name || '');

  const pickImage = async () => {
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
      updateUser({ avatar: result.assets[0].uri });
    }
  };

  const handleNameChange = (text: string) => {
    setName(text);
    updateUser({ name: text });
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? '#121212' : '#F5F5F5' },
      ]}
    >
      <HeaderContainer>
        <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          Settings
        </Text>
      </HeaderContainer>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? '#FFFFFF' : '#000000' },
            ]}
          >
            Profile
          </Text>

          <View
            style={[
              styles.card,
              { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' },
            ]}
          >
            <View style={styles.avatarContainer}>
              <TouchableOpacity onPress={pickImage}>
                <Avatar
                  uri={user.avatar}
                  name={user.name || 'You'}
                  size={100}
                  showBorder={false}
                />
                <View style={styles.avatarEditBadge}>
                  <Text style={styles.avatarEditText}>Edit</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text
                style={[
                  styles.inputLabel,
                  { color: isDark ? '#BBBBBB' : '#666666' },
                ]}
              >
                Your Name
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: isDark ? '#FFFFFF' : '#000000',
                    borderColor: isDark ? '#333333' : '#DDDDDD',
                  },
                ]}
                value={name}
                onChangeText={handleNameChange}
                placeholder="Enter your name"
                placeholderTextColor={isDark ? '#777777' : '#999999'}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? '#FFFFFF' : '#000000' },
            ]}
          >
            About
          </Text>

          <View
            style={[
              styles.card,
              { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' },
            ]}
          >
            <Text
              style={[
                styles.aboutText,
                { color: isDark ? '#FFFFFF' : '#000000' },
              ]}
            >
              Introvert Chat v1.0.0
            </Text>
            <Text
              style={[
                styles.aboutSubtext,
                { color: isDark ? '#BBBBBB' : '#666666' },
              ]}
            >
              A place to chat with different versions of yourself.
            </Text>
            {isUpdatePending && (
              <Pressable onPress={() => reloadAsync()}>
                <Text
                  style={[styles.aboutSubtext, { color: colors.highlight }]}
                >
                  Update
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
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
    height: 40,
    lineHeight: 40,
    verticalAlign: "middle"
  },
  content: {
    flex: 1,
  },
  section: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarEditBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
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
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  aboutText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  aboutSubtext: {
    fontSize: 14,
  },
});
