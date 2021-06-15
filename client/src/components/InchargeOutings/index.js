import React, { Component } from 'react'
import NavbarComponent from "../Navbar/Navbar"
import Cookies from "js-cookie"
import UserCard from "../UserCard"

class InchargeOutings extends Component {

    state={
        allInchargeOutings:[]
    }

    getAllInchargeOutings=async()=>{
        const url = `/api/hostelIncharge/all_outings`
        const options={
            method:"GET",
            headers:{
                "Authorization":Cookies.get("token")
            }
        }
        const response = await fetch(url,options)
        const data = await response.json()
        console.log(data)
        this.setState({allInchargeOutings:data})
    }

    componentDidMount=()=>{
        this.getAllInchargeOutings()
    }

    render() {

        const {allInchargeOutings} = this.state
        return (
            <div>
                <NavbarComponent />
                
                {allInchargeOutings.map((user)=>(
                    <UserCard key={user._id} userId={user.userId} outing={user} />
                ))}
                    
            </div>
        )
    }
}

export default InchargeOutings
