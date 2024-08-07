import './App.css'

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Authentication from './components/pages/Authentication';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';

function App() {

  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" exact element={<Navigate to="/auth" replace />}></Route>
            <Route path='/auth' element={<Authentication />}></Route>
            <Route path='/home' element={<Home />}></Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
