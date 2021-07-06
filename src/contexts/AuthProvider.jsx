import React, { useState, useReducer } from "react";

export const AuthContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
		case "login":
			localStorage.setItem('token',action.token)
			return {
				...state,
				loggedIn: true,
				username: action.username,
				email: action.email
			};
    case "sign-out":
			localStorage.removeItem('token');
      return {
				loggedIn: false
			};
    default:
      return state;
  }
};

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    loggedIn: !!localStorage.getItem("token"),
    username: localStorage.getItem("username"),
  });
  const [auth, setAuth] = useState({
    loggedIn: !!localStorage.getItem("token"),
    username: localStorage.getItem("username"),
  });

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
}
