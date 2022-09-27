import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate }  from 'react-router-dom'
import swal from 'sweetalert';
import restaurantService from '../services/RestaurantService';
//import background from "../img/background.jpg";


const AddRestaurantItem = () => {
  const location = useLocation()
  const navigate = useNavigate()
 // alert(JSON.stringify(location));
 const [foodItemData, setFoodItemData] = useState({
  title : '',
  description : '',
  image : '',
  price : '',
  availability : '',
  id : ''
})
const [action, setAction] = useState('Add Item');

const {title,description,image,price,availability,id} = foodItemData;

useEffect(() => {
  const { state } = location    
  if(state != undefined){
      setAction('Update Item')
      setFoodItemData({
          ...foodItemData,
          title : state.title,
          description : state.description,
          image : state.image,
          price : state.price,
          availability : state.availability,
          id : state.id
      })
  }
}, [])

const onChangeHandler = (keyname) => event =>{
  setFoodItemData({...foodItemData,[keyname]: event.target.value})
}

const saveFoodItemData = (event) => {
  event.preventDefault()
  if(title === '' || price === '', description === '' || image === '' || availability === ''){
      alert('Please fill all the data')
      return
  }
  if(action == 'Add Item'){
      restaurantService.create(foodItemData)
      .then((res) => {
          console.log(res)
          swal('Item Added Successfully !!!', '', 'success')
          setFoodItemData({
              title: '', price: '', description: '', image: '',availability: ''
          })
      })
  }else{
      restaurantService.update(id,foodItemData)
      .then((res) => {
          console.log(res);
          swal('Item Updated Successfully !!!', '', 'success')
          navigate('/menu')
      })
  }

}


  return (
    <div>
      <h3 className='text-center my-3 text-white'>{action}</h3>
            <form onSubmit={saveFoodItemData}>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label text-info "><h5><b>Name</b></h5></label>
                    <input type="text" className="form-control border border-4 border border-success " placeholder="Please Enter Dish Name" 
                        onChange={onChangeHandler('title')} value={title}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label text-info"><h5><b>Description</b></h5></label>
                    <input type="text" className="form-control border border-4 border border-success" placeholder="Please Describe Item Offer" 
                        onChange={onChangeHandler('description')} value={description}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label text-info"><h5><b>Image URL</b></h5></label>
                    <input type="text" className="form-control border border-4 border border-success" placeholder="Please Enter Image path" 
                        onChange={onChangeHandler('image')} value={image}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label text-info"><h5><b>Price</b></h5></label>
                    <input type="text" className="form-control border border-4 border border-success" placeholder="Please Enter price" 
                        onChange={onChangeHandler('price')} value={price}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label text-info "><h5><b>Availability</b></h5></label>
                    <input type="text" className="form-control border border-4 border border-success" placeholder="Please Mention Availability" 
                        onChange={onChangeHandler('availability')} value={availability}/>
                </div>
                
                <br/>
                <button className='btn btn-success mb-3' type='submit'>{action}</button>
                <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>   <br/>     
            </form>
    </div>
  )
}

export default AddRestaurantItem