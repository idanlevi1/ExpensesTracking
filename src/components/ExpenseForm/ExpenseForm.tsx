import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LongButton } from '..';
import { CloseBtn } from '../../assets/svg';
import { setChosenExpense } from '../../redux/ExpensesStore/ExpensesStoreSlice';
import { RootState } from '../../redux/store';
import { BOTTOM_SHEET_MODE } from '../../utils/Constants';
import { COLORS, TEXT_STYLE } from '../../utils/StyleGuide';
import { generateRandomId } from '../../utils/Tools';

interface ExpenseFormProps {
    mode: BOTTOM_SHEET_MODE,
    onCloseBottomSheet: Function;
    sheetTitle: string;
    buttonText: string;
    isCleanOption?: boolean;
    onSubmit: Function;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
    mode,
    onCloseBottomSheet,
    sheetTitle,
    buttonText,
    isCleanOption = false,
    onSubmit,
}) => {
    const { chosenExpense } = useSelector((state: RootState) => state.expensesStore)
    const [title, setTitle] = useState<string>('');
    const [amount, setAmount] = useState<number | string>('');
    const [date, setDate] = useState<string>('');
    const [isValidTitle, setIsValidTitle] = useState(true);
    const [isValidAmount, setIsValidAmount] = useState(true);
    const [isValidDate, setIsValidDate] = useState(true);

    const dispatch = useDispatch()

    React.useEffect(() => {
        if (mode == BOTTOM_SHEET_MODE.EDIT && chosenExpense) {
            setTitle(chosenExpense.title)
            setAmount(chosenExpense.amount.toString())
            setDate(chosenExpense.date)
        }
    }, [chosenExpense])


    const handleSubmitExpenseForm = () => {
        if (title.length && amount.toString().length && date.length && isValidTitle && isValidAmount && isValidDate) {
            const newExpense = {
                id: chosenExpense?.id || generateRandomId(),
                title,
                amount: +amount,
                date,
            };
            onSubmit(newExpense)
            onCloseBottomSheet();
            resetForm()
            chosenExpense?.id && dispatch(setChosenExpense(null))
        } else {
            validateTitle(title)
            validateAmount(amount)
            validateDate(date)
        }
    };

    const validateTitle = (title) => {
        const titleIsValid = title.trim() !== '';
        setIsValidTitle(titleIsValid);
    }

    const validateAmount = (amount) => {
        const amountIsValid = !isNaN(parseFloat(amount)) && parseFloat(amount) > 0;
        setIsValidAmount(amountIsValid);
    }

    const validateDate = (date) => {
        const dateRegex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
        const dateIsValid = dateRegex.test(date);
        setIsValidDate(dateIsValid);
    }

    const onChangeTitle = (title) => {
        validateTitle(title)
        setTitle(title)
    }

    const onChangeAmount = (amount) => {
        validateAmount(amount)
        setAmount(amount)
    }

    const onChangeDate = (date) => {
        validateDate(date)
        setDate(date)
    }

    const resetForm = () => {
        setTitle('');
        setAmount('');
        setDate('');
    }

    return (
        <View style={styles.container}>
            {/* <View style={styles.topButtons}> */}
            <TouchableOpacity style={styles.closeButton} onPress={onCloseBottomSheet}>
                <CloseBtn onPress={onCloseBottomSheet} />
            </TouchableOpacity>
            {isCleanOption && (
                <View style={styles.clearButton}>
                    <Button title="clear" onPress={resetForm} />
                </View>)}
            {/* </View> */}
            <Text style={styles.title}>{sheetTitle}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, !isValidTitle && styles.inputError]}
                    placeholder="Title"
                    placeholderTextColor={COLORS.input_text_placeholder_form}
                    value={title}
                    onChangeText={onChangeTitle}
                />
                {!isValidTitle && <Text style={styles.errorText}>Title is required</Text>}
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, !isValidAmount && styles.inputError]}
                    placeholder="Amount"
                    placeholderTextColor={COLORS.input_text_placeholder_form}
                    value={amount}
                    onChangeText={onChangeAmount}
                    keyboardType="numeric"
                />
                {!isValidAmount && <Text style={styles.errorText}>Amount must be a positive number</Text>}
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, !isValidDate && styles.inputError]}
                    placeholder="Date"
                    placeholderTextColor={COLORS.input_text_placeholder_form}
                    value={date}
                    onChangeText={onChangeDate}
                />
                {!isValidDate && <Text style={styles.errorText}>Date must be in the format DD.MM.YYYY</Text>}
            </View>
            <View style={styles.buttonContainer}>
                <LongButton text={buttonText} onPress={handleSubmitExpenseForm} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 32,
    },
    topButtons: {

    },
    clearButton: {
        position: 'absolute',
        top: 2,
        left: 20,
    },
    title: {
        ...TEXT_STYLE.regularMediumText,
        textAlign: 'center',
        marginBottom: 26,
    },
    closeButton: {
        position: 'absolute',
        top: 2,
        right: 20,
    },
    inputContainer: {
        marginBottom: 52,
    },
    input: {
        height: 28,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.input_text_placeholder_form,
        ...TEXT_STYLE.regularMediumText,
    },
    inputError: {
        borderBottomColor: COLORS.error,
    },
    errorText: {
        color: COLORS.error,
        ...TEXT_STYLE.regularSmallText
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 62
    },
});

export default ExpenseForm;