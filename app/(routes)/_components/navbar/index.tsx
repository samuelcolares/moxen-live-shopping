import React from "react";
import MoxenLogo from "@/components/ui/icons/moxen";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";
import { Search } from "./search";
import { currentUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const Navbar = async () => {
  const user = await currentUser();
  return (
    <header>
      <nav className="flex justify-between px-4 bg-gray-800 shadow-md shadow-black/50 fixed w-full z-20">
        <Link href={"/"}>
          <h1 aria-labelledby="title">
            <span className="sr-only" id="title">
              Moxen Live Shopping
            </span>
            <MoxenLogo className="w-36" ariaLabel="Moxen Logo Home Button" />
          </h1>
        </Link>
        <Search />
        <div className="flex gap-4 items-center">
          <ModeToggle />
          {user && <UserButton afterSignOutUrl="/" />}
          {!user && (
            <Button asChild>
              <Link href={"/sign-in"}>Login</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
