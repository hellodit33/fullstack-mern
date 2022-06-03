const router = require("express").Router();
const hintController = require("../controllers/hint.controller");

/**
 * see all film hints
 */
router.get("/", hintController.readPost);

//to do for later: liking, unliking hints, commenting, editing and deleting comments, but also saving hints in a watchlist
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
