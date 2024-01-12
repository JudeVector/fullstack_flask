import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-green-600 px-8 py-3">
      <Link className=" text-white font-bold" href={"/"}>
        TaskHarbor.
      </Link>
      <Link className="bg-white p-2" href={"/addTopic"}>
        Add Topic
      </Link>
    </nav>
  );
};

export default Navbar;
