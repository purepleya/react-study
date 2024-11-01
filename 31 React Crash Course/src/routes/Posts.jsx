import { useState } from "react";
import PostList from "../components/PostList";
import { Outlet } from "react-router-dom";

function Posts() {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  return (
    <>
      <Outlet />
      <main>
        <PostList  />
      </main>
    </>
  );
}

export default Posts;
