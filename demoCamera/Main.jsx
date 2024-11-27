
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './screens/Dashboard'; // Import the Dashboard component
import Camera from './screens/Camera'; // Import the Camera component

// Create a stack navigator
const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard}  />
        <Stack.Screen name="Camera" component={Camera}   options={{ headerTitle: '' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
