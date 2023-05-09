import './App.scss';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage'
import ProductPage from './pages/ProductPage/ProductPage'
import CartPage from './pages/CartPage/CartPage';
import Laptops from './pages/Category/Laptops/Laptops';
import Smartphones from './pages/Category/Smartphones/Smartphones';
import AllProducts from './pages/Category/AllProducts/AllProducts'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/product/:id' element={<ProductPage/>}/>
            <Route path='/cart' element={<CartPage/>}/>
            <Route path='/category/laptops' element={<Laptops/>}/>
            <Route path='/category/smartphones' element={<Smartphones/>}/>
            <Route path='/category/allproducts' element={<AllProducts/>}/>
            <Route />
          </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
