import React from 'react';
import { Text, TouchableOpacityProps, StyleSheet, View } from 'react-native';
import { COLORS, TEXT_STYLE } from '../../utils/StyleGuide';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

interface BottomSheetComponentProps extends TouchableOpacityProps {
    bottomSheetRef: BottomSheet;
    index: number;
    snapPoints: Array<string | number>;
    onClose: Function;
}

const BottomSheetComponent: React.FC<BottomSheetComponentProps> = ({
    bottomSheetRef,
    index = -1,
    snapPoints,
    onClose,
}) => {

    const renderBackdrop = React.useCallback(
        (props) => <BottomSheetBackdrop {...props} pressBehavior="close" />,
        [],
    );
    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={index}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            enableTouchThrough={true}
            keyboardBehavior="fillParent"
            handleIndicatorStyle={styles.indicator}
            backgroundStyle={styles.background}
        >
            <View style={styles.contentContainer}>
                <Text onPress={onClose}>Awesome 🎉</Text>
            </View>
        </BottomSheet>
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
    background: {
        backgroundColor: COLORS.background_bottom_sheet,
        borderRadius: 22
    },
    indicator: {
        backgroundColor: COLORS.background_bottom_sheet,
    }
});

export default BottomSheetComponent;

