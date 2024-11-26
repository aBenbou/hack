import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CameraComponent from "./screens/Camera";
import Dashboard from "./screens/Dashboard";


const Main = () => {
    return (
        <CameraComponent />
    );
};

export default Main;
