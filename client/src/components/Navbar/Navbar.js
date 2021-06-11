import React from 'react'
import {Link,withRouter} from "react-router-dom"
import Cookies from "js-cookie"

let user
const NavbarComponent = (props) => {

  const onClickLogout=()=>{
    Cookies.remove("token")
    Cookies.remove("isadmin")
    const {history} = props
    history.replace("/login")
  }

  const isadmin = Cookies.get("isadmin")
  if(isadmin==="3"){
    user="Incharge"
  }else if(isadmin==="2"){
    user="HOD"
  }else if(isadmin==="1"){
    user="Warden"
  }else{
    user="Student"
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark  ">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">V-outing</Link>
              <button className="navbar-toggler text-white togglerCustom" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon text-white"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ml-auto pl-4">
                        <Link className="nav-link navLink text-white">Hello {user}</Link>
                        <Link className="nav-link navLink text-white" to="/add/student">Add Student</Link>
                        <Link className="nav-link navLink text-white" onClick={onClickLogout} >Logout</Link>
                        
                    </div>
                </div>
              
            </div>
        </nav>
    </div>
  );
}

export default withRouter(NavbarComponent);