import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderContainerProps {
  children: React.ReactNode;
}

export function HeaderContainer({ children }: HeaderContainerProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const insets = useSafeAreaInsets();

  return (
    <View style={[
      styles.header,
      {
        paddingTop: insets.top + 8,
        backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
        borderBottomColor: isDark ? '#333333' : '#DDDDDD',
      }
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
  },
}); 