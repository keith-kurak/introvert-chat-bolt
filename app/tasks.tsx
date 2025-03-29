import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, CheckSquare } from 'lucide-react-native';
import { usePersonaStore } from '@/store/personaStore';
import { HeaderContainer } from '@/components/HeaderContainer';
import { spacing, colors } from '@/theme';

interface Task {
  id: string;
  content: string;
  personaId: string;
  personaName: string;
  personaColor: string;
  personaEmoji: string;
  timestamp: number;
}

export default function TasksScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { personas, updateMessage } = usePersonaStore();

  // Get all open tasks from all personas
  const openTasks: Task[] = personas.flatMap(persona => 
    (persona.messages || [])
      .filter(msg => msg.type === 'checkbox' && !msg.checked)
      .map(msg => ({
        id: msg.id,
        content: msg.content,
        personaId: persona.id,
        personaName: persona.name,
        personaColor: persona.color || '',
        personaEmoji: persona.emoji || '',
        timestamp: msg.timestamp,
      }))
  );

  // Group tasks by persona
  const groupedTasks = openTasks.reduce((acc, task) => {
    if (!acc[task.personaId]) {
      acc[task.personaId] = {
        personaId: task.personaId,
        personaName: task.personaName,
        personaColor: task.personaColor,
        personaEmoji: task.personaEmoji,
        tasks: [],
      };
    }
    acc[task.personaId].tasks.push(task);
    return acc;
  }, {} as Record<string, {
    personaId: string;
    personaName: string;
    personaColor: string;
    personaEmoji: string;
    tasks: Task[];
  }>);

  const handleCompleteTask = (personaId: string, taskId: string) => {
    updateMessage(personaId, taskId, { checked: true });
  };

  const renderTask = ({ item }: { item: Task }) => (
    <TouchableOpacity
      style={[
        styles.taskItem,
        { backgroundColor: isDark ? '#2A2A2A' : '#FFFFFF' }
      ]}
      onPress={() => handleCompleteTask(item.personaId, item.id)}
    >
      <CheckSquare size={24} color={isDark ? '#FFFFFF' : '#000000'} />
      <Text style={[
        styles.taskText,
        { color: isDark ? '#FFFFFF' : '#000000' }
      ]}>
        {item.content}
      </Text>
    </TouchableOpacity>
  );

  const renderPersonaGroup = ({ item }: { item: {
    personaId: string;
    personaName: string;
    personaColor: string;
    personaEmoji: string;
    tasks: Task[];
  }}) => (
    <View style={styles.personaGroup}>
      <View style={styles.personaHeader}>
        <Text style={[
          styles.personaName,
          { color: item.personaColor || (isDark ? '#FFFFFF' : '#000000') }
        ]}>
          {item.personaEmoji} {item.personaName}
        </Text>
      </View>
      <FlatList
        data={item.tasks}
        renderItem={renderTask}
        keyExtractor={task => task.id}
        scrollEnabled={false}
        ItemSeparatorComponent={() => (
          <View style={[
            styles.separator,
            { backgroundColor: isDark ? '#333333' : '#DDDDDD' }
          ]} />
        )}
      />
    </View>
  );

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? '#121212' : '#F5F5F5' }
    ]}>
      <HeaderContainer>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <ArrowLeft size={24} color={isDark ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          Open Tasks
        </Text>
        <View style={{ width: 24 }} />
      </HeaderContainer>

      {openTasks.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={[
            styles.emptyStateText,
            { color: isDark ? '#FFFFFF' : '#000000' }
          ]}>
            No open tasks
          </Text>
        </View>
      ) : (
        <FlatList
          data={Object.values(groupedTasks)}
          renderItem={renderPersonaGroup}
          keyExtractor={item => item.personaId}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => (
            <View style={{ height: spacing.lg }} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  list: {
    padding: spacing.md,
  },
  personaGroup: {
    marginBottom: spacing.md,
  },
  personaHeader: {
    marginBottom: spacing.sm,
  },
  personaName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: 8,
    gap: spacing.sm,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  separator: {
    height: 1,
    marginVertical: spacing.sm,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: 'center',
  },
}); 