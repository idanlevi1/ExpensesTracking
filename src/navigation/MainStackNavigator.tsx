import React from "react";
import { Welcome } from "../screens";
import { SCREEN } from "../utils/Constants";
import HomeBottomTabs from "./HomeBottomTabs";
import { createStackNavigator } from '@react-navigation/stack';

export type MainStackParamList = {
    [SCREEN.WELCOME]: undefined;
    [SCREEN.HOME]: undefined;
};

const Stack = createStackNavigator<MainStackParamList>();

const MainStackNavigator = () => {

    return (
        <Stack.Navigator initialRouteName={SCREEN.WELCOME} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={SCREEN.WELCOME} component={Welcome} />
            <Stack.Screen name={SCREEN.HOME} component={HomeBottomTabs} />
        </Stack.Navigator>
    );
};

export default MainStackNavigator;