import '../index.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import User from '../../../model/user';
import jwt_decode from "jwt-decode";

const Login = ({ setUser }) => {



  let email = "";
  let password = ""
  let navigate = useNavigate();



  function takeInput(e) {
    switch (e.target.name) {
      case "Email": {
        email = e.target.value
        break;
      }
      case "Password": {
        password = e.target.value;
        break;
      }
    }
  }

  async function signIn(e) {
    e.preventDefault();

    const response = await fetch('https://inventory-management-system-in.herokuapp.com/login/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    });

    const data = await response.json();
    localStorage.setItem('token', data.user)
    const token = localStorage.getItem('token')
    //setting user 
    const user = jwt_decode(token)
    setUser(user);

    if (!user) {
      localStorage.removeItem('token')
      navigate('/login');
    }
    else {
      navigate('/dashboard');
    }

  }

  return (
    <div className="container--auth">
      <h2>Sign In</h2>
      <form onSubmit={signIn}>
        <input type="email" name="Email" placeholder='email' required onChange={takeInput} />
        <input type="password" name="Password" placeholder='password' required onChange={takeInput} />
        <button type="submit">Login</button>
      </form>
      <Link to={"signup"}><p>Don't Have a Account?</p></Link>
    </div>
  )
}

export default Login;