
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { bun, sauce, main } from '../../utils/data';
import { getIngredients } from '../api'


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
            return rejectWithValue(error.message);
        }
    }
);

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: {
        buns: [],
        sauces: [],
        mains: [],
        status: null,
        error: null,
    },
    reducers: {
        loadIngredients(state, action) {

            state.buns = action.payload.data.filter(item => item.type === bun);
            state.sauces = action.payload.data.filter(item => item.type === sauce);
            state.mains = action.payload.data.filter(item => item.type === main);
        }
    },
    extraReducers: {
        [fetchIngredients.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchIngredients.fulfilled]: (state, action) => {
            state.status = 'resolved';
        }
        ,
        [fetchIngredients.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },

    },
});

const { loadIngredients } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;