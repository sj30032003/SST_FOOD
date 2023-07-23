import React, { useState, useEffect } from 'react'
import { useAuth } from './AuthContext';
import Navbar from './Navbar';
import { Select } from "antd";
import toast, { Toaster } from "react-hot-toast";
import { Toast } from 'bootstrap';
const { Option } = Select;
export default function Users() {
  const [auth, setAuth] = useAuth();
  const [allUsers, setAllUsers] = useState([]);
  const [status, setStatus] = useState(["active", "inactive"]);
  const [roles,setRole]= useState([0,1]);
  const getUsers = async () => {
    try {
      const { data } = await fetch("https://sst-food-backend-ykr3.onrender.com/api/users", {
        // credentials: 'include',
        // Origin:"http://localhost:3000/login",
        method: 'GET',
        headers: {
          'authorization': auth.token
        },
      }).then(async (res) => {
        let response = await res.json();

        await setAllUsers(response.users)


      });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getUsers();
  }, [auth?.token]);
  const handleChangeRole = async(userId,value)=>{
    try {
      const response = await fetch(`https://sst-food-backend-ykr3.onrender.com/api/user-role/${userId}`, {
        // credentials: 'include',
        // Origin:"http://localhost:3000/login",
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization': auth.token
        },
        body: JSON.stringify({ role:value})

      });
      const json = await response.json()

      if(json.success){
          getUsers()
          toast.success("role Updated Successfully");
      }else{
          toast.error("error in role update")
      }
      } catch (error) {
        console.log(error);
      }

  }
  const handleChangeStatus = async (userId, value) => {
    try {
    const response = await fetch(`https://sst-food-backend-ykr3.onrender.com/api/user-status/${userId}`, {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': auth.token
      },
      body: JSON.stringify({ status:value})

    });
    const json = await response.json()

    if(json.success){
        getUsers()
        toast.success("status Updated Successfully");
    }else{
        toast.error("error in status update")
    }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <Navbar />
      <Toaster />
      <h1 className="text-center">All Users</h1>
      <div className="border shadow">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              {/* <th scope="col">Order_id</th> */}
              <th scope="col">id</th>
              <th scope="col"> email</th>
              <th scope="col">name</th>
              <th scope="col">location</th>
              <th scope="col">role</th>
              <th scope="col">status</th>

            </tr>
          </thead>

          {allUsers?.map((u, i) => {
            return (

              <tbody>
                <tr>
                  <td>{i + 1}</td>
                  {/* <td>{o._id}</td> */}
                  <td>{u._id}</td>
                  <td>{u.email}</td>
                  <td>{u.name}</td>
                  <td>{u.location}</td>
                  <td><Select
                    bordered={false}
                    onChange={(value) => handleChangeRole(u._id, value)}
                    defaultValue={u?.role}
                  >
                    {roles.map((s, i) => (
                      <Option key={i} value={s}>
                        {s}
                      </Option>
                    ))}
                  </Select></td>
                  <td><Select
                    bordered={false}
                    onChange={(value) => handleChangeStatus(u._id, value)}
                    defaultValue={u?.status}
                  >
                    {status.map((s, i) => (
                      <Option key={i} value={s}>
                        {s}
                      </Option>
                    ))}
                  </Select></td>
                </tr>
              </tbody>
            )
          })}
        </table>

      </div>

    </div>
  )
}
