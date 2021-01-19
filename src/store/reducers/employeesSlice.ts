import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as api from '../../services/api';
import { AppDispatch, RootState } from '../store';
import {
    IEmployee, IEmployeesState, IResponseError
} from '../../models/types';

export const getEmployees = createAsyncThunk<
    IEmployee[],
    string,
    {
        dispatch: AppDispatch;
        state: RootState;
        extra: undefined;
        rejectValue: IResponseError;
    }
>(
    'employees/fetchEmployees',
    async (_, {rejectWithValue}) => {
        try {
            const response = await api.getEmployees();
            return response;
        } catch (error) {
            const responseError : IResponseError = {
                errorMessage: error.response.data
            } 
            return rejectWithValue(responseError)
        }
        
    }
)

const initialState: IEmployeesState = {
    employeesList: [], 
    request: {
        error: '',
        loading: false
    }
}

export const employeesSlice = createSlice({
    name: 'employeesData',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getEmployees.pending, (state) => {
            state.request.loading = true;
        })
        builder.addCase(getEmployees.fulfilled, (state, {payload}:PayloadAction<IEmployee[]>) => {
            state.employeesList = payload;
            state.request.error = '';
            state.request.loading = false;
        })
        builder.addCase(getEmployees.rejected, (state, {payload}:PayloadAction<IResponseError | undefined>) => {
            if (payload) {
                state.request.error = payload.errorMessage
            }
            state.request.loading = false;
        })
    }   
});

export default employeesSlice.reducer;