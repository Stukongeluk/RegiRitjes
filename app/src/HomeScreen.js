import * as React from 'react';
import { Image, View, Text, Button } from 'react-native';
import CarScreen from './screens/CarScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CommuteRegistrationScreen from './screens/CommuteRegistrationScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Home = (navigation) => {
    return (
        <Tab.Navigator initialRouteName="Cars"
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Cars') {
                iconName = focused
                  ? 'car-sport'
                  : 'car-sport-outline';
              } else if (route.name === 'Commutes') {
                iconName = focused ? 'documents' : 'documents-outline';
              }
  
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#0e92ff',
            tabBarInactiveTintColor: '#456b8f',
          })}>
            <Tab.Screen name="Cars" component={CarScreen} />
            <Tab.Screen name="Commutes" component={CommuteRegistrationScreen} />
        </Tab.Navigator>
    )
}

export default Home;