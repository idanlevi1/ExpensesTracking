import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SectionList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStackNavigator';
import { SCREEN } from '../../utils/Constants';
import { useSelector } from 'react-redux'
import { COLORS, TEXT_STYLE } from '../../utils/StyleGuide';
import { RootState } from '../../redux/store';
import { groupBy } from '../../utils/Tools';
import { Filters } from '../../assets/svg';

type HomeProp = {
    navigation: NativeStackNavigationProp<MainStackParamList, SCREEN.HOME>;
};

const Home: React.FC<HomeProp> = ({ navigation }) => {

    const { fullName } = useSelector((state: RootState) => state.userStore);
    const { expensesList } = useSelector((state: RootState) => state.expensesStore);
    console.log("🚀 ~ ________________: Home.tsx:30 ~ expensesList:", expensesList)

    // Render a section header
    const renderSectionHeader = ({ section }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
        </View>
    )

    // Render an expense item
    const renderExpenseItem = ({ item }) => (
        <View style={styles.expenseItem}>
            <Text style={styles.sectionItemText}>{item.title}</Text>
            <Text style={styles.sectionItemAmount}>{`$${item.amount.toFixed(2)}`}</Text>
        </View>
    );

    const totalExpenses = (): string => {
        return expensesList.reduce((total, expense) => total + expense.amount, 0).toFixed(2);
    }

    // Group expenses by date
    const groupedExpenses = groupBy(expensesList, 'date')

    // Convert the grouped expenses object into an array of sections
    const sections = Object.entries(groupedExpenses).map(([date, data]) => ({
        title: date,
        data,
    }));

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.fullName}>{fullName}</Text>
                <Text style={styles.totalExpenses}>{`Total Expenses: `}<Text style={styles.totalExpensesAmount}>{`$${totalExpenses()}`}</Text></Text>
                <TouchableOpacity style={styles.filtersButton}>
                    <Filters />
                    <Text style={styles.filtersText}>Filters</Text>
                </TouchableOpacity>
            </View>
            <SectionList
                sections={sections}
                renderItem={renderExpenseItem}
                keyExtractor={(item) => item.id}
                renderSectionHeader={renderSectionHeader}
                // SectionSeparatorComponent={() => <View style={styles.sectionSeparator} />} // Separator between date sections
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.background_screen,
        flex: 1,
    },
    header: {
        marginBottom: 20,
        paddingHorizontal: 14
    },
    fullName: {
        textAlign: 'center',
        ...TEXT_STYLE.regularMediumText,
        fontSize: 16,
        marginBottom: 28,
    },
    totalExpenses: {
        ...TEXT_STYLE.boldSmallText,
        fontSize: 16,
        textAlign: 'left',
        marginBottom: 35,
    },
    totalExpensesAmount: {
        ...TEXT_STYLE.regularMediumText,
        fontSize: 22,
        padding: 5,
    },
    filtersButton: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: 94,
        height: 28,
        backgroundColor: COLORS.filter_button_background,
        borderRadius: 60,
    },
    filtersText: {
        ...TEXT_STYLE.boldSmallText,
        fontSize: 13,
        color: COLORS.main_text,
    },
    itemSeparator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 5,
    },
    sectionSeparator: {
        height: 20,
    },
    sectionHeader: {
        backgroundColor: COLORS.section_line,
        paddingVertical: 5,
        paddingHorizontal: 16,
        marginBottom: 5,
        height: 25
    },
    sectionHeaderText: {
        ...TEXT_STYLE.regularSmallText,
        fontSize: 14,
    },
    sectionItemText: {
        ...TEXT_STYLE.regularSmallText,
    },
    sectionItemAmount: {
        ...TEXT_STYLE.regularMediumText,
    },
    expenseItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingLeft: 16,
        paddingRight: 23,
    },
});

export default Home;
