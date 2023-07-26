import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Welcome } from "../screens";
import { SCREEN } from "../utils/Constants";


export type MainStackParamList = {
    [SCREEN.WELCOME]: undefined;
    [SCREEN.HOME]: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStackNavigator = () => {

    return (
        <Stack.Navigator initialRouteName={SCREEN.WELCOME} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={SCREEN.WELCOME} component={Welcome} />
            <Stack.Screen name={SCREEN.HOME} component={Home} />
        </Stack.Navigator>
    );
};

export default MainStackNavigator;