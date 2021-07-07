import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import React from 'react';
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import NavigationBar from "./NavigationBar";
import AuthProvider from "../contexts/AuthProvider";
import Dashboard from "./Dashboard";
import ProtectedRoute from "../utils/ProtectedRoute";
import Trip from "./Trip";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavigationBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/sign-up" exact component={SignUp} />
          <ProtectedRoute path="/dashboard" exact component={Dashboard}/>
          <ProtectedRoute path="/trips/:id" exact component={Trip} />
          <Route render={() => <h1>404 Page not found</h1>} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
