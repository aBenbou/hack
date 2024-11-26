import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Button = ({icon, size, color, style, onPress }) => {

    return (
        <TouchableOpacity 
            style={[styles.button, style]}
            onPress={onPress}
        >
            <MaterialIcons 
                name = {icon}
                size={size? size : 28}
                color={color ? color : '#f1f1f1'}
            />
        </TouchableOpacity>
    );

};

export default Button;

const styles = StyleSheet.create({
  button : {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
})