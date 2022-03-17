
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import NavBar from './components/NavBar';
import ProductList from './components/ProductList';
import { addProduct, getAllProducts } from './redux/actions/productsActions';
import {Routes,Route,Link} from "react-router-dom"
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import SignIn from './components/Signin';
import Signup from './components/Signup';
import { getUser } from './redux/actions/userActions';
import PrivateRoute from './components/privateRoutes/PrivateRoute';

function App() {
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getUser())
  }, [])
  
  return (
    <div>
    <Routes>
    <Route path="/" element={<div><NavBar/><Link to="/addProduct" >{localStorage.getItem("token")?<button>ADD PRODUCT</button>:null}</Link> <ProductList/> </div>}/>
    <Route path="/addProduct" element={<PrivateRoute><AddProduct/></PrivateRoute>}/>
    <Route path="/edit/:id" element={<EditProduct/>}/>
    <Route path="/signin" element={ <SignIn/>}/>
    <Route path="/signup" element={<Signup />}/>

    </Routes>
    </div>
  );
}

export default App;
