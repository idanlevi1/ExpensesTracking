import React from "react";
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Home, Profile } from "../screens";
import { TAB } from "../utils/Constants";
import { COLORS, TEXT_STYLE } from "../utils/StyleGuide";
import { PlusButton } from "../assets/svg";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetComponent, ExpenseForm } from "../components";

const screenWidth = Dimensions.get('window').width;

export type HomeBottomTabsParamList = {
    [TAB.HOME]: undefined;
    [TAB.PROFILE]: undefined;
};

const Tab = createBottomTabNavigator<HomeBottomTabsParamList>();

const HomeBottomTabs = () => {

    const bottomSheetRef = React.useRef<BottomSheet>(null);
    const snapPoints = React.useMemo(() => ['1%', '93%'], []);
    const handleOpenBottomSheet = () => bottomSheetRef.current?.expand()
    const handleCloseBottomSheet = () => bottomSheetRef.current?.close()

    const tabOptions = {
        tabBarIcon: () => null,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarInactiveTintColor: COLORS.tab_inactive_text,
        tabBarActiveTintColor: COLORS.button_circle_background,
    }
    console.log('__red')

    return (
        <React.Fragment>
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
            <PlusButton onPress={handleOpenBottomSheet} style={{ position: 'absolute', bottom: (87 / 2), left: screenWidth / 2 - (56 / 2) }} />
            <BottomSheetComponent
                bottomSheetRef={bottomSheetRef}
                snapPoints={snapPoints}
                onClose={handleCloseBottomSheet} >
                <ExpenseForm
                    sheetTitle={'Create Expense'}
                    buttonText={'Create'}
                    onCloseBottomSheet={handleCloseBottomSheet} />
            </BottomSheetComponent>
        </React.Fragment>
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