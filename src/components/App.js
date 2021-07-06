import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import NavigationBar from "./NavigationBar";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/sign-up" exact component={SignUp} />
      </Switch>
      <NavigationBar />
    </Router>
  );
}

export default App;
