import React, { Component } from 'react'
import Cookies from "js-cookie"

class StudentLogin extends Component {
    render() {

        const {history} = this.props
        const token = Cookies.get("token")
        if(token===undefined){
            history.push("/login")
        }
        if(Cookies.get("isadmin")===0&&token!==undefined){
            history.push("/user")
        }

        return (
            <div>
                <h1>Student Home</h1>
            </div>
        )
    }
}

export default StudentLogin