
import { createSlice } from '@reduxjs/toolkit';
import { bun } from '../../utils/data';


function arrayMove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}
const constructorSlice = createSlice({
    name: 'constructor',
    initialState: {
        counter: {},
        constructorBun: null,
        constructorOthers: [],
    },
    reducers: {
        addIngredient(state, action) {

            if (action.payload.type === bun) {
                if (state.constructorBun) state.counter[state.constructorBun._id] = 0;
                state.counter[action.payload._id] = 2;
                // state.counter.set(action.payload._id, 2);
                state.constructorBun = action.payload;

            } else {
                if (!state.constructorOthers.find((item) => item._id === action.payload._id)) {
                    //state.counter.set(action.payload._id, 1);
                    state.counter[action.payload._id] = 1;
                } else {
                    state.counter[action.payload._id] = state.counter[action.payload._id] + 1;
                   // state.counter.set(action.payload._id, state.counter.get(action.payload._id) + 1);
                }
                state.constructorOthers = [...state.constructorOthers, action.payload];
            }
        },
        removeIngredient(state, action) {
            state.constructorOthers = state.constructorOthers.filter((item, index) => index !== action.payload);
        },
        moveIngredient(state, action) {
            arrayMove(state.constructorOthers, action.payload.dragIndex, action.payload.hoverIndex);
        }

    }
});

export const { addIngredient, removeIngredient, moveIngredient } = constructorSlice.actions;

export default constructorSlice.reducer;