import { useEffect, useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  Platform, 
  useColorScheme,
  Alert,
  Keyboard,
  TextInput
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Send, MessageCircleQuestion as MessageQuestion, MessageCircle, Heading1, Heading2, List, SquareCheck as CheckSquare, X } from 'lucide-react-native';
import { usePersonaStore } from '@/store/personaStore';
import { Avatar } from '@/components/Avatar';
import { Message, MessageType } from '@/types';
import { ChatMessage } from '@/components/ChatMessage';
import { HeaderOptions } from '@/components/HeaderOptions';
import { MessageTypeHeaderSelector } from '@/components/MessageTypeHeaderSelector';

export default function ChatScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { id } = useLocalSearchParams<{ id: string }>();
  const { personas, addMessage, updateMessage, deleteMessage } = usePersonaStore();
  const persona = personas.find(p => p.id === id);
  
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState<MessageType>('answer');
  const [showMessageTypes, setShowMessageTypes] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const flatListRef = useRef<FlatList>(null);
  const inputRef = useRef<TextInput>(null);
  const messagesCountRef = useRef(persona?.messages?.length || 0);

  const insets = useSafeAreaInsets();

  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  // Set default message type based on the last message
  useEffect(() => {
    if (persona?.messages && persona.messages.length > 0) {
      const sortedMessages = [...persona.messages].sort((a, b) => b.timestamp - a.timestamp);
      const lastMessage = sortedMessages[0];
      
      if (lastMessage.type === 'question') {
        setMessageType('answer');
      } else if (lastMessage.type === 'header1' || lastMessage.type === 'header2' || lastMessage.type === 'paragraph') {
        setMessageType('paragraph');
      } else if (lastMessage.type === 'listItem') {
        setMessageType('listItem');
      } else if (lastMessage.type === 'checkbox') {
        setMessageType('checkbox');
      } else {
        setMessageType('answer');
      }
    } else {
      // Default to answer if no messages
      setMessageType('answer');
    }
  }, [persona?.messages]);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (persona?.messages && persona.messages.length > messagesCountRef.current) {
      messagesCountRef.current = persona.messages.length;
      setTimeout(() => {
        //flatListRef.current?.scrollToIndex({ index: persona?.messages.length -1, animated: true });
      }, 100);
    }
  }, [persona?.messages]);

  if (!persona) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}>
        <Text style={{ color: isDark ? '#FFFFFF' : '#000000' }}>Persona not found</Text>
      </SafeAreaView>
    );
  }

  const handleSend = () => {
    if (!messageText.trim()) return;
    
    if (isEditing && selectedMessage) {
      updateMessage(persona.id, selectedMessage.id, {
        ...selectedMessage,
        content: messageText,
        type: messageType,
      });
      setIsEditing(false);
      setSelectedMessage(null);
    } else {
      addMessage(persona.id, {
        content: messageText,
        type: messageType,
        timestamp: Date.now(),
      });
    }
    
    setMessageText('');
  };

  const handleMessageTypeSelect = (type: MessageType) => {
    setMessageType(type);
  };

  const handleMessageDoubleTap = (message: Message) => {
    // Cycle through message types
    const types: MessageType[] = [
      'question', 'answer', 'paragraph', 'header1', 'header2', 'listItem', 'checkbox'
    ];
    const currentIndex = types.indexOf(message.type);
    const nextIndex = (currentIndex + 1) % types.length;
    
    updateMessage(persona.id, message.id, {
      ...message,
      type: types[nextIndex],
    });
  };

  const handleMessageLongPress = (message: Message) => {
    setSelectedMessage(message);
  };

  const handleEditMessage = () => {
    if (selectedMessage) {
      setMessageText(selectedMessage.content);
      setMessageType(selectedMessage.type);
      setIsEditing(true);
      setShowMessageTypes(true);
      inputRef.current?.focus();
    }
  };

  const handleDeleteMessage = () => {
    if (selectedMessage) {
      Alert.alert(
        "Delete Message",
        "Are you sure you want to delete this message?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { 
            text: "Delete", 
            onPress: () => {
              deleteMessage(persona.id, selectedMessage.id);
              setSelectedMessage(null);
            },
            style: "destructive"
          }
        ]
      );
    }
  };

  const handleCancelSelection = () => {
    setSelectedMessage(null);
    setIsEditing(false);
    if (!inputRef.current?.isFocused()) {
      setShowMessageTypes(false);
    }
    setMessageText('');
  };

  const handleInputFocus = () => {
    setShowMessageTypes(true);
  };
  
  const handleInputBlur = () => {
    if (!isEditing) {
      setShowMessageTypes(false);
    }
  };

  // Sort messages with oldest first (for proper display order)
  const sortedMessages = [...(persona.messages || [])].sort((a, b) => 
    a.timestamp - b.timestamp
  ).reverse();

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}>
      <View style={[
        styles.header, 
        { 
          paddingTop: insets.top,
          backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
          borderBottomColor: isDark ? '#333333' : '#DDDDDD' 
        }
      ]}>
        {selectedMessage ? (
          <HeaderOptions
            isDark={isDark}
            isEditing={isEditing}
            onCancel={handleCancelSelection}
            onEdit={handleEditMessage}
            onDelete={handleDeleteMessage}
            onSave={isEditing ? handleSend : undefined}
          />
        ) : showMessageTypes ? (
          <MessageTypeHeaderSelector
            isDark={isDark}
            messageType={messageType}
            onClose={() => {
              setShowMessageTypes(false);
              Keyboard.dismiss();
            }}
            onMessageTypeSelect={handleMessageTypeSelect}
          />
        ) : (
          <>
            <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
              <ArrowLeft size={24} color={isDark ? '#FFFFFF' : '#000000'} />
            </TouchableOpacity>
            <View style={styles.personaInfo}>
              <Avatar 
                uri={persona.avatar} 
                name={persona.name} 
                size={32} 
                color={persona.color}
                emoji={persona.emoji}
              />
              <Text style={[
                styles.personaName, 
                { 
                  color: persona.color || (isDark ? '#FFFFFF' : '#000000'),
                  marginLeft: 8
                }
              ]}>
                {persona.name}
              </Text>
            </View>
            <View style={{ width: 40 }} />
          </>
        )}
      </View>

      <FlatList
        ref={flatListRef}
        data={sortedMessages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatMessage
            message={item}
            persona={persona}
            isSelected={selectedMessage?.id === item.id}
            onDoubleTap={() => handleMessageDoubleTap(item)}
            onLongPress={() => handleMessageLongPress(item)}
            onToggleCheckbox={(messageId) => {
              const message = persona.messages?.find(m => m.id === messageId);
              if (message) {
                updateMessage(persona.id, messageId, {
                  ...message,
                  checked: !message.checked
                });
              }
            }}
          />
        )}
        contentContainerStyle={styles.messageList}
        inverted={true}
      />

      <View style={[
        styles.inputContainer, 
        { paddingBottom: keyboardStatus || Platform.OS === 'android' ? 8 : insets.bottom, backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }
      ]}>
        <TextInput
          ref={inputRef}
          style={[
            styles.input, 
            { 
              color: isDark ? '#FFFFFF' : '#000000',
              backgroundColor: isDark ? '#2A2A2A' : '#F0F0F0',
            }
          ]}
          value={messageText}
          onChangeText={setMessageText}
          placeholder="Type a message..."
          placeholderTextColor={isDark ? '#777777' : '#999999'}
          multiline
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <TouchableOpacity 
          style={[
            styles.sendButton, 
            { backgroundColor: isDark ? '#4A90E2' : '#2E78B7' }
          ]} 
          onPress={handleSend}
        >
          <Send size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
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
  headerButton: {
    padding: 8,
  },
  personaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  personaName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageTypeContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
  messageList: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexGrow: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingTop: 10,
    paddingRight: 40,
    maxHeight: 120,
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});