import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import WeatherDisplay from './src/components/WeatherDisplay';
import AuthPage from './src/pages/AuthPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GardenPage from './src/pages/GardenPage';
import DevicePage from './src/pages/DevicePage';

const Tab = createBottomTabNavigator();

const GardenScreen = () => (
  <ScrollView style={styles.screen}
    contentContainerStyle={styles.scrollContent}
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
  >
    <GardenPage />
  </ScrollView>
);

const ScenarioScreen = () => (
  <ScrollView style={styles.screen}
    contentContainerStyle={styles.scrollContent}
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
  >
    <DevicePage />
  </ScrollView>
);

const SmartScreen = () => (
  <ScrollView style={styles.screen}
    contentContainerStyle={styles.scrollContent}
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
  >
    <Text style={styles.screenTitle}>Vườn của bạn</Text>
  </ScrollView>
);

const ProfileScreen = () => (
  <ScrollView style={styles.screen}
    contentContainerStyle={styles.scrollContent}
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
  >
    <Text style={styles.screenTitle}>Vườn của bạn</Text>
  </ScrollView>
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  React.useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, [AsyncStorage]);

  return (
    isAuthenticated ? (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Garden') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Scenario') {
                iconName = focused ? 'checkbox' : 'checkbox-outline';
              } else if (route.name === 'Smart') {
                iconName = focused ? 'bulb' : 'bulb-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#4CD964',
            tabBarInactiveTintColor: '#8E8E93',
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: styles.tabBarLabel,
            headerShown: false,
          })}
        >
          <Tab.Screen
            name="Garden"
            component={GardenScreen}
            options={{ tabBarLabel: 'Vườn của bạn' }}
          />
          <Tab.Screen
            name="Scenario"
            component={ScenarioScreen}
            options={{ tabBarLabel: 'Thiết bị' }}
          />
          <Tab.Screen
            name="Smart"
            component={SmartScreen}
            options={{ tabBarLabel: 'Kịch bản' }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ tabBarLabel: 'Hồ sơ' }}
          />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    ) : (
      <AuthPage />
    )
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingBottom: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingTop: 5,
    paddingBottom: 5,
    height: 60,
  },
  tabBarLabel: {
    fontSize: 10,
  },
});