import { Link } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import FormInput from "../../components/form-input/form-input.component";


const SignUpFormResponsive = ({
  formFileds,
  handleChange,
  handleDifferentInput,
}) => {
  const { email, password, firstName, lastName, city, phoneNumber, birthDate } =
    formFileds;
    
  return (
    <>
      <div className="header mobile">
        Please Enter
        <span className="required">Required*</span>
      </div>
      <div className="fields-container">
        <FormInput
          label="First Name"
          type="text"
          name="firstName"
          defaultValue={firstName}
          placeholder="Enter First Name"
          onChange={handleChange}
          autoComplete="on"
          required
        />
        <FormInput
          label="Last Name"
          type="text"
          name="lastName"
          defaultValue={lastName}
          placeholder="Enter Last Name"
          onChange={handleChange}
          autoComplete="on"
          required
        />
      </div>
      <label>Salutation</label>
      <div className="fields-container radio">
        <FormInput
          label="Mr"
          type="radio"
          name="Salutation"
          value="Mr"
          onChange={handleChange}
        />
        <FormInput
          label="Miss"
          type="radio"
          name="Salutation"
          value="Miss"
          onChange={handleChange}
        />
        <FormInput
          label="Mrs"
          type="radio"
          name="Salutation"
          value="Mrs"
          onChange={handleChange}
        />
      </div>
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
      <FormInput
        label="Birth Date"
        type="date"
        name="birthDate"
        defaultValue={birthDate}
        onChange={handleChange}
        autoComplete="on"
      />
      <div className="birthday-gift">
        Add your date of birth if you want receive FREE gifts in your birthday
      </div>
      <FormInput
        label="City"
        type="text"
        name="city"
        defaultValue={city}
        placeholder="Enter your city"
        onChange={handleChange}
        autoComplete="on"
      />
      <div className="label-container">
        <label>Country</label>
        <label>Mobile Number</label>
      </div>
      <PhoneInput
        defaultCountry="ca"
        name="phoneNumber"
        value={phoneNumber}
        placeholder="Mobile Number"
        forceDialCode
        disableCountryGuess
        onChange={(phone) => handleDifferentInput("phoneNumber", phone)}
      />

      <div className="field acceptTerms">
        <input
          type="checkbox"
          name="allowsPromotions"
          id="acceptTerms"
          onChange={(event) =>
            handleDifferentInput("allowsPromotions", event.target.checked)
          }
        />
        <label htmlFor="acceptTerms">
          I Accept Rescounts <Link>Terms & Conditions</Link> And{" "}
          <Link>Privacy Policy</Link>
        </label>
      </div>
      <input type="submit" value="Sign up" />
    </>
  );
};

export default SignUpFormResponsive;
