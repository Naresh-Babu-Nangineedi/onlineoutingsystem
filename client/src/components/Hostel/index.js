import React, { Component } from 'react'
import Cookies from "js-cookie"
import NavbarComponent from "../Navbar/Navbar"
import "./index.css"
class Hostel extends Component {

    state={
        hostelData:[],
        searchInput:"",
        outing:false
    }

    onChangeSearchInput=(e)=>{
        this.setState({searchInput:e.target.value})
        // const {hostelData} = this.state
        // const filteredData = hostelData.filter(each=>each.)
    }

    getHostelData=async()=>{
        const {match} = this.props
        const {params} = match
        const {id} = params
        //console.log(id)
        const url = `/api/hostelIncharge/hostel/${id}`
        const options={
            method:"GET",
            headers:{
                "Authorization":Cookies.get("token")
            }
        }
        const response = await fetch(url,options)
        const data = await response.json()
       // console.log(data)
       this.setState({hostelData:data})
    }

    onChangeOuting=(e)=>{
        //console.log("CHECKED")
        const {outing} = this.state
        this.setState({outing:!outing})
    }

    componentDidMount=()=>{
        this.getHostelData()
    }

    render() {
        const {hostelData,searchInput,outing} = this.state
        //console.log(hostelData)
        let searchResults = hostelData.filter(eachUser=>eachUser.regno.includes(searchInput)||eachUser.firstname.toLowerCase().includes(searchInput.toLowerCase())||eachUser.lastname.toLowerCase().includes(searchInput.toLowerCase()))
        searchResults = hostelData.filter(eachUser=>eachUser.outing===outing)
        return (
            <div>
                <NavbarComponent />
                <div className="container">
                    <div className="row">
                    <div className="col-12">
                        <input type="search" placeholder="Search..." onChange={this.onChangeSearchInput}  className="form-control mt-5 mb-2" />
                        {/* <input type="checkbox" name="outing" value="in" onChange={this.onChangeOuting} className="ml-2" />
                        <label className="mr-3"> In Hostel</label> */}
                        <input type="checkbox" className="ml-2 mr-1" name="outing" value="out" onChange={this.onChangeOuting} />
                        <label> In Outing</label>
                    </div>
                    {
                    searchResults.map((student)=>(
                        <div className="card col-12 p-4 shadow col-lg-4 cardMargin" key={student._id}>
                            <h2>{student.firstname} {student.lastname}</h2>
                            <p><span className="sideHeading">Email: </span>{student.email}</p>
                            <p><span className="sideHeading">Reg.no: </span>{student.regno}</p>
                            <p><span className="sideHeading">Mobile: </span>{student.mobile}</p>
                            <p><span className="sideHeading">Year: </span>{student.year}</p>
                            <p><span className="sideHeading">Department: </span>{student.department}</p>
                            <p><span className="sideHeading">Section: </span>{student.section}</p>
                            <p><span className="sideHeading">Outing Type: </span>{student.outingtype}</p>
                            <p><span className="sideHeading">Parent/Guardian Mobile: </span>{student.parentmobile}</p>
                            <p><span className="sideHeading">Parent/Guardian Name: </span>{student.parent}</p>
                            <p><span className="sideHeading">Blood Group: </span>{student.bloodgroup}</p>
                            <p><span className="sideHeading">Hostel Name: </span>{student.hostelname}</p>
                            <p><span className="sideHeading">Outing: </span>{student.outing===true?"In Outing":"In Hostel"}</p>
                        </div>
                    ))
                }
                    </div>
                </div>
                

            </div>
        )
    }   
}

export default Hostel