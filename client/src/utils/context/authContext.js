import decode from "jwt-decode";
import { createContext, useReducer } from "react";

const initialState = {
  user: null,
};

if (localStorage.getItem("token")) {
  const decodedToken = decode(localStorage.getItem("token"));

  if (decodedToken.exp < Date.now() / 1000) {
    localStorage.removeItem("token");
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (data) => {},
  logout: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (data) => {
    localStorage.setItem("token", data);
    const decodedToken = decode(data);
    dispatch({
      type: "LOGIN",
      payload: decodedToken,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        login: login,
        logout: logout,
        state: state,
        dispatch: dispatch,
      }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
