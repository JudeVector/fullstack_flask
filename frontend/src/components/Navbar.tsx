import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-slate-800 px-8 py-3">
      <Link className=" text-white font-bold" href={"/"}>
        Flask Docker
      </Link>
      <Link href={"/addTopic"}>Add Topic</Link>
    </nav>
  );
};

export default Navbar;
