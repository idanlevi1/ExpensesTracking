import React from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import BottomSheetComponent from '../BottomSheetComponent';
import ExpenseForm from '../ExpenseForm/ExpenseForm';
import { useDispatch, useSelector } from 'react-redux'
import { addExpense, editExpense, Expense } from '../../redux/ExpensesStore/ExpensesStoreSlice';
import { RootState } from '../../redux/store';
import { BOTTOM_SHEET_MODE } from '../../utils/Constants';

interface BottomSheetControlProps { }

const BottomSheetControl: React.FC<BottomSheetControlProps> = () => {
    const dispatch = useDispatch()
    const { bottomSheetMode } = useSelector((state: RootState) => state.appStore);

    const bottomSheetRefCreate = React.useRef<BottomSheet>(null);
    const snapPointsCreate = React.useMemo(() => ['1%', '93%'], []);
    const handleOpenBottomSheetCreate = () => bottomSheetRefCreate.current?.expand()
    const handleCloseBottomSheetCreate = () => bottomSheetRefCreate.current?.close()

    const bottomSheetRefEdit = React.useRef<BottomSheet>(null);
    const snapPointsEdit = React.useMemo(() => ['1%', '93%'], []);
    const handleOpenBottomSheetEdit = () => bottomSheetRefEdit.current?.expand()
    const handleCloseBottomSheetEdit = () => bottomSheetRefEdit.current?.close()

    const bottomSheetRefFilters = React.useRef<BottomSheet>(null);
    const snapPointsFilters = React.useMemo(() => ['1%', '67%'], []);
    const handleOpenBottomSheetFilters = () => bottomSheetRefFilters.current?.expand()
    const handleCloseBottomSheetFilters = () => bottomSheetRefFilters.current?.close()

    React.useEffect(() => {
        const { CREATE, EDIT, FILTER } = BOTTOM_SHEET_MODE
        switch (bottomSheetMode) {
            case CREATE:
                handleOpenBottomSheetCreate()
                break;
            case EDIT:
                handleOpenBottomSheetEdit()
                break;
            case FILTER:
                handleOpenBottomSheetFilters()
                break;
            default:
                break;
        }
    }, [bottomSheetMode])


    return (
        <React.Fragment>
            <BottomSheetComponent
                bottomSheetRef={bottomSheetRefCreate}
                snapPoints={snapPointsCreate}
                onClose={handleCloseBottomSheetCreate} >
                <ExpenseForm
                    mode={BOTTOM_SHEET_MODE.CREATE}
                    onSubmit={(expense: Expense) => dispatch(addExpense(expense))}
                    sheetTitle={'Create Expense'}
                    buttonText={'Create'}
                    onCloseBottomSheet={handleCloseBottomSheetCreate} />
            </BottomSheetComponent>
            <BottomSheetComponent
                bottomSheetRef={bottomSheetRefEdit}
                snapPoints={snapPointsEdit}
                onClose={handleCloseBottomSheetEdit} >
                <ExpenseForm
                    mode={BOTTOM_SHEET_MODE.EDIT}
                    onSubmit={(expense: Expense) => dispatch(editExpense(expense))}
                    sheetTitle={'Edit Expense'}
                    buttonText={'Save'}
                    onCloseBottomSheet={handleCloseBottomSheetEdit} />
            </BottomSheetComponent>
            <BottomSheetComponent
                bottomSheetRef={bottomSheetRefFilters}
                snapPoints={snapPointsFilters}
                onClose={handleCloseBottomSheetFilters}
                backgroundOpacity={0}>
                <ExpenseForm
                    mode={BOTTOM_SHEET_MODE.FILTER}
                    onSubmit={(expense: Expense) => dispatch(editExpense(expense))}
                    sheetTitle={'Filters'}
                    buttonText={'Filter'}
                    isCleanOption={true}
                    onCloseBottomSheet={handleCloseBottomSheetFilters} />
            </BottomSheetComponent>
        </React.Fragment>
    );
};

export default BottomSheetControl;

