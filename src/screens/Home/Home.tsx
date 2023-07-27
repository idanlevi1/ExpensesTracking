import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStackNavigator';
import { SCREEN } from '../../utils/Constants';
import { useSelector } from 'react-redux'
import { COLORS, TEXT_STYLE } from '../../utils/StyleGuide';
import { RootState } from '../../redux/store';

type HomeProp = {
    navigation: NativeStackNavigationProp<MainStackParamList, SCREEN.HOME>;
};

const Home: React.FC<HomeProp> = ({ navigation }) => {
    const { fullName } = useSelector((state: RootState) => state.userStore);

    return (
        <View style={styles.container}>
            <View style={styles.line}>
                <Text style={styles.lineText}>{fullName}</Text>
            </View>
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
export default Home;