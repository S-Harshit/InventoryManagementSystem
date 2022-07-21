import { Link, useNavigate } from 'react-router-dom'
import User from '../../../model/user';

const Register = () => {

  let name = "";
  let password = ""
  let confirmPassword = ""
  let email = ""
  const user = new User(name, email, password, confirmPassword);
  const navigate = useNavigate();

  function signUp(e) {
    e.preventDefault();
    const response = fetch("http://localhost:8080/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    response.then((data) => data.json().then(data => {
      console.log(data);
      navigate("/");
    }))

  }

  function takeInput(e) {

    switch (e.target.name) {
      case "Name": {
        user.name = e.target.value;
        break;
      }
      case "Email": {
        user.email = e.target.value;

        break;
      }
      case "Password": {
        user.password = e.target.value;
        break;
      }
      case "ConfirmPassword": {
        user.confirmPass = e.target.value;
        break;
      }
    }
  }

  return (
    <div className="container--auth">
      <h2>Sign Up</h2>
      <form onSubmit={signUp} onChange={(e) => { takeInput(e); }}>
        <input type="text" name="Name" placeholder="name" required />
        <input type="email" name="Email" placeholder="email" required />
        <input type="password" name="Password" placeholder="password" required />
        <input type="password" name="ConfirmPassword" placeholder="confirm password" required />
        <button type="submit" onClick={(e) => {
          takeInput(e);
          signUp(e);
        }}>Sign Up</button>
      </form>
      <Link to="/"><p>Already Have an Account</p></Link>
    </div>
  )
}

export default Register;