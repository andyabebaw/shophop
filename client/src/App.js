import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Detail from './pages/Detail';
import EditProduct from './pages/EditProduct';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import Nav from './components/Nav';


function App() {
  return (<>  
  <Nav />
      <Router>
    <div>
      
        <Routes>
          <Route 
            path="/" 
            element={<Home />} 
          />
          <Route 
            path="/login" 
            element={<Login />} 
          />
          <Route 
            path="/EditProduct" 
            element={<EditProduct />} 
          />
          <Route 
            path="/products/:id" 
            element={<Detail />} 
          />
          <Route 
            path="*" 
            element={<NoMatch />} 
          />
        </Routes>
    </div>
  </Router>

  </>);
}

export default App;
