import React from "react";
import MoxenLogo from "@/components/ui/icons/moxen";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";
import { Search } from "./search";
import { currentUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import SearchMobile from "./search-mobile";

const Navbar = async () => {
  const user = await currentUser();
  return (
    <header>
      <nav className="flex justify-between px-4 bg-primary dark:bg-[#100d1d] shadow-md shadow-black/50 fixed w-full z-20">
        <Link href={"/"}>
          <h1 aria-labelledby="title">
            <span className="sr-only text-white" id="title">
              Moxen Live Shopping
            </span>
            <MoxenLogo
              className="lg:w-36 w-20"
              ariaLabel="Moxen Logo Home Button"
            />
          </h1>
        </Link>
        <Search />
        <div className="gap-4 items-center flex">
          <div className="lg:hidden">
            <SearchMobile />
          </div>
          <ModeToggle />
          {user && <UserButton afterSignOutUrl="/" />}
          {!user && (
            <Button asChild variant={"secondary"} className="dark:bg-transparent border border-muted-foreground">
              <Link href={"/sign-in"}>Login</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
