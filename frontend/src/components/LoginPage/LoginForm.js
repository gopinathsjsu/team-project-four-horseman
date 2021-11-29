import React, { useState } from "react";
import { post } from "../../utils/Api";
import useForm from "./useForm";
import { Redirect } from "react-router-dom";

const LoginForm = () => {
  const [values, handleChange] = useForm({
    email: "",
    password: "",
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
    <div className="login">
      <form action="2.js" method="get">
        <h1>Login</h1>

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
        <input
          onClick={(e) => checkLoginDetails(e)}
          type="submit"
          className="signin-submit-button"
        ></input>
      </form>
      {error !== "" && <p className="#error">{error}</p>}
    </div>
  );
};

export default LoginForm;
