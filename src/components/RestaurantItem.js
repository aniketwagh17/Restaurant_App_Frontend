import React,{useState,useEffect} from 'react'
import { Link, Navigate, useNavigate} from 'react-router-dom'
import swal from 'sweetalert'
import restaurantService from '../services/RestaurantService'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
//import background from "../img/restaurant.jpg";




const RestaurantItemList = () => {
    const { id }= useParams();
    
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [foodItems,setFoodItems] = useState([]);
    const [searchTitle,setSearchTitle] = useState('')

    useEffect(()=>{
        getAllItems();
    },[])


//
useEffect(()=>{
  if (id && id == "availiable"){
    restaurantService.availiableItems()
    .then(res => {
        setFoodItems(res.data)
    }).catch(e =>{
        console.log(e.message);
    })
}else{
    console.log(id);
    getFoodItemById();
  }
},[id])

  const getFoodItemById = () =>{
    console.log(foodItems) 
    restaurantService.get(id)
    .then((res) => {
      console.log(res.data)
      setFoodItems([res.data])
      
      console.log(foodItems)  
    })
        .catch(e =>{
          swal('Item id not found !!!', '', 'error');
          navigate('/menu')
            console.log(e);
        })
  }
  


//

    const getAllItems = () =>{
        restaurantService.getAll()
        .then((res) => {
            setFoodItems(res.data)
            console.log(foodItems);
        })
        .catch(e =>{
            console.log(e.message);
        })
    }

    const editFoodItem = (data)=>{
        navigate('/add',{state :data})
    }

    const deleteFoodItem = (id) =>{
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this item?",
            icon: "warning",
            dangerMode: true,
            buttons: ["Cancel", "Yes!"],
        }).then(function(value) {
            if (value) {
                restaurantService.remove(id)
            .then(() =>{
                swal("Deleted!", "Your Food Item has been removed!", "success");
                getAllItems();
            })
            .catch(err =>{
                console.log(err.response)
            })
            }
           
        });
    }

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
      };

      const findByTitle = () => {
          if(searchTitle){
          restaurantService.findByTitle(searchTitle)
          .then(response => {
            setFoodItems(response.data);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
        }
        if(searchTitle === ''){
            getAllItems();
        }
      };

      
    
    const addToCart = (id) => {
        if(localStorage.getItem('menu-cart') != undefined){
            let isAlreadyAdded = false
            let cartArray = JSON.parse(localStorage.getItem('menu-cart'))
            for(let p of cartArray){
                if(p.id == id){
                    isAlreadyAdded = true
                }
            }
            if(isAlreadyAdded){
                swal('Item Already Added !!!', '', 'error')
            }else{
                let obj = { id:id, quantity: 1}
                cartArray.push(obj)
                localStorage.setItem('menu-cart', JSON.stringify(cartArray))
                dispatch({type:'ADDTOCART',payload:cartArray})
                swal('Added to cart successfully !!', '', 'success')
            }

        }else{
            let cartArray = [];
            let obj = { id: id, quantity: 1}
            cartArray.push(obj)
            localStorage.setItem('menu-cart', JSON.stringify(cartArray))
            dispatch({type:'ADDTOCART',payload:cartArray})
            swal('Added to cart successfully !!', '', 'success')
        }
    }


    return (
        <div>
    


            <h3 className='text-center my-3 text-white'>Trending Items</h3>
            <Link to="/add">
                <button className='btn btn-primary my-3'>Add New Dish</button>
            </Link>
            <div className='row'>
                {
                    foodItems.map((val, index) => {
                        return <div className='col-md-4 mt-4' key={index}>
                                <div className="card">
                                    <img className="card-img-top" src={val.image} alt={val.title} 
                                        height="300px" />
                                    <div className="card-body">
                                        <h3 className="card-title text-primary">{val.title}</h3>
                                        <h5 className="card-text">{val.description}</h5>
                                        <p className="card-text">Price: Rs. {val.price} </p>
                                        <div className='btn-group'>
                                            <button className='btn btn-outline-primary'
                                              onClick={() => addToCart(val.id)} >Add to cart
                                            </button>
                                            <button className='btn btn-outline-success'
                                               onClick={()=> editFoodItem(val)}>Edit Product
                                            </button>
                                            <button className='btn btn-outline-danger'
                                               onClick={()=> deleteFoodItem(val.id)}>Delete Product
                                               
                                            </button>
                                            
                                            
                                        </div>
                                    </div>
                                
                                </div>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                            </div>
                    })
                }
                
            </div>
           
                
        </div>
    )
  
}

export default RestaurantItemList