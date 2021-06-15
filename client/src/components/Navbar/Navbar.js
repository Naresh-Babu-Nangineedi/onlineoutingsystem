import React from 'react'
import {Link,withRouter} from "react-router-dom"
import Cookies from "js-cookie"
import ChangeInchargePassword from "../ChangeInchargePassword"
let user
const NavbarComponent = (props) => {

  // const [password,setPassword] = useState({
  //   old_password:"",
  //   new_password:"",
  //   confirm_password:""
  // })

  // const [loading,setLoading] = useState(false)
  // const [error,setError] = useState(false)
  // const [errorMessage,setErrorMessage] = useState("")

  const onClickLogout=()=>{
    Cookies.remove("token")
    Cookies.remove("isadmin")
    const {history} = props
    history.replace("/login")
  }

  // const {old_password,new_password,confirm_password} = password
 


  // const onChangeHandler=(e)=>(setPassword({...password,[e.target.name]:e.target.value}))

  // const submitHandler=async(e)=>{
  //   e.preventDefault()
  //   //console.log(password)
  //   setLoading(true)
  //   if(new_password!==confirm_password){
  //     setError(true)
  //     setErrorMessage("New Password and Confirm Password must be same")
  //     setLoading(false)
  //     setPassword({
  //       old_password:"",
  //       new_password:"",
  //       confirm_password:""
  //     })
  //     return
  //   }
  //   setError(false)
  //   setErrorMessage("")
  //   const passwordData = {old_password,new_password}
  //   const url = "/api/hostelIncharge/change_password"
  //   const options = {
  //     method:"POST",
  //     body:JSON.stringify(passwordData),
  //     headers:{
  //       "Content-Type":"application/json",
  //       "Authorization":Cookies.get("token")
  //     }
  //   }
  //   const response = await fetch(url,options)
  //   const data = await response.json()
  //   console.log(data)
  //  // console.log(old_password)
  //   if(response.ok===true){
  //     setError(false)
  //     setErrorMessage("")
  //     setLoading(false)
  //     const {history} = props
  //     history.replace("/incharge")
  //   }else{
  //     setError(true)
  //     setErrorMessage(data.msg)
  //     setLoading(false)
  //     setPassword({
  //       old_password:"",
  //       new_password:"",
  //       confirm_password:""
  //     })
  //   }
  //   setLoading(false)
  //    setPassword({
  //     old_password:"",
  //     new_password:"",
  //     confirm_password:""
  //   })
  // }

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

  const inchargeLinks=()=>{
    return(
      <div className="navbar-nav">
        <Link className="nav-link navLink text-white" to="/add/student">Add Student</Link>
        <Link className="nav-link navLink text-white" to="/incharge/outings">Outings</Link>
        <Link className="nav-link navLink text-white" to="/add/student">Edit Student</Link>
      </div>
    )
  }
  const studentLinks=()=>{
    return(
      <div className="navbar-nav">
        <Link className="nav-link navLink text-white" to="/apply/outing">Apply Outing</Link>
        <Link className="nav-link navLink text-white" to="/my_outings">My Outings</Link>
      </div>
    )
  }
  const hodLinks=()=>{
    return(
      <div className="navbar-nav">
        <Link className="nav-link navLink text-white" to="/hod/outings">Outings</Link>
      </div>
    )
  }

  return (
    <div>
      <ChangeInchargePassword />
      {/* <div className="modal fade" id="changePassword" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Change Your Password</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                          <form onSubmit={submitHandler}>
                                <div className="form-group">
                                    <input type="password" onChange={onChangeHandler} required name="old_password" id="old_password" placeholder="Old Password" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <input type="password" onChange={onChangeHandler} required name="new_password" id="new_password" placeholder="New Password" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <input type="password" onChange={onChangeHandler} required name="confirm_password" id="confirm_password" placeholder="Confirm Password" className="form-control" />
                                </div>
                                <div className="text-center">
                                    {loading&&(
                                        <div className="mt-4">
                                            <div class="spinner-border" role="status">
                                            </div>
                                        </div>)
                                    }
                                  {error&&(<p>*{errorMessage}</p>)}
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                              <button type="submit" className="btn btn-success">Change Password</button>
                            </div>
                          </form>

                        </div>
                        
            </div>
          </div>
        </div> */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark  ">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">V-outing</Link>
              <button className="navbar-toggler text-white togglerCustom" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon text-white"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ml-auto pl-4">
                        <Link className="nav-link navLink text-white">Hello {user}</Link>
                        {Cookies.get("isadmin")==="3"&&(inchargeLinks())}
                        {Cookies.get("isadmin")==="2"&&(hodLinks())}
                        {Cookies.get("isadmin")==="0"&&(studentLinks())}
                        <Link className="nav-link navLink text-white" data-toggle="modal" data-target="#changePassword">
                              Change Password
                        </Link>
                        <Link className="nav-link navLink text-white" onClick={onClickLogout} >Logout</Link>
                        
                    </div>
                </div>
              
            </div>
        </nav>
    </div>
  );
}

export default withRouter(NavbarComponent);