import React,{useState,useEffect} from 'react'

import Card from  '../components/Card';

import Loader from '../components/Loader'

export default function Items() {
    const [search,setSearch]= useState('');
    const [foodCat,setFoodCat]=useState([]);
    const [foodItems,setFoodItem]=useState([]);

    const loadData= async()=>{
    const response= await fetch("https://sst-food-backend-ykr3.onrender.com/api/foodData",{
            // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
        });

        const json = await response.json()

        setFoodCat(json[1]);
        setFoodItem(json[0]);

    }
    useEffect(()=>{
        loadData();
    },[])
    if (foodItems?.length===0) return <Loader />;

  return (
    <div>

    <div>    <div>

<div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

    <div className="carousel-inner " id='carousel'>
        <div class=" carousel-caption  " style={{ zIndex: "9" }}>
            <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Type in..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }}
                />
                {/* <button className="btn text-white bg-success" type="submit">Search</button> */}
            </div>
        </div>
        <div className="carousel-item active" >
            <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
        </div>
        <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900x700/?ice-cream" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
        </div>
        <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
        </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
    </button>
</div>


</div></div>
    <div className='container'>
    {
          foodCat !== []
            ? foodCat.map((data) => {
              return (
                // justify-content-center
                <div className='row mb-3'>
                  <div key={data.id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr />
               {
                  foodItems !== [] ? foodItems.filter(
                    (items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
                    .map(filterItems => {
                      return (
                        <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                          {/* {console.log(filterItems.url)} */}
                          <Card foodItem={filterItems}
                          options={filterItems.options}
                          ></Card>
                        </div>
                      )
                    }) : <div> No Such Data </div>}
                </div>
              )
            })
            : ""}
        </div>

    </div>
  )
}
