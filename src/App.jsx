
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from './cartPage/cart';   
import Menu from './menuPage/menu';
import styles from './App.module.scss';
import OrderConfirmation from './orderPage/OrderConfirmation';
import Kvitot from './kvitotPage/kvitot';
import StartPage from './entryPage/start';




function App() {
 
  return (<div className={styles.App}> 
    <Router>

    <Routes>
    <Route path="/" element={<StartPage />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/menu" element={<Menu />} />
    <Route path="/order" element={<OrderConfirmation />} />
    <Route path="/receipt" element={<Kvitot/>} />
    </Routes>
  </Router>
  
  </div>)
  
}

export default App
