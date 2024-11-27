


import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from 'react-native-vector-icons'; // Import the Ionicons library
import styles from '../styles/styles'; // Ensure you have the styles

const Dashboard = ({ navigation }) => {
  return (
    <View style={styles.containerDash}>
       <Text style={styles.title}>Welcome to the Dashboard</Text>
      {/* Button to navigate to Camera Screen with Camera Icon */}
      <TouchableOpacity
        style={styles.buttonCaM}
        onPress={() => navigation.navigate('Camera')} // Navigation to the Camera screen
      >
        <Ionicons name="camera" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;

