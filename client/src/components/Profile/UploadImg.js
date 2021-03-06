import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const UploadImg = () => {
  //file state for the upload file - does not work on heroku
  const [file, setFile] = useState();

  //importing dispatch for the redux store
  const dispatch = useDispatch();

  //redux gets the user data state
  const userData = useSelector((state) => state.userReducer);

  /**
   *
   * @desc handlePicture dispatches the user profile picture into the database through multer - this does not work on Heroku so it is commented out
   */
  const handlePicture = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", userData.pseudo);
    data.append("userId", userData._id);
    data.append("file", file);

    await dispatch(uploadPicture(data, userData._id));
    /*window.location.href = "/profile";*/
  };
  return (
    <form action="" /*onSubmit={handlePicture} */ className="upload-pic">
      <label htmlFor="file" className="file-label">
        pick a new picture
      </label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      ></input>
      <br />
      <input type="submit" value="upload" />
    </form>
  );
};

export default UploadImg;
