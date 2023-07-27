import React from 'react';
import { TouchableOpacity, Text, ViewStyle, StyleProp, TouchableOpacityProps, StyleSheet } from 'react-native';
import { COLORS, TEXT_STYLE } from '../../utils/StyleGuide';

interface LongButtonProps {
    containerStyle?: StyleProp<ViewStyle>;
    text?: string;
    onPress?: () => void;
    buttonBackgroundColor?: string;
    textColor?: string;
}

const LongButton: React.FC<LongButtonProps> = ({
    containerStyle,
    text,
    onPress,
    buttonBackgroundColor = COLORS.button_long_background,
    textColor = COLORS.button_text,
}) => {
    return (
        <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: buttonBackgroundColor }, containerStyle]} onPress={onPress}>
            <Text style={[{ color: textColor }, styles.buttonText]}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        width: 148,
        height: 49,
        borderRadius: 50,
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        justifyContent: 'center',
        ...TEXT_STYLE.boldSmallText,
    },
});

export default LongButton;

