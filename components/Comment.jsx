import React from "react";
import Moment from "react-moment";

const Comment = ({ profileImg, username, comment, timestamp }) => {
  return (
    <div className="flex items-center mt-3">
      <img className="rounded-full w-10 h-10 mr-3" src={profileImg} alt="" />

      <div className="flex-grow">
        <p className="text-sm">{username}</p>

        <p>{comment}</p>
      </div>

      <Moment className="text-sm" fromNow>
        {timestamp?.toDate()}
      </Moment>
    </div>
  );
};

export default Comment;
