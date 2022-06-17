import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <Image
        src="https://links.papareact.com/t4i"
        width={400}
        height={400}
        objectFit="contain"
      />

      <button
        className="bg-blue-500 py-4 px-5 text-white text-center rounded-full cursor-pointer"
        onClick={signIn}
      >
        Login with google
      </button>
    </div>
  );
};

export default Login;
