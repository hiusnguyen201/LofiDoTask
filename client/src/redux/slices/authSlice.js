import { createSlice } from "@reduxjs/toolkit";
import { setSession, isValidToken } from "~/utils/jwt";
import * as api from "~/api";

const initialState = {
  isLoading: true,
  error: null,
  user: null,
  isAuthenticated: false,
  isInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    login(state, action) {
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isInitialized = true;
    },
    register(state, action) {
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isInitialized = true;
    },
    logout(state) {
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = false;
      state.user = null;
      state.isInitialized = false;
    },
    initialize(state, action) {
      const { isAuthenticated, user, isInitialized } = action.payload;
      state.isAuthenticated = isAuthenticated;
      state.isInitialized = isInitialized;
      state.user = user;
      state.isLoading = false;
      state.error = null;
    },
    clear(state) {
      state.isAuthenticated = false;
      state.isInitialized = false;
      state.user = null;
      state.error = null;
    },
  },
});

const { actions, reducer } = authSlice;

export default reducer;

export const login = (account, password) => async (dispatch) => {
  try {
    dispatch(actions.clear());
    dispatch(actions.startLoading());
    const { data } = await api.login(account, password);

    const { accessToken, refreshToken, user } = data.data;
    setSession(accessToken, refreshToken);

    dispatch(actions.login(user));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};

export const register = (payload) => async (dispatch) => {
  try {
    dispatch(actions.clear());
    dispatch(actions.startLoading());
    const { data } = await api.register(payload);

    const { accessToken, user } = data.data;
    setSession(accessToken);

    dispatch(actions.register(user));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    setSession(null);
    dispatch(actions.logout());
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};

export const initialize = () => async (dispatch) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken && isValidToken(accessToken)) {
      const { data } = await api.getAccountInfo();
      dispatch(
        actions.initialize({
          isAuthenticated: true,
          user: data.data.user,
          isInitialized: true,
        })
      );
    } else {
      dispatch(
        actions.initialize({
          isAuthenticated: false,
          user: null,
          isInitialized: false,
        })
      );
    }
  } catch (e) {
    console.log(e);
    dispatch(
      actions.initialize({
        isAuthenticated: false,
        user: null,
        isInitialized: false,
      })
    );
  }
};
