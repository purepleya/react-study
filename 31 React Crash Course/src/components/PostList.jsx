import { useState } from "react";
import NewPost from "./NewPost";
import Post from "./Post";
import Modal from "./Modal";

import classes from "./PostList.module.css";

function PostList({isPosting, onStopPosting}) {
  const [enteredBody, setEnteredBody] = useState("");
  const [enteredAuthor, setEnteredAuthor] = useState("");

  

  function bodyChangeHandler(event) {
    setEnteredBody(event.target.value);
  }

  function authorChangeHandler(event) {
    setEnteredAuthor(event.target.value);
  }

  // let modalContent;

  // if (modalIsVisible) {
  //   modalContent = (
  //     <Modal onClose={hideModalHandler}>
  //         <NewPost
  //           onBodyChange={bodyChangeHandler}
  //           onAuthorChange={authorChangeHandler}
  //         />
  //       </Modal>
  //   );
  // }
  return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost
            onBodyChange={bodyChangeHandler}
            onAuthorChange={authorChangeHandler}
            onCancel={onStopPosting}
          />
        </Modal>
      )}
      <ul className={classes.posts}>
        <Post author={enteredAuthor} body={enteredBody} />
        <Post author="Manuel" body="Check out the full course!" />
      </ul>
    </>
  );
}

export default PostList;
