import React,{useRef,useEffect,useState} from 'react'
import { useDispatchCart, useCart } from './ContextReducer'
import {useNavigate} from  'react-router-dom';

export default function Card(props) {
  let navigate= useNavigate();
    let options = props.options;

    let priceOptions = options;

    const [qty, setQty] = useState(1)
    const [size, setSize] = useState(1)

    let data= useCart()
    const priceRef = useRef();
    const dispatch = useDispatchCart();

    let finalPrice = qty*parseInt(options[size].price);
    const handleAddToCart = async () => {
      if(!localStorage.getItem("authToken")){
        navigate("/login");
      }

      let food = []
      for (const item of data) {
        if (item.id === props.foodItem._id) {
          food = [...food,item.size]
        }
      }


      if (food !== []) {

        for(const item of food){
        if (item === options[size].name) {
          await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice,size:options[size].name, qty: qty })
          return
        }
      }

          await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice,size:options[size].name,qty: qty,img: props.ImgSrc,Oriznal_Price:options[size].price,img:props.foodItem.img})
          
          return
      }

      await dispatch({ type: "ADD", id: props.foodItem._id, Oriznal_Price:options[size], name: props.foodItem.name, price: finalPrice, qty: qty, size: options[size].name,img:props.foodItem.img })




    }
    useEffect(()=>{

      setSize(priceRef.current.value);
    },[])
  return (
    <div>
      <div><div className="card mt-3  " style={{"width": "16rem","maxHeight":"360px"}}>
      <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "150px", objectFit: "fill" }} />
  <div className="card-body">
    <h5 className="card-title">{props.foodItem.name}</h5>

    <div className='container w-100'>
        <select className='m-2 h-100 bg-success rounded' onChange={(e)=>setQty(e.target.value)}>
            {Array.from(Array(6),(e,i)=>{
                return(
                    <option key={i+1} value={i+1}>{i+1} </option>
                )
            })}
        </select>
        <select className='m-2 h-100 bg-success rounded'ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
             {priceOptions.map((option,idx) => {
                return <option key={option.name} value={idx}>{option.name}</option>
              })}
        </select>
        <div className='d-inline h-100 fs-5'>₹{finalPrice}/-</div>
    </div>
    <hr></hr>
    <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>Add to Cart</button>
  </div>
</div></div>
    </div>
  )
}
