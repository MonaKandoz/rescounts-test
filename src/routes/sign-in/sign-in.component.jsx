import { Link } from "react-router-dom";
import { useState } from "react";

import FormInput from "../../components/form-input/form-input.component";
import SocialHeader from "../../components/social-header/social-header.component";
import "./sign-in.styles.css";

import { signInValidation } from "../../utils/form-validation";

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

  const formSubmit = (event)=>{
    event.preventDefault();

    //validation
    signInValidation(formFileds);
    
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
