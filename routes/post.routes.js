const router = require("express").Router();
const postController = require("../controllers/post.controller");
//multer does not work on heroku
const multer = require("multer");
const upload = multer();

//read all posts
router.get("/", postController.readPost);
//post a personal hint
//multer does not work on heroku
router.post("/", upload.single("file"), postController.createPost);
//update one own's post
router.put("/:id", postController.updatePost);
//delete one own's post
router.delete("/:id", postController.deletePost);
//like and unlike a post - these functions are still in work in progress
router.patch("/like-post/:id", postController.likePost);
router.patch("/unlike-post/:id", postController.unlikePost);

//comment a post
router.patch("/comment-post/:id", postController.commentPost);
//edit a comment
router.patch("/edit-post-comment/:id", postController.editPostComment);
//delete a comment
router.patch("/delete-post-comment/:id", postController.deletePostComment);

module.exports = router;
