import { Link } from "react-router-dom";
import { useState } from "react";

import FormInput from "../../components/form-input/form-input.component";
import SocialHeader from "../../components/social-header/social-header.component";
import "./sign-in.styles.css";

const defaultFormFileds ={
  email:'',
  password:''
};
const SignIn = () => {
  const [formFileds, setFormFileds] = useState(defaultFormFileds);
  const {email, password} = formFileds;
 
  const handleChange = (event)=>{
    const {name, value} = event.target;

    document.getElementById("display-error").style.display = "none";

    setFormFileds({...formFileds, [name]: value})
  }
  const displayErrorMsg = (msg) => {
    let displayError = document.getElementById("display-error");
    displayError.style.display = "block";
    displayError.innerHTML = `${msg}`;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };
  const formSubmit = (event)=>{
    event.preventDefault();

    //validation
    if (
      formFileds.email === "" ||
      formFileds.password === "" ||
      formFileds.password.length < 8
    ) {
      if (formFileds.password.length < 8) {
        displayErrorMsg("*Password minimum characters is 8");
      }
      return;
    }

    fetch("https://api-dev.rescounts.com/api/v1/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formFileds,
        notification:
          "cRgQJvGam-u0UE2iV4vgCI:APA91bH5Qlt7jzbrySQwITgs6PFypMY3hE3dR9ZgMf5ZDJYhIYCfB8d36PqrFrZAq8ygX-qHzKk0F3vwpd9DzzJx39auJzf83krHIxao2DXSV9hlfETIl4eAuNqLk9VfHLA6142-KoDF",
      }),
    })
      .then(res => {
        if (res.status === 401) {
          displayErrorMsg("*invalid email or password");
        } else if (res.status === 200) {
          return res.clone().json();
        } else {
          console.log(res.json());
        }
      })
      .then(json => {
        alert(`Welcome back ${json.user.lastName}`);
      })
      .catch(error => console.error(error));
  }

  return (
    <div id="sign-in">
      <div id="display-error"></div>
      <div className="form-container">
        <SocialHeader headerText="Welcome Back" className="header" />
        <form onSubmit={formSubmit}>
          <FormInput
            label="E-mail"
            type="email"
            name="email"
            id="email"
            defaultValue={email}
            placeholder="mail@website.com"
            onChange={handleChange}
            autoComplete="on"
            required
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            defaultValue={password}
            placeholder="min 8 character"
            onChange={handleChange}
            autoComplete="on"
            required
          />
          <div className="fields-container">
            <div className="field remember">
              <input type="checkbox" value="lsRememberMe" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <Link href="#" className="forget-pass">
              Forget Password
            </Link>
          </div>
          <input type="submit" value="Login" />
          <input
            type="button"
            className="guest-btn"
            value="Continue as a guest"
          />
        </form>
        <div className="not-registered">
          Not registered yet? <Link to="/sign-up">Create an account</Link>
        </div>
      </div>
      <div className="img-container"></div>
    </div>
  );
};

export default SignIn;
