import './App.css';
import Home from "./components/Home"
import {BrowserRouter,Route,Switch} from "react-router-dom"
import StudentHome from "./components/StudentHome"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Home} />
        <Route exact path="/user" component={StudentHome} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
