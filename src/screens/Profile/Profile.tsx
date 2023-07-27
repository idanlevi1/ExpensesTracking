import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SCREEN, TAB } from '../../utils/Constants';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { HomeBottomTabsParamList } from '../../navigation/HomeBottomTabs';
import { COLORS, TEXT_STYLE } from '../../utils/StyleGuide';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setFullName } from '../../redux/UserStore/UserStoreSlice';
import { setExpensesList } from '../../redux/ExpensesStore/ExpensesStoreSlice';

type ProfileProp = {
    navigation: BottomTabNavigationProp<HomeBottomTabsParamList, TAB.PROFILE>;
};

const Profile: React.FC<ProfileProp> = ({ navigation }) => {
    const { expensesList } = useSelector((state: RootState) => state.expensesStore);
    const dispatch = useDispatch()

    const handleSignOut = () => {
        dispatch(setFullName(null))
        dispatch(setExpensesList([]))
        navigation.navigate(SCREEN.WELCOME)
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View style={styles.line}>
                <Text style={styles.lineText}>Total Expenses Items</Text>
                <Text style={[styles.lineText, styles.boldText]}>{expensesList.length}</Text>
            </View>
            <TouchableOpacity style={styles.line} onPress={handleSignOut}>
                <Text style={styles.lineText}>Sign out</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background_screen,
        alignItems: 'center',
        justifyContent: 'center'
    },
    line: {
        flexDirection: 'row',
        width: 327,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.tabs_border,
        marginBottom: 24
    },
    lineText: {
        paddingVertical: 12,
        ...TEXT_STYLE.regularMediumText,
        color: COLORS.main_text,
    },
    boldText: {
        fontWeight: '700',
        fontSize: 20,
    },
});
export default Profile;
