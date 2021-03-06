import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const Log = (props) => {
  //states for the signup and signinmodals
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);

  /**
   *
   * @param {string} e
   * @desc handleModals shows either the register form or the login form, depending on where the user clicks (id on li elements)
   */
  const handleModals = (e) => {
    if (e.target.id === "register") {
      e.preventDefault();

      setSignInModal(false);
      setSignUpModal(true);
    }
    if (e.target.id === "login") {
      e.preventDefault();

      setSignUpModal(false);
      setSignInModal(true);
    }
  };
  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModals}
            id="register"
            className={signUpModal ? "active-btn" : null}
          >
            Don't have an account yet?
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={signInModal ? "active-btn" : null}
          >
            Sign in to stop scrolling
          </li>
        </ul>
        {signUpModal && <SignUpForm />}
        {signInModal && <SignInForm />}
      </div>
    </div>
  );
};

export default Log;
