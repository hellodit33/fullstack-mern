import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment, editComment } from "../../actions/post.actions";
import { UidContext } from "../AppContext";

const EditDelete = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(editComment(postId, comment._id, text));
      setText("");
      setEdit(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteComment(postId, comment._id));
  };

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commentatorId) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, comment.commentatorId]);

  return (
    <div className="edit-comment" style={{ backgroundColor: "#fefffe" }}>
      {isAuthor && edit === false && (
        <span
          onClick={() => setEdit(!edit)}
          style={{ backgroundColor: "#fefffe" }}
        >
          <i
            class="fa-solid fa-pen-to-square"
            style={{ backgroundColor: "#fefffe" }}
          ></i>
        </span>
      )}
      {isAuthor && edit && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Edit
          </label>
          <br />
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.text}
          ></input>
          <br />
          <div className="btn">
            <span
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete this comment?"
                  )
                ) {
                  handleDelete();
                }
              }}
            >
              <i class="fa-solid fa-trash-can"></i>
            </span>
            <input type="submit" value="send changes"></input>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditDelete;
