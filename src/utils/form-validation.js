import { signInApi, signUpApi, displayErrorMsg } from "./api";

import { PhoneNumberUtil } from "google-libphonenumber";

export const signInValidation = (formFileds) => {
  const { email, password } = formFileds;

  if (email === "" || password === "" || password.length < 8) {
    if (password.length < 8) {
      displayErrorMsg("*Password minimum characters is 8");
    }
    return;
  }
  //api request
  signInApi(formFileds);
};

export const signUpValidation = (formFileds) => {
  const {
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    allowsPromotions,
  } = formFileds;

  const phoneUtil = PhoneNumberUtil.getInstance();
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

  //api request
  signUpApi(formFileds);
};
