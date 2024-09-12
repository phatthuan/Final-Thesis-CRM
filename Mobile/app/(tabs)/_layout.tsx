import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Alert, Pressable } from 'react-native';
import { router } from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_HOST from '@/constants/ApiHost';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const handleLogout = async () => {
    try {
      // Xóa token từ AsyncStorage
      await AsyncStorage.removeItem('userToken');
      // Điều hướng người dùng về màn hình index hoặc đăng nhập
      router.replace('/');
      Alert.alert('Logged out', 'You have been logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
      Alert.alert('Logout failed', 'Something went wrong. Please try again.');
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="lead"
        options={{
          title: 'Tab lead',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable onPress={handleLogout}>
              {({ pressed }) => (
                <FontAwesome
                  name="sign-out"
                  size={25}
                  color={Colors[colorScheme ?? 'light'].text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Tab Calendar',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable onPress={handleLogout}>
              {({ pressed }) => (
                <FontAwesome
                  name="sign-out"
                  size={25}
                  color={Colors[colorScheme ?? 'light'].text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
        }}
      // listeners={{
      //   focus: () => {
      //     fetchGoogleCalendarEvents();
      //   }
      // }}
      />
    </Tabs>
  );
}
