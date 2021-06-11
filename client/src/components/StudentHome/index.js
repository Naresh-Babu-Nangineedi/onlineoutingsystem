import React, { Component } from 'react'
import Cookies from "js-cookie"
import {Redirect} from "react-router-dom"

class StudentLogin extends Component {
    render() {
        const token = Cookies.get("token")
        if(token===undefined){
            return <Redirect to="/login" />
        }

        return (
            <div>
                <h1>Student Home</h1>
            </div>
        )
    }
}

export default StudentLogin