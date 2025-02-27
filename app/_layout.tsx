import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, KeyboardAvoidingView, Platform } from 'react-native';
import { ThemeProvider } from '@/context/ThemeContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    window.frameworkReady?.();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1,  backgroundColor: colorScheme === 'dark' ? '#121212' : '#F5F5F5'  }}>
      <ThemeProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          enabled={Platform.OS === 'ios'}
        >
          <Stack screenOptions={{ 
            headerShown: false,
            contentStyle: { 
              backgroundColor: colorScheme === 'dark' ? '#121212' : '#F5F5F5' 
            }
          }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="persona/edit" options={{ presentation: 'modal' }} />
            <Stack.Screen name="persona/chat" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="settings" options={{ presentation: 'modal' }} />
          </Stack>
          <StatusBar style="auto" />
        </KeyboardAvoidingView>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}