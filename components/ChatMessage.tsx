import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme, TextStyle } from 'react-native';
import { Avatar } from './Avatar';
import { Message, Persona } from '@/types';
import { Check, Square } from 'lucide-react-native';
import colors from '@/theme/colors';

interface ChatMessageProps {
  message: Message;
  persona: Persona;
  isSelected: boolean;
  onDoubleTap: () => void;
  onLongPress: () => void;
  onToggleCheckbox: (messageId: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  persona,
  isSelected,
  onDoubleTap,
  onLongPress,
  onToggleCheckbox,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const renderMessageContent = () => {
    const baseTextStyle : TextStyle = { 
      color: isDark ? '#FFFFFF' : '#000000',
      textDecorationLine: message.checked ? 'line-through' : 'none',
    };
    
    switch (message.type) {
      case 'header1':
        return (
          <Text style={[styles.header1, baseTextStyle]}>
            {message.content}
          </Text>
        );
      case 'header2':
        return (
          <Text style={[styles.header2, baseTextStyle]}>
            {message.content}
          </Text>
        );
      case 'listItem':
        return (
          <View style={styles.listItemContainer}>
            <Text style={[styles.bullet, { color: isDark ? '#FFFFFF' : '#000000' }]}>•</Text>
            <Text style={[styles.listItem, baseTextStyle]}>
              {message.content}
            </Text>
          </View>
        );
      case 'checkbox':
        return (
          <TouchableOpacity 
            style={styles.checkboxContainer}
            onPress={() => onToggleCheckbox(message.id)}
          >
            {message.checked ? (
              <Check size={20} color={isDark ? '#FFFFFF' : '#000000'} />
            ) : (
              <Square size={20} color={isDark ? '#FFFFFF' : '#000000'} />
            )}
            <Text style={[styles.checkbox, baseTextStyle]}>
              {message.content}
            </Text>
          </TouchableOpacity>
        );
      case 'question':
        return (
          <View style={styles.questionContainer}>
            <Avatar
              uri={persona.avatar}
              name={persona.name}
              size={30}
              color={persona.color}
              emoji={persona.emoji}
            />
            <View 
              style={[
                styles.questionBubble, 
                { 
                  backgroundColor: persona.color 
                    ? `${persona.color}33` 
                    : isDark ? '#333333' : '#E8E8E8' 
                }
              ]}
            >
              <Text style={[
                styles.questionText, 
                { color: isDark ? '#FFFFFF' : '#000000' }
              ]}>
                {message.content}
              </Text>
            </View>
          </View>
        );
      case 'answer':
        return (
          <View style={styles.answerContainer}>
            <View 
              style={[
                styles.answerBubble, 
                { backgroundColor: colors.highlight }
              ]}
            >
              <Text style={styles.answerText}>
                {message.content}
              </Text>
            </View>
          </View>
        );
      case 'paragraph':
      default:
        return (
          <Text style={[styles.paragraph, baseTextStyle]}>
            {message.content}
          </Text>
        );
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && { backgroundColor: isDark ? '#333333' : '#E8E8E8' }
      ]}
      onLongPress={onLongPress}
      onPress={() => {
        if (message.type === 'checkbox') {
          onToggleCheckbox(message.id);
        }
      }}
      delayLongPress={500}
      onDoublePress={onDoubleTap}
    >
      {renderMessageContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
  },
  header1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  header2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
  },
  listItem: {
    fontSize: 16,
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    paddingVertical: 6,
    flex: 1,
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 4,
  },
  questionBubble: {
    borderRadius: 16,
    padding: 12,
    marginLeft: 8,
    maxWidth: '80%',
  },
  questionText: {
    fontSize: 16,
  },
  answerContainer: {
    alignItems: 'flex-end',
    marginVertical: 4,
  },
  answerBubble: {
    borderRadius: 16,
    padding: 12,
    maxWidth: '80%',
  },
  answerText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});