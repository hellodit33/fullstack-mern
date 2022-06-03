import axios from "axios";
import cookie from "js-cookie";

const Logout = () => {
  //function to remove cookie when logging out
  const removeCookie = (key) => {
    if (window !== undefined) {
      cookie.remove(key, { expires: 1 });
    }
  };

  //function to GET/remove the cookie from the user when logging out
  const logout = async () => {
    await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));
    window.location = "/";
  };
  return (
    <div>
      <li onClick={logout}>
        <i className="fa-solid fa-right-from-bracket login"></i>
      </li>
    </div>
  );
};

export default Logout;
