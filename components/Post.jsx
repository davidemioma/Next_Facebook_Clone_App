import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  ChatAltIcon,
  ShareIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import { ThumbUpIcon } from "@heroicons/react/solid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "@firebase/firestore";
import { db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import Comment from "./Comment";

const Post = ({ id, name, message, email, timestamp, profileImg, image }) => {
  const { data: session } = useSession();

  const [comment, setComment] = useState("");

  const [commentBoxOpen, setCommentBoxOpen] = useState(false);

  const [hasLiked, setHasLiked] = useState(false);

  const [comments] = useCollection(
    query(collection(db, "posts", id, "comments"), orderBy("timestamp", "desc"))
  );

  const [likes] = useCollection(collection(db, "posts", id, "likes"));

  useEffect(
    () =>
      setHasLiked(
        likes?.docs.findIndex((like) => like.id === session.user.email) !== -1
      ),
    [likes]
  );

  const postComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;

    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.name,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.email));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.email), {
        username: session.user.name,
      });
    }
  };

  return (
    <div className="bg-white mt-5 p-5 shadow-sm rounded-2xl">
      <div className="flex items-center space-x-2">
        <img className="rounded-full w-10 h-10" src={profileImg} alt="" />

        <div>
          <p className="font-medium">{name}</p>

          {timestamp ? (
            <p className="text-xs text-gray-400">
              {new Date(timestamp?.toDate()).toLocaleString()}
            </p>
          ) : (
            <p className="text-xs text-gray-400">Loading...</p>
          )}
        </div>
      </div>

      <p className="pt-4">{message}</p>

      {image && (
        <div className="relative mt-4 h-56 md:h-96 bg-white">
          <Image src={image} layout="fill" objectFit="cover" />
        </div>
      )}

      <div className="bg-white flex items-center justify-between rounded-b-2xl text-gray-400 border-t shadow-md">
        <div className="input-icon" onClick={likePost}>
          <ThumbUpIcon className={`h-4 ${hasLiked && "text-red-500"}`} />

          <p className="text-xs sm:text-base">Like</p>
        </div>

        <div
          className="input-icon"
          onClick={() => setCommentBoxOpen(!commentBoxOpen)}
        >
          <ChatAltIcon className="h-4" />

          <p className="text-xs sm:text-base">
            {comments?.docs.length} Comment
          </p>
        </div>

        <div className="input-icon">
          <ShareIcon className="h-4" />

          <p className="text-xs sm:text-base">Share</p>
        </div>
      </div>

      {commentBoxOpen && (
        <form className="mt-4 flex items-center space-x-3">
          <EmojiHappyIcon className="hidden sm:inline h-5" />

          <input
            className="flex-grow bg-gray-100 p-2 rounded-2xl outline-none"
            value={comment}
            type="text"
            placeholder="Add a comment..."
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            className="text-blue-500 font-medium cursor-pointer"
            onClick={postComment}
            type="submit"
            disabled={!comment.trim()}
          >
            Post
          </button>
        </form>
      )}

      {comments?.docs.length > 0 && (
        <div>
          {comments?.docs?.map((comment) => (
            <Comment
              key={comment.id}
              profileImg={comment.data().profileImg}
              username={comment.data().username}
              comment={comment.data().comment}
              timestamp={comment.data().timestamp}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
