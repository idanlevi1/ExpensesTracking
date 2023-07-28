import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { COLORS, TEXT_STYLE } from '../../utils/StyleGuide';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useDispatch } from 'react-redux';
import { setBottomSheetMode } from '../../redux/AppStore/AppStoreSlice';

interface BottomSheetComponentProps {
    bottomSheetRef: BottomSheet;
    index: number;
    snapPoints: Array<string | number>;
    children: React.ReactNode;
}

const BottomSheetComponent: React.FC<BottomSheetComponentProps> = ({
    bottomSheetRef,
    index = -1,
    snapPoints,
    children,
}) => {
    const dispatch = useDispatch()

    const renderBackdrop = React.useCallback(
        (props) => <BottomSheetBackdrop {...props} pressBehavior="close" />,
        [],
    );

    const onChange = (index: number) => {
        dispatch(setBottomSheetMode(null))
    }

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
            onChange={onChange}
        >
            {children}
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

