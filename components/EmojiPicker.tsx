import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, useColorScheme } from 'react-native';

interface EmojiPickerProps {
  selectedEmoji: string;
  onSelectEmoji: (emoji: string) => void;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({
  selectedEmoji,
  onSelectEmoji,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Common emojis grouped by category
  const emojiCategories = [
    {
      name: 'Faces',
      emojis: ['😊', '😂', '🤔', '😍', '😎', '🙄', '😴', '🤓', '😇', '🥳']
    },
    {
      name: 'Objects',
      emojis: ['📚', '💻', '📱', '🎮', '🎧', '🎬', '📷', '🔍', '💡', '⏰']
    },
    {
      name: 'Activities',
      emojis: ['🏃', '🚴', '🏋️', '🧘', '🎨', '🎭', '🎯', '🎮', '🎤', '🎸']
    },
    {
      name: 'Nature',
      emojis: ['🌳', '🌊', '🌞', '🌙', '⭐', '🔥', '❄️', '🌈', '🌷', '🍀']
    },
    {
      name: 'Food',
      emojis: ['🍕', '🍔', '🍦', '🍩', '🍎', '🍓', '🥑', '🍜', '☕', '🍷']
    }
  ];

  return (
    <View style={[
      styles.container, 
      { backgroundColor: isDark ? '#2A2A2A' : '#F5F5F5' }
    ]}>
      <TouchableOpacity 
        style={[
          styles.clearButton,
          { borderColor: isDark ? '#444444' : '#DDDDDD' }
        ]}
        onPress={() => onSelectEmoji('')}
      >
        <Text style={{ fontSize: 16, color: isDark ? '#FFFFFF' : '#000000' }}>
          Clear
        </Text>
      </TouchableOpacity>
      
      {selectedEmoji && (
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedLabel}>Selected:</Text>
          <View style={[
            styles.selectedEmoji,
            { backgroundColor: isDark ? '#333333' : '#FFFFFF' }
          ]}>
            <Text style={styles.emojiText}>{selectedEmoji}</Text>
          </View>
        </View>
      )}
      
      <ScrollView style={styles.scrollView}>
        {emojiCategories.map(category => (
          <View key={category.name} style={styles.category}>
            <Text style={[
              styles.categoryName,
              { color: isDark ? '#BBBBBB' : '#666666' }
            ]}>
              {category.name}
            </Text>
            <View style={styles.emojiGrid}>
              {category.emojis.map(emoji => (
                <TouchableOpacity
                  key={emoji}
                  style={[
                    styles.emojiButton,
                    selectedEmoji === emoji && {
                      backgroundColor: isDark ? '#444444' : '#DDDDDD'
                    }
                  ]}
                  onPress={() => onSelectEmoji(emoji)}
                >
                  <Text style={styles.emojiText}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 12,
    maxHeight: 300,
  },
  clearButton: {
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  selectedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  selectedLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  selectedEmoji: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  scrollView: {
    maxHeight: 200,
  },
  category: {
    marginBottom: 16,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emojiButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  emojiText: {
    fontSize: 24,
  },
});