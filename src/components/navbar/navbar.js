import './index.css'
import { Link } from "react-router-dom"
import { useEffect } from 'react';

const Navbar = ({ user, setUser }) => {
  console.log(user);
  useEffect(() => {
    setUser(localStorage.getItem('token'));
  }, [])

  if (user) {
    return (
      <>
        <nav className="navbar">
          <div className='title'>
            <h1>Inventory Management System</h1>
            <p>Welcome {user.name}!</p>
          </div>
          <button onClick={() => {
            setUser("");
            localStorage.removeItem('token');
          }}>Logout</button>


        </nav>
        <hr />
      </>)
  }
  else {
    return (
      <>
        <nav className="navbar">
          <h1>Inventory Management System</h1>
          <div>
            <Link to={"signup"}><button name="signup">Sign Up</button></Link>
            <Link to={"/"}><button name="login" >Login</button></Link>
          </div>

        </nav>

        <hr />
      </>

    )



  }


}

export default Navbar;