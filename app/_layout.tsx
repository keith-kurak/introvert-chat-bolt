import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useColorScheme, KeyboardAvoidingView, Platform } from 'react-native';
import { ThemeProvider } from '@/context/ThemeContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SystemBars } from 'react-native-edge-to-edge';
import { KeyboardProvider } from 'react-native-keyboard-controller';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: colorScheme === 'dark' ? '#121212' : '#F5F5F5',
      }}
    >
      <KeyboardProvider>
        <ThemeProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: colorScheme === 'dark' ? '#121212' : '#F5F5F5',
              },
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
              name="persona/edit"
              options={{ presentation: 'modal' }}
            />
            <Stack.Screen
              name="persona/chat"
              options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen name="settings" options={{ presentation: 'modal' }} />
          </Stack>
        </ThemeProvider>
        <SystemBars style="auto" />
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
