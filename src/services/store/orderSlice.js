
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postOrders } from '../api'
import { resetIngredients } from './constructorSlice';



export const fetchOrder = createAsyncThunk(
    'order/fetchOrder',
    async function (ids, { rejectWithValue, dispatch }) {
        try {

            const response = await postOrders(ids);
            if (!response.success) {
                throw new Error('Can\'t create order. Server error.');
            }
            dispatch(createOrder(response));
            dispatch(resetIngredients());

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        num: 0,
        status: null,
        error: null,
    },
    reducers: {
        createOrder(state, action) {
            state.num = action.payload.order.number;
        },
        restOrder(state, action) {
            state.num = 0;
        }
    },
    extraReducers: {
        [fetchOrder.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchOrder.fulfilled]: (state, action) => {
            state.status = 'resolved';


        }
        ,
        [fetchOrder.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },

    },
});

const { createOrder } = orderSlice.actions;
export const restOrder = orderSlice.actions.restOrder;
export default orderSlice.reducer;