import React, { Component } from 'react'
import AdminLogin from "../AdminLogin"
import StudentLogin from "../StudentLogin"
import Cookies from "js-cookie"
import {Redirect} from "react-router-dom"

class Home extends Component {
    render() {
        if(Cookies.get("isadmin")==="3"){
            return <Redirect to="/incharge" />
        }
        if(Cookies.get("isadmin")==="2"){
            return <Redirect to="/hod" />
        }
        if(Cookies.get("isadmin")==="1"){
            return <Redirect to="/warden" />
        }
        if(Cookies.get("isadmin")==="0"){
            return <Redirect to="/" />
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <AdminLogin />
                    </div>
                    <div className="col-12 col-md-6">
                        <StudentLogin />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
