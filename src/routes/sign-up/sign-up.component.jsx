import { useState, useEffect } from "react";

import "react-international-phone/style.css";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignUpFormResponsive from "../../components/sign-up-form-responsive/sign-up-form-responsive.component";
import SocialHeader from "../../components/social-header/social-header.component";
import "./sign-up.styles.css";

import { signUpValidation } from "../../utils/form-validation";

const defaultFormFileds = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  city: "",
  phoneNumber: "",
  salutation: "",
  birthDate: "",
  allowsPromotions: false,
};

const SignUp = () => {
  const [isMobile, setIsMobile] = useState(window.screen.width < 480);
  const [formFileds, setFormFileds] = useState(defaultFormFileds);
 
  useEffect(() => {
    window.addEventListener("resize", ()=>{
      setIsMobile(window.screen.width < 480);
    });
  },[]);
  
  const handleChange = (event) => {
    const { name, value } = event.target;

    document.getElementById("display-error").style.display = "none";
    setFormFileds({ ...formFileds, [name]: value });
  };

  const handleDifferentInput = (name, value) => {

    document.getElementById("display-error").style.display = "none";
    setFormFileds({ ...formFileds, [name]: value });
  };

  const formSubmit = (event) => {
    event.preventDefault();
    
    //validation
    signUpValidation(formFileds);
  };
  return (
    <div id="sign-up">
      <div id="display-error"></div>
      <div className="form-container">
        <SocialHeader
          headerText="Create Account"
          className="header desktop"
          loginLink
        />
        <form onSubmit={formSubmit}>
          {!isMobile && (
            <SignUpForm
              formFileds={formFileds}
              handleChange={handleChange}
              handleDifferentInput={handleDifferentInput}
            />
          )}
          {isMobile && (
            <SignUpFormResponsive
              formFileds={formFileds}
              handleChange={handleChange}
              handleDifferentInput={handleDifferentInput}
            />
          )}
        </form>
      </div>
      <div className="img-container"></div>
    </div>
  );
};

export default SignUp;
