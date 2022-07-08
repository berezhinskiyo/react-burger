
import { createSlice } from '@reduxjs/toolkit';
import { bun } from '../../utils/data';
import { v4 as uuidv4 } from 'uuid';


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
                state.constructorBun = { item: action.payload, uuid: uuidv4() }



            } else {
                if (!state.constructorOthers.find((item) => item._id === action.payload._id)) {
                    state.counter[action.payload._id] = 1;
                } else {
                    state.counter[action.payload._id] = state.counter[action.payload._id] + 1
                }
                state.constructorOthers = [...state.constructorOthers, { item: action.payload, uuid: uuidv4() }];


            }
        },
        removeIngredient(state, action) {
            state.constructorOthers = state.constructorOthers.filter((item, index) => index !== action.payload);
        },
        moveIngredient(state, action) {
            arrayMove(state.constructorOthers, action.payload.dragIndex, action.payload.hoverIndex);
        },
        resetIngredients(state, action) {
            state.constructorOthers = [];
            state.constructorBun = null;
            state.counter = {};
        },

    }
});

export const { addIngredient, removeIngredient, moveIngredient, resetIngredients } = constructorSlice.actions;

export default constructorSlice.reducer;