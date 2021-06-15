import React, { Component } from 'react'
import NavbarComponent from "../Navbar/Navbar"
import Cookies from "js-cookie"
import UserCard from "../UserCard"

class HodOutings extends Component {

    state={
        allHodOutings:[]
    }

    getAllHodOutings=async()=>{
        const url = `/api/hod/allOutings`
        const options={
            method:"GET",
            headers:{
                "Authorization":Cookies.get("token")
            }
        }
        const response = await fetch(url,options)
        const data = await response.json()
       // console.log(data)
        this.setState({allHodOutings:data})
    }

    componentDidMount=()=>{
        this.getAllHodOutings()
    }

    render() {

        const {allHodOutings} = this.state
        return (
            <div>
                <NavbarComponent />
                
                {allHodOutings.map((user)=>(
                    <UserCard key={user._id} userId={user.userId} outing={user} />
                ))}
                    
            </div>
        )
    }
}

export default HodOutings
