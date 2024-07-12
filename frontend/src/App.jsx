import './App.css'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/pages/Home';
import Product from './components/pages/Product';
import Checkout from './components/pages/Checkout';
import NotFound from './components/pages/NotFound';

function App() {

  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route path='/product/:productid' element={<Product />}></Route>
            <Route path='/checkout' element={<Checkout />}></Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App