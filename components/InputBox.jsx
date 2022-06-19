import React, { useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";

const InputBox = () => {
  const { data: session } = useSession();

  const [input, setInput] = useState("");

  const filePickerRef = useRef(null);

  const [seletedFile, setSeletedFile] = useState(null);

  const uploadImage = (e) => {
    const reader = new FileReader();

    const { type } = e.target.files[0];

    if (
      e.target.files[0] ||
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpeg" ||
      type === "image/gif" ||
      type === "image/tiff"
    ) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSeletedFile(readerEvent.target.result);
    };
  };

  const sendPost = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    const docRef = await addDoc(collection(db, "posts"), {
      message: input,
      name: session.user.name,
      email: session.user.email,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    if (seletedFile) {
      const imageRef = ref(storage, `posts/${docRef?.id}/images`);

      await uploadString(imageRef, seletedFile, "data_url").then(
        async (snapshot) => {
          const downloadUrl = await getDownloadURL(imageRef);

          setSeletedFile(null);

          await updateDoc(doc(db, "posts", docRef.id), {
            image: downloadUrl,
          });
        }
      );
    }

    setInput("");
  };

  return (
    <div className="bg-white mt-6 p-4 rounded-2xl shadow-md text-gray-500 font-medium">
      <div className="flex items-center space-x-3 pb-3">
        <Image
          className="rounded-full"
          src={session?.user.image}
          width={35}
          height={35}
          layout="fixed"
        />

        <form className="flex flex-1" onSubmit={sendPost}>
          <input
            className="flex-grow bg-gray-100 rounded-full outline-none px-5 py-2"
            value={input}
            type="text"
            placeholder={`What's on your mind ${session?.user.name}`}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>

        {seletedFile && (
          <div
            className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
            onClick={() => setSeletedFile(null)}
          >
            <img className="h-10 object-contain" src={seletedFile} alt="" />

            <p className="text-red-500 text-sm text-center">Remove</p>
          </div>
        )}
      </div>

      <div className="flex px-2 pt-3 justify-evenly border-t ">
        <div className="input-icon">
          <VideoCameraIcon className="h-6 text-red-500" />

          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>

        <div
          className="input-icon"
          onClick={() => filePickerRef.current.click()}
        >
          <CameraIcon className="h-6 text-green-400" />

          <p className="text-xs sm:text-sm xl:text-base">Photos & Videos</p>

          <input
            ref={filePickerRef}
            type="file"
            hidden
            onChange={uploadImage}
          />
        </div>

        <div className="input-icon">
          <EmojiHappyIcon className="h-6 text-yellow-300" />

          <p className="text-xs sm:text-sm xl:text-base ">
            Feelings & Activities
          </p>
        </div>
      </div>
    </div>
  );
};

export default InputBox;
