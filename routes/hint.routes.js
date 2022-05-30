const router = require("express").Router();
const hintController = require("../controllers/hint.controller");

router.get("/", hintController.readPost);
/*
router.patch("/like-post/:id", hintController.likePost);
router.patch("/:id", hintController.unlikePost);

// comments
router.patch("/hints/comment-post/:id", hintController.commentPost);
router.patch("/hints/edit-post-comment/:id", hintController.editPostComment);
router.patch(
  "/hints/delete-post-comment/:id",
  hintController.deletePostComment
);*/

module.exports = router;
