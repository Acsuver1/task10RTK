
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action) => {
      const { token, username, email } = action.payload;
      state.token = token;
      state.user = { username, email }; 
    },
    
signUp: (state, action) => {
    state.token = action.payload.token
    localStorage.setItem("token", state.token)
  },
    logOut: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { logIn, logOut, signUp } = authSlice.actions;
export default authSlice.reducer;
