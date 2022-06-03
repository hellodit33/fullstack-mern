import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.actions";

const DeleteCard = (props) => {
  //import dispatch for the redux store
  const dispatch = useDispatch();

  /**
   *
   * @returns deletes message if user confirms
   */
  const deleteMessage = () => dispatch(deletePost(props.id));
  return (
    <div
      onClick={() => {
        if (window.confirm("Are you sure you want to delete this post?")) {
          deleteMessage();
        }
      }}
    >
      <i className="fa-solid fa-trash-can"></i>
    </div>
  );
};

export default DeleteCard;
