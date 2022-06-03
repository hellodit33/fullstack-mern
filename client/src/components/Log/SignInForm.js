import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
  //States for the sign in form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   *
   * @param {string} e
   * @desc function to handle the sign in process and send errors
   */
  const handleLogin = (e) => {
    e.preventDefault();
    //send errors
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    //login the user with POST user/login
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: { email, password },
    })
      .then((res) => {
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="email"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="email error"></div>

      <br />
      <label htmlFor="password">Password</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br />
      <input type="submit" value="Sign in" />
    </form>
  );
};

export default SignInForm;
