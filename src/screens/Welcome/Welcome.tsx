import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStackNavigator';
import { SCREEN } from '../../utils/Constants';
import { COLORS, TEXT_STYLE } from '../../utils/StyleGuide';
import { LongButton } from '../../components';

type WelcomeProp = {
    navigation: NativeStackNavigationProp<MainStackParamList, SCREEN.WELCOME>;
};

const Welcome: React.FC<WelcomeProp> = ({ navigation }) => {

    const [name, setName] = useState('');

    const handleButtonPress = () => {
        console.log('🚀 Button Pressed! Entered Name:', name);
        //TODO: save full name
        navigation.navigate(SCREEN.HOME)
    };
    return (
        <View style={styles.container}>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Enter Name"
                    placeholderTextColor={COLORS.input_text_placeholder}
                    value={name}
                    onChangeText={setName}
                />
            </View>

            <View style={styles.buttonContainer}>
                <LongButton
                    text={'Login'}
                    onPress={handleButtonPress}
                />
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background_screen,
        alignItems: 'center',
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    inputText: {
        borderWidth: 1,
        borderColor: COLORS.button_long_background,
        borderRadius: 3,
        padding: 10,
        width: 255,
        height: 55,
        ...TEXT_STYLE.regularSmallText,
    },
    buttonContainer: {
        marginBottom: 61,
    },
});


export default Welcome;