import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { Avatar } from './Avatar';
import { Persona } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface PersonaListItemProps {
  persona: Persona;
  isSelected: boolean;
  onPress: () => void;
  onLongPress: () => void;
}

export const PersonaListItem: React.FC<PersonaListItemProps> = ({
  persona,
  isSelected,
  onPress,
  onLongPress,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const lastMessage = persona.messages && persona.messages.length > 0
    ? persona.messages[persona.messages.length - 1]
    : null;
  
  const getLastMessagePreview = () => {
    if (!lastMessage) return 'No messages yet';
    return lastMessage.content.length > 30
      ? `${lastMessage.content.substring(0, 30)}...`
      : lastMessage.content;
  };
  
  const getLastMessageTime = () => {
    if (!lastMessage) return '';
    return formatDistanceToNow(new Date(lastMessage.timestamp), { addSuffix: true });
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && { backgroundColor: isDark ? '#333333' : '#E8E8E8' }
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={500}
    >
      <Avatar
        uri={persona.avatar}
        name={persona.name}
        size={50}
        color={persona.color}
        emoji={persona.emoji}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text 
            style={[
              styles.name, 
              { 
                color: persona.color || (isDark ? '#FFFFFF' : '#000000') 
              }
            ]}
          >
            {persona.name}
          </Text>
          <Text style={[styles.time, { color: isDark ? '#BBBBBB' : '#666666' }]}>
            {getLastMessageTime()}
          </Text>
        </View>
        <Text 
          style={[
            styles.preview, 
            { color: isDark ? '#BBBBBB' : '#666666' }
          ]} 
          numberOfLines={1}
        >
          {getLastMessagePreview()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
  },
  preview: {
    fontSize: 14,
  },
});