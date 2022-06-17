import React from "react";
import Image from "next/image";
import HeaderIcon from "./HeaderIcon";
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="flex items-center justify-between p-2 lg:px-5 sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center">
        <Image
          src="https://links.papareact.com/5me"
          width={40}
          height={40}
          layout="fixed"
        />

        <div className="hidden md:inline-flex items-center ml-3 bg-gray-100 p-2 rounded-full">
          <SearchIcon className="h-5 text-gray-600" />

          <input
            className="bg-transparent ml-2 flex-grow outline-none flex-shrink"
            type="text"
            placeholder="Search Facebook"
          />
        </div>
      </div>

      <div className="flex justify-center flex-grow">
        <div className="flex space-x-6 md:space-x-2">
          <HeaderIcon Icon={HomeIcon} active />

          <HeaderIcon Icon={FlagIcon} />

          <HeaderIcon Icon={PlayIcon} />

          <HeaderIcon Icon={ShoppingCartIcon} />

          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>

      <div className="flex items-center space-x-2 justify-end">
        <Image
          className="cursor-pointer rounded-full"
          onClick={signOut}
          src={session?.user?.image}
          width={40}
          height={40}
          layout="fixed"
        />

        <p className="hidden sm:inline font-semibold whitespace-nowrap pr-3">
          {session.user.name}
        </p>

        <ViewGridIcon className="icon" />

        <ChatIcon className="icon" />

        <BellIcon className="icon" />

        <ChevronDownIcon className="icon" />
      </div>
    </header>
  );
};

export default Header;
