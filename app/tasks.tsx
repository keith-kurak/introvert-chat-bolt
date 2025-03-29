import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, CheckSquare, Square } from 'lucide-react-native';
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
  const [completedTaskIds, setCompletedTaskIds] = useState<Set<string>>(
    new Set()
  );

  // Store initial open tasks in a ref
  const openTasksRef = useRef<Task[]>(
    personas.flatMap((persona) =>
      (persona.messages || [])
        .filter((msg) => msg.type === 'checkbox' && !msg.checked)
        .map((msg) => ({
          id: msg.id,
          content: msg.content,
          personaId: persona.id,
          personaName: persona.name,
          personaColor: persona.color || '',
          personaEmoji: persona.emoji || '',
          timestamp: msg.timestamp,
        }))
    )
  );

  // Group tasks by persona
  const groupedTasks = openTasksRef.current.reduce(
    (acc, task) => {
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
    },
    {} as Record<
      string,
      {
        personaId: string;
        personaName: string;
        personaColor: string;
        personaEmoji: string;
        tasks: Task[];
      }
    >
  );

  const handleCompleteTask = (personaId: string, taskId: string) => {
    // Update the local state first
    setCompletedTaskIds((prev) => {
      const newSet = new Set(prev);
      newSet.add(taskId);
      return newSet;
    });

    // Then update the store
    updateMessage(personaId, taskId, { checked: true });
  };

  const renderTask = ({ item }: { item: Task }) => {
    const isCompleted = completedTaskIds.has(item.id);

    return (
      <TouchableOpacity
        style={[
          styles.taskItem,
          { backgroundColor: isDark ? '#2A2A2A' : '#FFFFFF' },
        ]}
        onPress={() => handleCompleteTask(item.personaId, item.id)}
      >
        {isCompleted ? (
          <CheckSquare size={24} color={isDark ? '#888888' : '#666666'} />
        ) : (
          <Square size={24} color={isDark ? '#FFFFFF' : '#000000'} />
        )}
        <Text
          style={[
            styles.taskText,
            {
              textDecorationLine: isCompleted ? 'line-through' : 'none',
              color: isCompleted
                ? isDark
                  ? '#888888'
                  : '#666666'
                : isDark
                ? '#FFFFFF'
                : '#000000',
            },
          ]}
        >
          {item.content}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderPersonaGroup = ({
    item,
  }: {
    item: {
      personaId: string;
      personaName: string;
      personaColor: string;
      personaEmoji: string;
      tasks: Task[];
    };
  }) => {
    return (
      <View style={styles.personaGroup}>
        <View style={styles.personaHeader}>
          <Text
            style={[
              styles.personaName,
              { color: item.personaColor || (isDark ? '#FFFFFF' : '#000000') },
            ]}
          >
            {item.personaEmoji} {item.personaName}
          </Text>
        </View>
        <FlatList
          data={item.tasks}
          renderItem={renderTask}
          keyExtractor={(task) => task.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => (
            <View
              style={[
                styles.separator,
                { backgroundColor: isDark ? '#333333' : '#DDDDDD' },
              ]}
            />
          )}
        />
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? '#121212' : '#F5F5F5' },
      ]}
    >
      <HeaderContainer>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.headerButton}
        >
          <ArrowLeft size={24} color={isDark ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          Open Tasks
        </Text>
        <View style={{ width: 24 }} />
      </HeaderContainer>

      <FlatList
        data={Object.values(groupedTasks)}
        renderItem={renderPersonaGroup}
        keyExtractor={(item) => item.personaId}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: spacing.lg }} />}
      />
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
