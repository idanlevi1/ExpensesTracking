import React from 'react';
import { View, Text } from 'react-native';
import { TAB } from '../../utils/Constants';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { HomeBottomTabsParamList } from '../../navigation/HomeBottomTabs';

type ProfileProp = {
    navigation: BottomTabNavigationProp<HomeBottomTabsParamList, TAB.HOME>;
};

const Profile: React.FC<ProfileProp> = ({ navigation }) => {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Profile Screen</Text>
        </View>
    );
}

export default Profile;