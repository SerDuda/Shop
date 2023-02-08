import React from 'react';
import './App.scss';

import { Routes, Route } from 'react-router-dom'

import Allproducts from './Pages/Allproducts';
import Laptops from './Pages/Laptops';
import Main from './Pages/Main';
import Smartphones from './Pages/Smartphones';
import ChoseProduct from './components/ChoseProduct';




function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/allproducts' element={<Allproducts/>}/>
        <Route path='/smartphones' element={<Smartphones/>}/>
        <Route path='/laptops' element={<Laptops/>}/>
        <Route path='/productpage/:id' element={<ChoseProduct/>}/>
      </Routes>
    </>
  );
}

export default App;
