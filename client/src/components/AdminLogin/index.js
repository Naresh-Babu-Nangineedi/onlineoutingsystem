import React, { Component } from 'react'
import "./index.css"

class AdminLogin extends Component {
    render() {
        return (
            <div className="container card p-4 text-center adminCard">
                <div className="row">
                    <h1 className="mb-5">Admin Login</h1>
                    <form>
                        <input type="email" className="form-control mb-3" name="email" placeholder="Email"/>
                        <input type="password" className="form-control" name="password" placeholder="Password"/>
                        <input type="submit" className="btn btn-primary mt-3 w-100" value="Login" />
                    </form>
                </div>
            </div>
        )
    }
}

export default AdminLogin
