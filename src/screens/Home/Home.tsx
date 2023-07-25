import React from 'react';
import { View, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStackNavigator';
import { SCREEN } from '../../utils/Constants';

type HomeProp = {
    navigation: NativeStackNavigationProp<MainStackParamList, SCREEN.HOME>;
};

const Home: React.FC<HomeProp> = ({ navigation }) => {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>

        </View>
    );
}

export default Home;