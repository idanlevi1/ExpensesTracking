import React from "react";
import { Alert, Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Home, Profile, Welcome } from "../screens";
import { SCREEN, TAB } from "../utils/Constants";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS, TEXT_STYLE } from "../utils/StyleGuide";
// import { FABbutton } from "../assets/svg";

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
            <Tab.Navigator screenOptions={{ headerShown: false }} >
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
            {/* <TouchableOpacity onPress={() => { Alert.alert('Pressed!') }}>
                <FABbutton style={{ position: 'absolute', bottom: (87 / 2), left: screenWidth / 2 - (56 / 2) }} />
            </TouchableOpacity> */}
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
        fontSize: 13
    },
});

export default HomeBottomTabs;