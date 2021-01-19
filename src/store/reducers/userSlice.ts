import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as authApi from '../../services/api';
import { AppDispatch, RootState } from '../store';
import { 
    ISigninRequest,
    ISigninResponse,
    IResponseError,
    IRegisterResponse,
    IRegisterRequest,
    IUserState
 } from '../../models/types';

export const signinUser = createAsyncThunk<
    ISigninResponse,
    ISigninRequest,
    {
        dispatch: AppDispatch;
        state: RootState;
        extra: undefined;
        rejectValue: IResponseError;
    }
>(
    'user/signin',
    async ({email, password}:ISigninRequest, {rejectWithValue}) => {
        try {
            const response = await authApi.signin(email, password);
            return response;
        } catch (error) {
            const responseError : IResponseError = {
                errorMessage: error.response.data
            } 
            return rejectWithValue(responseError)
        }
    }
)

export const registerUser = createAsyncThunk<
    IRegisterResponse,
    IRegisterRequest,
    {
        dispatch: AppDispatch;
        state: RootState;
        extra: undefined;
        rejectValue: IResponseError;
    }
>(
    'user/register',
    async ({name, email, password, role}:IRegisterRequest, {rejectWithValue}) => {
        try {
            const response = await authApi.register(name, email, password, role);
            return response;
        } catch (error) {
            const responseError : IResponseError = {
                errorMessage: error.response.data
            } 
            return rejectWithValue(responseError)
        }
        
    }
)

const initialState: IUserState = {
    name: '',
    email: '',
    role: '',
    request: {
        error: '',
        loading: false
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        removeRequestError: (state) => {
            state.request.error = '';
        }
    },
    extraReducers: builder => {
        builder.addCase(signinUser.pending, (state) => {
            state.request.loading = true;
        })
        builder.addCase(signinUser.fulfilled, (state, {payload}:PayloadAction<ISigninResponse>) => {
            state.name = payload.name;
            state.email = payload.email;
            state.role = payload.role;
            state.request.error = '';
            state.request.loading = false;
        })
        builder.addCase(signinUser.rejected, (state, {payload}:PayloadAction<IResponseError | undefined>) => {
            if (payload) {
                state.request.error = payload.errorMessage
            }
            state.request.loading = false;
        })
        builder.addCase(registerUser.pending, (state) => {
            state.request.loading = true;
        })
        builder.addCase(registerUser.fulfilled, (state, {payload}:PayloadAction<IRegisterResponse>) => {
            state.name = payload.name;
            state.email = payload.email;
            state.role = payload.role;
            state.request.error = '';
            state.request.loading = false;
        })
        builder.addCase(registerUser.rejected, (state, {payload}:PayloadAction<IResponseError | undefined>) => {
            if (payload) {
                state.request.error = payload.errorMessage
            }
            state.request.loading = false;
        })
    }
}); 

export const { removeRequestError } = userSlice.actions;

export default userSlice.reducer;