
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import NavBar from './components/NavBar';
import ProductList from './components/ProductList';
import { addProduct, getAllProducts } from './redux/actions/productsActions';
import {Routes,Route,Link} from "react-router-dom"
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';

function App() {
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(getAllProducts())
  }, [])
  
  return (
    <Routes>
    <Route path="/" element={<div><NavBar/><Link to="/addProduct" ><button>ADD PRODUCT</button></Link> <ProductList/> </div>}/>
    <Route path="/addProduct" element={<AddProduct/>}/>
    <Route path="/edit/:id" element={<EditProduct/>}/>
    </Routes>
  );
}

export default App;
