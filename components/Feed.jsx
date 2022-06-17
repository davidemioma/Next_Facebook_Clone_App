import React from "react";
import InputBox from "./InputBox";
import Posts from "./Posts";
import Stories from "./Stories";

const Feed = ({ posts }) => {
  return (
    <div className="flex-grow h-screen pb-44 pt-6 overflow-y-auto scrollbar-hide mr-2 xl:mr-40">
      <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
        <Stories />

        <InputBox />

        <Posts posts={posts} />
      </div>
    </div>
  );
};

export default Feed;
