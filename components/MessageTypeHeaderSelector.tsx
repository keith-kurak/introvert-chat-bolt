import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import {
  X,
  MessageCircleQuestion  as MessageQuestion,
  MessageCircle,
  Heading1,
  Heading2,
  List,
  CheckSquare,
} from 'lucide-react-native';
import { StyleSheet } from 'react-native';
import { colors, spacing } from '@/theme';

type MessageType =
  | 'question'
  | 'answer'
  | 'paragraph'
  | 'header1'
  | 'header2'
  | 'listItem'
  | 'checkbox';

interface MessageTypeHeaderSelectorProps {
  isDark: boolean;
  messageType: MessageType;
  onClose: () => void;
  onMessageTypeSelect: (type: MessageType) => void;
}

export function MessageTypeHeaderSelector({
  isDark,
  messageType,
  onClose,
  onMessageTypeSelect,
}: MessageTypeHeaderSelectorProps) {
  return (
    <>
      <TouchableOpacity onPress={onClose} style={styles.headerButton}>
        <X size={24} color={isDark ? '#FFFFFF' : '#000000'} />
      </TouchableOpacity>
      <View style={styles.messageTypeContainer}>
        <TouchableOpacity
          onPress={() => onMessageTypeSelect('question')}
          style={[
            styles.messageTypeButton,
            messageType === 'question' && styles.messageTypeButtonActive,
          ]}
        >
          <MessageQuestion
            size={24}
            color={
              messageType === 'question'
                ? '#FFFFFF'
                : isDark
                ? '#FFFFFF'
                : '#000000'
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onMessageTypeSelect('answer')}
          style={[
            styles.messageTypeButton,
            messageType === 'answer' && styles.messageTypeButtonActive,
          ]}
        >
          <MessageCircle
            size={24}
            color={
              messageType === 'answer'
                ? '#FFFFFF'
                : isDark
                ? '#FFFFFF'
                : '#000000'
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onMessageTypeSelect('paragraph')}
          style={[
            styles.messageTypeButton,
            messageType === 'paragraph' && styles.messageTypeButtonActive,
          ]}
        >
          <Text
            style={{
              fontSize: 18,
              width: 24,
              textAlign: 'center',
              fontWeight: 'bold',
              color:
                messageType === 'paragraph'
                  ? '#FFFFFF'
                  : isDark
                  ? '#FFFFFF'
                  : '#000000',
            }}
          >
            ¶
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onMessageTypeSelect('header1')}
          style={[
            styles.messageTypeButton,
            messageType === 'header1' && styles.messageTypeButtonActive,
          ]}
        >
          <Heading1
            size={24}
            color={
              messageType === 'header1'
                ? '#FFFFFF'
                : isDark
                ? '#FFFFFF'
                : '#000000'
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onMessageTypeSelect('header2')}
          style={[
            styles.messageTypeButton,
            messageType === 'header2' && styles.messageTypeButtonActive,
          ]}
        >
          <Heading2
            size={24}
            color={
              messageType === 'header2'
                ? '#FFFFFF'
                : isDark
                ? '#FFFFFF'
                : '#000000'
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onMessageTypeSelect('listItem')}
          style={[
            styles.messageTypeButton,
            messageType === 'listItem' && styles.messageTypeButtonActive,
          ]}
        >
          <List
            size={24}
            color={
              messageType === 'listItem'
                ? '#FFFFFF'
                : isDark
                ? '#FFFFFF'
                : '#000000'
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onMessageTypeSelect('checkbox')}
          style={[
            styles.messageTypeButton,
            messageType === 'checkbox' && styles.messageTypeButtonActive,
          ]}
        >
          <CheckSquare
            size={24}
            color={
              messageType === 'checkbox'
                ? '#FFFFFF'
                : isDark
                ? '#FFFFFF'
                : '#000000'
            }
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    padding: 8,
  },
  messageTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    //gap: 8,
  },
  messageTypeButton: {
    padding: 8,
    borderRadius: 20,
  },
  messageTypeButtonActive: {
    backgroundColor: colors.highlight,
  },
});
