import React, { Component } from 'react'
import AdminLogin from "../AdminLogin"
import StudentLogin from "../StudentLogin"

class Home extends Component {
    render() {
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
