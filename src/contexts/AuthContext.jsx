import React, { createContext, useReducer, useEffect } from "react";
import { decodeJWT } from '../helpers/auth-helper';

const getUserFromToken = (token) => {
    if (!token) return null;
  
    const { payload } = decodeJWT(token);
  
    return {
      id: payload.sub,
      name: payload.name,
      username: payload.username,
      roles: payload.roles !== undefined ? payload.roles : null,
      isAdmin: payload.isAdmin,
    };
  };

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

// Create context
export const AuthContext = createContext(initialState);

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decoded = getUserFromToken(token);
      dispatch({
        type: "LOGIN",
        payload: decoded,
      });
    }
  }, []);

  // Actions
  const login = (data) => {
    localStorage.setItem("access_token", data.accessToken);
    localStorage.setItem("refresh_token", data.refreshToken);
    dispatch({
      type: "LOGIN",
      payload: getUserFromToken(data.accessToken),
    });
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    dispatch({ type: "LOGOUT" });
    location.reload()
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
