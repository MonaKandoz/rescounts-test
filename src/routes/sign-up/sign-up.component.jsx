import { useState, useEffect } from "react";

import { PhoneNumberUtil } from "google-libphonenumber";
import "react-international-phone/style.css";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignUpFormResponsive from "../../components/sign-up-form-responsive/sign-up-form-responsive.component";
import SocialHeader from "../../components/social-header/social-header.component";
import "./sign-up.styles.css";

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

const phoneUtil = PhoneNumberUtil.getInstance();

const SignUp = () => {
  const [isMobile, setIsMobile] = useState(window.screen.width < 480);
  const [formFileds, setFormFileds] = useState(defaultFormFileds);
  const {
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    allowsPromotions,
  } = formFileds;
 
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
    setFormFileds({ ...formFileds, [name]: value });
  };

  const displayErrorMsg = (msg) => {
    let displayError = document.getElementById("display-error");
    displayError.style.display = "block";
    displayError.innerHTML = `${msg}`;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };
  const isPhoneValid = (phone) => {
    try {
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
      return displayErrorMsg(`${error.msg}`);
    }
  };
  const containsNumber = (str) => {
    return /\d/.test(str);
  };
  const formSubmit = (event) => {
    event.preventDefault();
    //validation
    if (
      email === "" ||
      password === "" ||
      firstName === "" ||
      password.length < 8
    ) {
      if (password.length < 8) {
        displayErrorMsg("*Password minimum characters is 8");
      }
      return;
    }

    if (containsNumber(firstName) || containsNumber(lastName)) {
      displayErrorMsg("*Name should be letters only");
      return;
    }

    if (!isPhoneValid(phoneNumber)) {
      displayErrorMsg("*Phone Number not valid");
      return;
    }

    if (!allowsPromotions) {
      displayErrorMsg("*please accept terms");
      return;
    }

    fetch("https://api-dev.rescounts.com/api/v1/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formFileds,
        allowsSMS: true,
        notification:
          "cRgQJvGam-u0UE2iV4vgCI:APA91bH5Qlt7jzbrySQwITgs6PFypMY3hE3dR9ZgMf5ZDJYhIYCfB8d36PqrFrZAq8ygX-qHzKk0F3vwpd9DzzJx39auJzf83krHIxao2DXSV9hlfETIl4eAuNqLk9VfHLA6142-KoDF",
      }),
    })
      .then((res) => {
        if (res.status === 409) {
          displayErrorMsg(
            "rescounts account exists using this email please go to login page"
          );
          return;
        } else if (res.status === 201) {
          return res.clone().json();
        } else {
          console.log(res.json());
          return;
        }
      })
      .then((json) => {
        alert(`Thank you for sign-up ${json.user.lastName} `);
      })
      .catch((error) => console.error(error));
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
