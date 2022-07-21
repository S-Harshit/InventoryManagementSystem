
import './App.css';
import Navbar from './components/navbar/navbar'
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from './components/auth/login';
import Register from './components/auth/register';
import Dashboard from './pages/dashboard';
import { useState } from 'react';


function App() {
  const [user, setUser] = useState()
  return (
    <>


      <BrowserRouter>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />}>
          </Route>
          <Route path="signup" element={<Register />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>

      </BrowserRouter>
    </>

  );
}

export default App;