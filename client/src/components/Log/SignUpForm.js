import axios from "axios";
import { useState } from "react";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  //states for the sign up form
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  /**
   *
   * @param {string} e
   * @desc function to sign up and to handle errors while signing up
   */
  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );
    const termsError = document.querySelector(".terms.error");
    pseudoError.innerHTML = "";
    passwordError.innerHTML = "";
    passwordConfirmError.innerHTML = "";
    termsError.innerHTML = "";
    //error messages
    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML =
          "The passwords are not matching each others";
      if (!terms.checked) termsError.innerHTML = "Please accept the terms.";
    } else {
      //sign up the user with POST /user/register route
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          pseudo,
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            pseudoError.innerHTML = res.data.errors.pseudo;
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            //Submitting the form and signing up
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className="success">
            Welcome! You are now a Hint member, and you can now sign in.
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="pseudo">Username</label>
          <br />
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
          />
          <div
            className="pseudo 
    error"
          >
            {" "}
          </div>

          <br />

          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div
            className="email 
    error"
          >
            {" "}
          </div>

          <br />

          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className="password 
    error"
          >
            {" "}
          </div>

          <br />

          <label htmlFor="password-conf">Confirm your password</label>
          <br />
          <input
            type="password"
            name="password"
            id="password-conf"
            onChange={(e) => setControlPassword(e.target.value)}
          />
          <div
            className="password-confirm 
    error"
          >
            {" "}
          </div>
          <br />
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            I confirm that I accept{" "}
            <a href="/" target="_blank" rel="noopener noreferrer">
              Hint's terms.
            </a>
          </label>

          <div className="terms error"></div>
          <br />
          <input type="submit" value="Sign up" />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
