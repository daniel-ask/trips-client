import React, { useContext, useReducer } from "react";

export const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

const reducer = (state, action) => {
  switch (action.type) {
		case "login":
			localStorage.setItem('token',action.token)
			return {
				...state,
				loggedIn: true,
				username: action.value.username,
				email: action.value.email,
        profile_pic: action.value.profile_pic
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
  const [auth, authDispatch] = useReducer(reducer, {
    loggedIn: !!localStorage.getItem("token"),
    username: localStorage.getItem("username"),
  });
  // const [auth, setAuth] = useState({
  //   loggedIn: !!localStorage.getItem("token"),
  //   username: localStorage.getItem("username"),
  // });

  return (
    <AuthContext.Provider value={{ auth, authDispatch}}>
      {children}
    </AuthContext.Provider>
  );
}
