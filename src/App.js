import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";
import AddRestaurantItem from './components/AddRestaurantItem';
import RestaurantItem from './components/RestaurantItem';
import RestaurantItemList from './components/RestaurantItemList';
import background from "./img/background.jpg";
import { useSelector } from 'react-redux'

const divStyle = {
  //width: '100%',
  margin:0,
  maxHeight: '100%',
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover',   
  backgroundPosition: 'center center'
};




function App() {
  const cartValue = useSelector(state => state.cart.length)
    
  return (
  

  <div style={divStyle}>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
  <a className="navbar-brand" href="/menu">Foodies</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
  <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/menu"} className="nav-link">
              Menu
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
          <li className="nav-item">
              <Link to={"/menu"} className="nav-link">
                   Items <span className='badge bg-success'>{cartValue}</span>
              </Link>
          </li>
        </div>
  </div>
</nav>

<main className="container mt-3">
      <Routes>
          <Route path="/" element={<RestaurantItemList />} />  
          <Route path="/menu" element={<RestaurantItemList />} />  
          <Route path="/add" element={<AddRestaurantItem />} />
          <Route path="/menu/:id" element={<RestaurantItem />} />   
               
      </Routes>
      </main>
</div>
  );
}

export default App;
