import React, { useState, useEffect } from "react";
import UserMenu from "./userMenu";
import '../OptionForm.css'; // Import the CSS file for styling
// import Layout from "./../../components/Layout/Layout";
import { useAuth } from "./AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import toast, { Toaster } from "react-hot-toast";
// import axios from "axios";

export default function Items() {
    const navigate= useNavigate();
    const location = useLocation();
    const [auth, setAuth] = useAuth();
    useEffect(()=>{

       if(!auth.token){

        navigate("/login",{
            state:location.pathname
        });
       }
    },[auth.token,navigate,location])

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [address, setAddress] = useState("");

  //get user data

  useEffect(() => {

    let { email, name,  location } = JSON.parse(localStorage.getItem("auth"));
    setName(name);
    // setPhone(phone);
    setEmail(email);
    setAddress(location);
    setPassword("");

  }, [auth.user]);

//   // form function
const handleSubmit = async (e) => {

    e.preventDefault();
    const response = await fetch("https://sst-food-backend-ykr3.onrender.com/api/profile", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': auth.token
      },
      body: JSON.stringify({  name:name,password:password,location:address})

    });
    const json = await response.json()

    if(json.success){
        setAuth({...auth,user:json.updatedUser});
        let ls = JSON.stringify(json.updatedUser);
        localStorage.setItem("auth",ls);

        toast.success("profile Updated Successfully");
    }else{
        toast.error("enter valid credentials")
    }
}

  return (
    // <Layout title={"Your Profile"}>
    <div style={{backgroundImage: 'url("https://source.unsplash.com/random/900x700/?food")', minHeight:'100vh', backgroundSize: 'cover' }} >
        <Navbar />
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3 mt-2">
            <UserMenu />
          </div>
          <div className="col-md-8">
            <div className="form-container" >
              <Toaster />
              <form className="option-form" onSubmit={handleSubmit} >
                <h4 className="title bg-success" style={{  textAlign: "center", marginTop: "0",borderRadius: "3px" }}>USER PROFILE</h4>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Name"
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Email "
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter Your Password"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Address"
                  />
                </div>

                <button type="submit" className="btn bg-success">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>

  );
};

// export default Profile;
