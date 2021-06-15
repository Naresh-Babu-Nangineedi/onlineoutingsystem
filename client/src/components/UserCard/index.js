import React, { Component } from 'react'
import Cookies from "js-cookie"
import "./index.css"
import {Link} from "react-router-dom"
import EachHodOuting from "../EachHodOuting"


let urlParameter
class UserCard extends Component {

    state={
        user:{}
    }

    
    getUser=async(id)=>{
        let url 
        if(Cookies.get("isadmin")==="3"){
            url = `/api/hostelIncharge/user/${id}`
            urlParameter="incharge"
        }
        else if(Cookies.get("isadmin")==="2"){
            url = `/api/hod/user/${id}`
            urlParameter = "hod"
        }
        const options={
            method:"GET",
            headers:{
                "Authorization":Cookies.get("token")
            }
        }
        const response = await fetch(url,options)
        const data = await response.json()
        console.log(data)
        this.setState({user:data})
    }

    componentDidMount=()=>{
        const {userId} = this.props
        this.getUser(userId)
    }

    render() {
        const {user} = this.state
        const {outing} = this.props
        return (
            <div className="container">
                <div className="row customStylesFlex card m-4 p-3">
                    <div>
                        <h2>{user.firstname}</h2>
                    </div>
                    <div className="d-flex flex-row">
                        <h2>Year: {user.year}-</h2>
                        <h2>Sec: {user.section}</h2>
                    </div>
                    <div>
                        <Link to={`/${urlParameter}/outing/${outing._id}/${outing.userId}`}>
                            <button className="btn btn-primary mt-1">View Details</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserCard
