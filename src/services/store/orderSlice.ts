
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postOrders } from '../api'
import { resetIngredients } from './constructorSlice';





export const fetchOrder = createAsyncThunk(
    'order/fetchOrder',
    async function (ids: Array<string>, { rejectWithValue, dispatch }) {
        try {

            const response = await postOrders(ids);
            if (!response.success) {
                throw new Error('Can\'t create order. Server error.');
            }
            dispatch(createOrder(response));
            dispatch(resetIngredients({}));

        } catch (error) {
            if (error instanceof TypeError)
                return rejectWithValue(error.message);
        }
    }
);
type TInitialState = {
    num: number,
    status?: string,
    error?: string
}
const initialState = {
    num: 0,
    status: undefined,
    error: undefined,
} as TInitialState;
const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        createOrder(state, action) {
            state.num = action.payload.order.number;
        },
        restOrder(state, action) {
            state.num = 0;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrder.pending, (state, action) => {
            state.status = 'loading';
            state.error = undefined;
        })
            .addCase(fetchOrder.fulfilled, (state, action) => {
                state.status = 'resolved';
            })
            .addCase(fetchOrder.rejected, (state, action) => {
                state.status = 'rejected';
                //state.error = action.payload;
            })

    },
});

const { createOrder } = orderSlice.actions;
export const restOrder = orderSlice.actions.restOrder;
export default orderSlice.reducer;