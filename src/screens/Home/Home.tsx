import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SectionList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStackNavigator';
import { BOTTOM_SHEET_MODE, SCREEN } from '../../utils/Constants';
import { useSelector, useDispatch } from 'react-redux'
import { COLORS, TEXT_STYLE } from '../../utils/StyleGuide';
import { RootState } from '../../redux/store';
import { groupBy } from '../../utils/Tools';
import { FiltersIcon } from '../../assets/svg';
import { Expense, ExpenseFilters, setChosenExpense } from '../../redux/ExpensesStore/ExpensesStoreSlice';
import { setBottomSheetMode } from '../../redux/AppStore/AppStoreSlice';

type HomeProp = {
    navigation: NativeStackNavigationProp<MainStackParamList, SCREEN.HOME>;
};

const Home: React.FC<HomeProp> = ({ navigation }) => {

    const { fullName } = useSelector((state: RootState) => state.userStore);
    const { expensesList, expensesFilters } = useSelector((state: RootState) => state.expensesStore);
    const [expensesSections, setExpensesSections] = React.useState([])

    const dispatch = useDispatch()

    React.useEffect(() => {
        const filteredExpenses = expensesList.filter((expense) => {
            const filter = expensesFilters as ExpenseFilters;
            return (
                (!filter.title || expense.title.toLowerCase().includes(filter.title.toLowerCase())) &&
                (!filter.amount || expense.amount == +filter.amount) &&
                (!filter.date || expense.date.includes(filter.date))
            );
        })

        // sort expenses by a descending date 
        const sortedExpensesList = filteredExpenses.slice().sort((a, b) => new Date(b.date.split('.').reverse().join('-')) - new Date(a.date.split('.').reverse().join('-')))
        // Group expenses by date
        const groupedExpenses = groupBy(sortedExpensesList, 'date')
        // Convert the grouped expenses object into an array of expensesSections
        const expensesSections = Object.entries(groupedExpenses).map(([date, data]) => ({
            title: date,
            data,
        }));
        setExpensesSections(expensesSections)
    }, [expensesList, expensesFilters])


    // Render a section header
    const renderSectionHeader = ({ section }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
        </View>
    )

    // Render an expense item
    const renderExpenseItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleEditExpense(item)} style={styles.expenseItem}>
            <Text style={styles.sectionItemText}>{item.title}</Text>
            <Text style={styles.sectionItemAmount}>{`$${item.amount.toFixed(2)}`}</Text>
        </TouchableOpacity>
    );

    const handleEditExpense = (expanse: Expense) => {
        dispatch(setChosenExpense(expanse))
        dispatch(setBottomSheetMode(BOTTOM_SHEET_MODE.EDIT))
    }

    const totalExpenses = (): string => {
        return expensesList.reduce((total, expense) => total + expense.amount, 0).toFixed(2);
    }

    const openFiltersSheet = () => {
        dispatch(setBottomSheetMode(BOTTOM_SHEET_MODE.FILTER))
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.fullName}>{fullName}</Text>
                <Text style={styles.totalExpenses}>{`Total Expenses: `}<Text style={styles.totalExpensesAmount}>{`$${totalExpenses()}`}</Text></Text>
                <TouchableOpacity style={styles.filtersButton} onPress={openFiltersSheet}>
                    <FiltersIcon />
                    <Text style={styles.filtersText}>Filters</Text>
                </TouchableOpacity>
            </View>
            <SectionList
                sections={expensesSections}
                renderItem={renderExpenseItem}
                keyExtractor={(item) => item.id}
                renderSectionHeader={renderSectionHeader}
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
