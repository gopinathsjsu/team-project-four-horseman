import React, { useState } from "react";
import useForm from "./useForm";
import { post } from "../../utils/Api";

const SignInForm = () => {
  const [values, handleChange] = useForm({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [error, setError] = useState("");

  const checkLoginDetails = async (e) => {
    e.preventDefault();
    const response = await post({ endpoint: "user/login", body: values });
    if (response.status == 200 || response.status == 201) {
      // TODO: Write code for successful login redirection
      window.location.pathname = "/";
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
          name="phone"
          className="signin-textbox"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="000-000-0000"
          required
        ></input>

        <h3>Enter your address</h3>
        <small>Street</small>
        <br />
        <br />
        <input type="text" className="signin-textbox" required></input>
        <br />

        <br />

        <small>City</small>
        <br />
        <br />

        <input type="text" className="signin-textbox" required></input>
        <br />

        <small> State</small>
        <br />
        <br />

        <input type="text" className="signin-textbox" required></input>
        <br />

        <small>Country</small>
        <br />
        <br />

        <input type="text" className="signin-textbox" required></input>
        <br />

        <small>ZipCode</small>
        <br />
        <br />

        <input
          type="tel"
          className="signin-textbox"
          maxLength="5"
          minLength="4"
          required
        ></input>

        <h3>Enter your date of birth</h3>
        <select name="selectList" className="selectList" required>
            <option value="January">January</option> {" "}
          <option value="February">February</option>
          <option value="March">March</option> {" "}
          <option value="April">April</option>
          <option value="May">May</option>  <option value="June">June</option>
          <option value="July">July</option> {" "}
          <option value="August">August</option>
          <option value="September">September</option> {" "}
          <option value="October">October</option>
          <option value="November">November </option> {" "}
          <option value="December">December </option>
        </select>

        <input
          type="number"
          name="birth-day"
          className="dob"
          min="1"
          max="31"
          placeholder="Day"
          required
        ></input>

        <input
          type="number"
          name="birth-year"
          className="dob"
          maxLength="4"
          min="1950"
          max="2006"
          placeholder="Year"
          required
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
        ></input>
        <br />
        <br />
        <input type="checkbox" id="miles" name="miles"></input>
        <label htmlFor="miles">Subscribe to MileagePlus® account</label>
        <br />
        <input type="submit" className="signin-submit-button"></input>

        <button onClick="" className="signin-cancel-button">
          Cancel changes
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
