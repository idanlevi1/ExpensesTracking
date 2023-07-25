import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStackNavigator';
import { SCREEN } from '../../utils/Constants';

type WelcomeProp = {
    navigation: NativeStackNavigationProp<MainStackParamList, SCREEN.WELCOME>;
};

const Welcome: React.FC<WelcomeProp> = ({ navigation }) => {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Welcome Screen</Text>
            <Button title="Login" onPress={() => navigation.navigate(SCREEN.HOME)} />
        </View>
    );
}

export default Welcome;