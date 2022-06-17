import React from "react";
import Post from "./Post";
import { db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "@firebase/firestore";

const Posts = ({ posts }) => {
  const [realtimePosts] = useCollection(
    query(collection(db, "posts"), orderBy("timestamp", "desc"))
  );

  return (
    <div>
      {realtimePosts
        ? realtimePosts?.docs.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              name={post.data().name}
              message={post.data().message}
              email={post.data().email}
              timestamp={post.data().timestamp}
              profileImg={post.data().profileImg}
              image={post.data().image}
            />
          ))
        : posts?.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              name={post.name}
              message={post.message}
              email={post.email}
              timestamp={post.timestamp}
              profileImg={post.profileImg}
              image={post.image}
            />
          ))}
    </div>
  );
};

export default Posts;
