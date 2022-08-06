
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { passwordReset } from '../api'




export const fetchResetPassword = createAsyncThunk(
    'login/fetchResetPassword',
    async function (email, { rejectWithValue, dispatch }) {
        try {

            const response = await passwordReset(email);

            dispatch(setResult(response));

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const resetPasswordSlice = createSlice({
    name: 'resetPassword',
    initialState: {
        success: false
    },
    reducers: {
        setResult(state, action) {
            state.success = action.payload.success;
        }
    }
});

const { setResult } = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
