import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { LongButton } from '..';
import { CloseBtn } from '../../assets/svg';
import { COLORS, TEXT_STYLE } from '../../utils/StyleGuide';

interface ExpenseFormProps {
    onCloseBottomSheet: Function;
    sheetTitle: string;
    buttonText: string;
    isCleanOption: boolean;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
    onCloseBottomSheet,
    sheetTitle,
    buttonText,
    isCleanOption = false,
}) => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [isValidTitle, setIsValidTitle] = useState(true);
    const [isValidAmount, setIsValidAmount] = useState(true);
    const [isValidDate, setIsValidDate] = useState(true);

    const handleCreateExpense = () => {
        if (isValidTitle && isValidAmount && isValidDate) {
            const newExpense = {
                title,
                amount: parseFloat(amount),
                date,
            };
            //TODO: add ti the list
            onCloseBottomSheet();
            resetForm()

        }
    };

    const resetForm = () => {
        setTitle('');
        setAmount('');
        setDate('');
    }

    const onChangeTitle = (title) => {
        const titleIsValid = title.trim() !== '';
        setIsValidTitle(titleIsValid);
        setTitle(title)
    }

    const onChangeAmount = (amount) => {
        const amountIsValid = !isNaN(parseFloat(amount)) && parseFloat(amount) > 0;
        setIsValidAmount(amountIsValid);
        setAmount(amount)
    }

    const onChangeDate = (date) => {
        const dateRegex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
        const dateIsValid = dateRegex.test(date);
        setIsValidDate(dateIsValid);
        setDate(date)
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
                <LongButton text={buttonText} onPress={handleCreateExpense} />
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
