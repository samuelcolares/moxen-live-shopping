import React from "react";
import MoxenLogo from "../../../../components/ui/icons/moxen";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";

const Navbar = () => {
  return (
    <header>
      <nav className="flex justify-between p-4 bg-gray-800 shadow-md shadow-black/50 relative z-20">
        <Link href={"/"}>
          <h1 aria-labelledby="title">
            <span className="sr-only" id="title">
              Moxen Live Shopping
            </span>
            <MoxenLogo className="w-36" ariaLabel="Moxen Logo Home Button"/>
          </h1>
        </Link>
        <div className="flex gap-4 items-center">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
