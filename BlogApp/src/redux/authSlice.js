/* eslint-disable no-unreachable */
import authService from "../appwrite/authService";

import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      //accout create logic from appwrite/authService
      const userAccount = await authService.createAccount({ email, password, name });
      if(userAccount){
        await authService.logout(); // Add this line to clear existing sessions
        return await authService.login({email,password})
      } else {
        return userAccount;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
      try {
        //accout create logic from appwrite/authService
        return await authService.login({ email, password });
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
      try {
        //logout user
        await authService.logout();
        return true
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const getCurrentUser = createAsyncThunk(
    "auth/currentUser",
    async (_, { rejectWithValue }) => {
      try {
        //logout user
        return await authService.getCurrentUser();
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:{
    resetError(state){
      state.error = null;
    }
  },
  extraReducers(builder){
    builder
    .addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase(registerUser.rejected, (state,action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    })
    .addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase(loginUser.rejected, (state,action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload?.code === 401
        ? "Invalid email or password"
        : action.payload?.message || "An Error Occured";
    })
    .addCase(getCurrentUser.pending, (state)=>{
      state.isLoading = true
    })
    .addCase(getCurrentUser.fulfilled, (state,action)=>{
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase(getCurrentUser.rejected,(state,action)=>{
      state.isLoading = false;
      state.error = action.payload
    })
    .addCase(logoutUser.pending, (state)=>{
      state.isLoading = true
    })
    .addCase(logoutUser.fulfilled, (state)=>{
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    })
    .addCase(logoutUser.rejected,(state,action)=>{
      state.isLoading = false;
      state.error = action.payload
    })
  },
});


export const {resetError} = authSlice.actions;
export default authSlice.reducer;