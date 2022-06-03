const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
//adds
const uploadController = require("../controllers/upload.controller");
//multer does not work on heroku
const multer = require("multer");
const upload = multer();

//Authorization to register
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

//get users and user info from db
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);

//update user info
router.put("/:id", userController.updateUser);

//delete user info - not implemented in front-end yet
router.delete("/:id", userController.deleteUser);

//follow and unfollow other users
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

//upload a picture - this does not work on heroku because it lacks file storage
router.post("/upload", upload.single("file"), uploadController.uploadProfile);

module.exports = router;
