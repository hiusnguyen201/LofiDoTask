import { createContext, useReducer, useEffect } from "react";
import * as api from "~/api";
import { isValidToken, setSession } from "~/utils/jwt";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  errMessage: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  CLEAR: (state) => ({
    ...state,
    isAuthenticated: false,
    isInitialized: false,
    user: null,
    errMessage: null,
  }),
  LOGIN: (state, action) => {
    return {
      ...state,
      isAuthenticated: true,
      isInitialized: true,
      user: action.payload.user,
      errMessage: null,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    errMessage: null,
  }),
  REGISTER: (state, action) => ({
    ...state,
    isAuthenticated: true,
    user: action.payload.user,
    errMessage: null,
  }),
  ERROR: (state, action) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    errMessage: action.payload,
  }),
};

const reducer = (state, action) => {
  const data = handlers[action.type](state, action);

  return handlers[action.type] ? { ...state, ...data } : state;
};

const AuthContext = createContext({
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  errMessage: null,
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // async function initialize() {
  //   try {
  //     const accessToken = localStorage.getItem("accessToken");

  //     if (accessToken && isValidToken(accessToken)) {
  //       const { data } = await api.getAccountInfo();
  //       dispatch({
  //         type: "INITIALIZE",
  //         payload: { isAuthenticated: true, user: data.data?.user },
  //       });
  //     } else {
  //       dispatch({
  //         type: "INITIALIZE",
  //         payload: { isAuthenticated: false, user: null },
  //       });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     dispatch({
  //       type: "INITIALIZE",
  //       payload: { isAuthenticated: false, user: null },
  //     });
  //   }
  // }

  // useEffect(() => {
  //   initialize();
  // }, []);

  const handleError = (e) => {
    dispatch({
      type: "ERROR",
      payload: e?.response?.data?.message || e?.response?.data || e,
    });
  };

  const handleRegister = async (payload) => {
    try {
      dispatch({ type: "CLEAR" });
      const { data } = await api.register(payload);
      const { accessToken, user } = data.data;
      setSession(accessToken);
      dispatch({ type: "REGISTER", payload: { user } });
    } catch (e) {
      handleError(e);
    }
  };

  const handleLogin = async (account, password) => {
    try {
      dispatch({ type: "CLEAR" });
      const { data } = await api.login(account, password);

      const { accessToken, refreshToken, user } = data.data;
      setSession(accessToken, refreshToken);

      dispatch({ type: "LOGIN", payload: { user } });
      console.log(state.isAuthenticated);
    } catch (e) {
      handleError(e);
    }
  };

  const handleLogout = async () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        // reInitialize: initialize,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
