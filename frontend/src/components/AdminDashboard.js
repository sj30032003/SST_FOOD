import React ,{useState,useEffect} from 'react'
import Navbar from './Navbar';
import {useAuth} from './AuthContext';
import toast, { Toaster } from "react-hot-toast";

export default function AdminDashboard() {


  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);
  const [show ,setShow]= useState(false);
  const[orderData,setOrderData]=useState({})
  const[Id,setId]= useState("");
  const date="";
  const fetchOrder=async(order_id)=>{

    await fetch("http://localhost:5000/api/order_id", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': auth.token
            },
            body: JSON.stringify({id:order_id})
        }).then(async (res) => {
            let response = await res.json();
            // date=response.Date;

           setOrderData(response);
           setShow(!show);
           setId(order_id);

        })


  }
  const getOrders = async () => {
    try {
      const { data } =  await fetch("http://localhost:5000/api/order-data", {
        // credentials: 'include',
        // Origin:"http://localhost:3000/login",
        method: 'GET',
        headers: {
          'authorization': auth.token
        },
    }).then(async (res) => {
        let response = await res.json();

        await setOrders(response.orderData)


    });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

function calculateTotalPrice(items) {
  let totalPrice = 0;

  for (let i = 0; i < items.length; i++) {
    totalPrice += items[i].price;
  }

  return totalPrice;
}
function calculateTotalQuantity(items) {
  let totalPrice = 0;

  for (let i = 0; i < items.length; i++) {
    totalPrice += parseInt(items[i].qty);
  }

  return totalPrice;
}
let count=1;
  return (
    <div>
    <Toaster/>
    <Navbar/>
    <h1 className="text-center">All Orders</h1>
    <div className="border shadow">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              {/* <th scope="col">Order_id</th> */}
              <th scope ="col">order_id</th>
              <th scope="col">email</th>
              <th scope="col"> amount</th>
              <th scope="col">date</th>
              <th scope="col">Quantity</th>
              <th scope= "col">items</th>
            </tr>
          </thead>

       {orders.map((o)=>{
        return(
          <tbody>

<tr >

  <td>{count++}</td>
  <td>{o._id}</td>
  <td>{o.email}</td>
  <td>{calculateTotalPrice(o.order_data)}</td>
  <td>{o.Date}</td>
  <td>{calculateTotalQuantity(o.order_data)}</td>
  <td> <button className="btn btn-success justify-center ms-2" onClick={() => fetchOrder(o._id)}>{show===true&&o._id===Id?"Hide":"SHOW"}</button></td>
</tr>
{show===true&&o._id===Id?
<>

 {orderData.order_data.map((o)=>{
  return(
    <div className='row '>
  <div className='col-12 col-md-6 col-lg-3' >
  <div className="card mt-1 mb-1" style={{ width: "16rem", maxHeight: "360px" }}>
  <img src={o.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
      <div className="card-body text-black">
          <h5 className="card-title">{o.name}</h5>
          <div className='container w-100 p-0' style={{ height: "38px" }}>
              <span className='m-1'>{o.qty}</span>
              <span className='m-1'>{o.size}</span>
              <span className='m-1'>{date}</span>
              <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                  ₹{o.price}/-
              </div>
          </div>
      </div>
  </div>

</div>
</div>
  )
})}</>:""}

</tbody>
        )
       })}
     </table>

</div>

    </div>
  )
}
