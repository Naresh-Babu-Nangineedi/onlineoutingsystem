import './App.css';
import Home from "./components/Home"
import {BrowserRouter,Route,Switch} from "react-router-dom"
import StudentHome from "./components/StudentHome"
import InchargeHome from "./components/InchargeHome"
import HodHome from "./components/HodHome"
import WardenHome from "./components/WardenHome"
import Hostel from "./components/Hostel"
import AddStudent from "./components/AddStudent"
import ApplyOuting from "./components/ApplyOuting"
import Outings from "./components/Outings"
import InchargeOutings from "./components/InchargeOutings"
import EachInchargeOuting from "./components/EachInchargeOuting"
import HodOutings from "./components/HodOutings"
import EachHodOuting from "./components/EachHodOuting"
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
        <StudentProtected exact path="/apply/outing" component={ApplyOuting} />
        <InchargeProtected exact path="/incharge" component={InchargeHome} />
        <InchargeProtected exact path="/incharge/outings" component={InchargeOutings} />
        <InchargeProtected exact path="/hostel/:id" component={Hostel} />
        <InchargeProtected exact path="/add/student" component={AddStudent}/>
        <InchargeProtected exact path="/incharge/outing/:id/:user_id" component={EachInchargeOuting}/>
        <HodProtected exact path="/hod" component={HodHome} />
        <HodProtected exact path="/hod/outings" component={HodOutings} />
        <HodProtected exact path="/hod/outing/:id/:user_id" component={EachHodOuting} />
        <WardenProtected exact path="/warden" component={WardenHome} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
