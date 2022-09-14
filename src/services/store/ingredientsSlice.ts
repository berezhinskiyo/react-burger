import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { bun, sauce, main } from '../../utils/data';
import { getIngredients } from '../api'
import { TIngredient, TRes } from '../../types';
import type { PayloadAction } from '@reduxjs/toolkit'


export const fetchIngredients = createAsyncThunk(
    'ingredients/fetchIngredients',
    async function (_, { rejectWithValue, dispatch }) {
        try {

            const response = await getIngredients();
            if (!response.success) {
                throw new Error('Can\'t get burger ingredients. Server error.');
            }

            dispatch(loadIngredients(response));

        } catch (error) {
            if (error instanceof TypeError)
                return rejectWithValue(error.message);
        }
    }
);
type TInitialIngredientsState = {
    buns?: Array<TIngredient>,
    sauces?: Array<TIngredient>,
    mains?: Array<TIngredient>,
    data?: Array<TIngredient>,
    status?: string,
    error?: string
}
const initialState = {
    buns: [],
    sauces: [],
    mains: [],
    data: [],
    status: undefined,
    error: undefined,
} as TInitialIngredientsState;

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        loadIngredients(state, action: PayloadAction<TRes>) {
            state.data = action.payload.data;
            state.buns = action.payload.data?.filter(item => item.type === bun);
            state.sauces = action.payload.data?.filter(item => item.type === sauce);
            state.mains = action.payload.data?.filter(item => item.type === main);
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchIngredients.pending, (state, action) => {
            state.status = 'loading';
            state.error = undefined;
        })
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.status = 'resolved';
            })
            .addCase(fetchIngredients.rejected, (state, action) => {
                state.status = 'rejected';
                //state.error = action.payload;
            })

    },
});


const { loadIngredients } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;