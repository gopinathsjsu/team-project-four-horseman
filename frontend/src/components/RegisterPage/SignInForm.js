import React, { useState } from "react";
import useForm from "./useForm";
import { post } from "../../utils/Api";
import { useHistory } from "react-router";

const SignInForm = () => {
  const [values, handleChange] = useForm({
    firstName: "",
    lastName: "",
    phoneNumber: 0,
    email: "",
    password: "",
    address: "",
    city: "",
    zip: 0,
    state: "",
    country: "",
    role: "user",
  });

  const history = useHistory();
  const [error, setError] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    const response = await post({ endpoint: "user/register", body: values });
    if (response.status == 200 || response.status == 201) {
      // TODO: Write code for successful login redirection
      localStorage.setItem("user", JSON.stringify(response.data.user));
      console.log(response);
      history.replace("/");
    } else {
      console.log(response);
      setError(response.meesage.data.errors.message);
    }
  };
  return (
    <div className="signin">
      <form action="2.js" method="get">
        <h1>Personal Information</h1>
        <p>
          Your name, date of birth and gender should match the government-issued
          ID that you show at the airport.
        </p>
        <h3>First Name</h3>
        <input
          type="text"
          className="signin-textbox"
          maxLength="15"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          required
        ></input>

        <h3>Last Name</h3>
        <input
          type="text"
          maxLength="15"
          className="signin-textbox"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          required
        ></input>

        <h3>Enter email</h3>
        <input
          type="email"
          name="email"
          className="signin-textbox"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
          value={values.email}
          onChange={handleChange}
          required
        ></input>

        <h3>Enter your phone number</h3>

        <input
          type="tel"
          id="phone"
          name="phoneNumber"
          className="signin-textbox"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="000-000-0000"
          required
          value={values.phoneNumber}
          onChange={handleChange}
        ></input>

        <h3>Enter your address</h3>
        <small>Street</small>
        <br />
        <br />
        <input
          name="address"
          type="text"
          className="signin-textbox"
          required
          value={values.address}
          onChange={handleChange}
        ></input>
        <br />

        <br />

        <small>City</small>
        <br />
        <br />

        <input
          name="city"
          type="text"
          className="signin-textbox"
          required
          value={values.city}
          onChange={handleChange}
        ></input>
        <br />

        <small> State</small>
        <br />
        <br />

        <input
          name="state"
          type="text"
          className="signin-textbox"
          required
          value={values.state}
          onChange={handleChange}
        ></input>
        <br />

        <small>Country</small>
        <br />
        <br />

        <input
          type="text"
          name="country"
          className="signin-textbox"
          required
          value={values.country}
          onChange={handleChange}
        ></input>
        <br />

        <small>ZipCode</small>
        <br />
        <br />

        <input
          type="tel"
          className="signin-textbox"
          name="zip"
          maxLength="5"
          minLength="4"
          required
          value={values.zip}
          onChange={handleChange}
        ></input>

        <h3>Enter your password</h3>
        <input
          type="password"
          required
          name="password"
          className="signin-textbox"
          minLength="8"
          value={values.password}
          onChange={handleChange}
          value={values.password}
          onChange={handleChange}
        ></input>
        <br />
        <br />
        <input type="checkbox" id="miles" name="miles"></input>
        <label htmlFor="miles">Subscribe to MileagePlus® account</label>
        <br />
        <input
          type="submit"
          className="signin-submit-button"
          onClick={registerUser}
        ></input>

        <button className="signin-cancel-button">Cancel changes</button>
      </form>
    </div>
  );
};

export default SignInForm;
