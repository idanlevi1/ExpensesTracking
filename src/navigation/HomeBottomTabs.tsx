import React from "react";
import { Alert, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Home, Profile } from "../screens";
import { TAB } from "../utils/Constants";
import { COLORS, TEXT_STYLE } from "../utils/StyleGuide";
import { PlusButton } from "../assets/svg";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const screenWidth = Dimensions.get('window').width;

export type HomeBottomTabsParamList = {
    [TAB.HOME]: undefined;
    [TAB.PROFILE]: undefined;
};

const Tab = createBottomTabNavigator<HomeBottomTabsParamList>();

const HomeBottomTabs = () => {

    const tabOptions = {
        tabBarIcon: () => null,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarInactiveTintColor: COLORS.tab_inactive_text,
        tabBarActiveTintColor: COLORS.button_circle_background,
    }

    return (
        <>
            <Tab.Navigator screenOptions={{ headerShown: false, tabBarIcon: () => null }} >
                <Tab.Screen
                    name={TAB.HOME}
                    component={Home}
                    options={({ route }) => ({
                        title: 'Home',
                        ...tabOptions
                    })}
                />
                <Tab.Screen
                    name={TAB.PROFILE}
                    component={Profile}
                    options={({ route }) => ({
                        title: 'Profile',
                        ...tabOptions
                    })} />
            </Tab.Navigator>
            <TouchableOpacity onPress={() => { Alert.alert('Pressed!') }}>
                <PlusButton style={{ position: 'absolute', bottom: (87 / 2), left: screenWidth / 2 - (56 / 2) }} />
            </TouchableOpacity>
        </>
    );
};


const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: COLORS.background_bottom_sheet,
        height: 87,
        borderTopWidth: 1,
        borderTopColor: COLORS.tabs_border
    },
    tabBarLabel: {
        ...TEXT_STYLE.regularSmallText,
        fontSize: 13,
        position: 'absolute',
        bottom: (87 / 2) - 13
    },
});

export default HomeBottomTabs;