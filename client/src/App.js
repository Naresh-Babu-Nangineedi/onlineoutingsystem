import './App.css';
import Home from "./components/Home"
import {BrowserRouter,Route,Switch} from "react-router-dom"
import StudentHome from "./components/StudentHome"
import InchargeHome from "./components/InchargeHome"
import HodHome from "./components/HodHome"
import WardenHome from "./components/WardenHome"
import AddStudent from "./components/AddStudent"
import InchargeProtected from "./components/ProtectedRoutes/InchargeProtected"
import HodProtected from "./components/ProtectedRoutes/HodProtected"
import WardenProtected from "./components/ProtectedRoutes/WardenProtected"
import StudentProtected from "./components/ProtectedRoutes/StudentProtected"
function App() {
  

  return (
    <BrowserRouter>
      
      <Switch>
        <Route exact path="/login" component={Home} />
        <StudentProtected exact path="/" component={StudentHome} />
        <InchargeProtected exact path="/incharge" component={InchargeHome} />
        <InchargeProtected exact path="/add/student" component={AddStudent}/>
        <HodProtected exact path="/hod" component={HodHome} />
        <WardenProtected exact path="/warden" component={WardenHome} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
