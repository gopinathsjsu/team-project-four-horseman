import React from "react";
import useForm from "./useForm";

const LoginForm = () => {
  const [values, handleChange] = useForm({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

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
        <input type="submit" className="signin-submit-button"></input>

      </form>
    </div>
  );
};

export default LoginForm;
