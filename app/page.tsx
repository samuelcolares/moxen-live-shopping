import { ModeToggle } from "@/components/ui/theme-toggle";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen">
      <ModeToggle />
      <UserButton afterSignOutUrl="/">oi</UserButton>
    </div>
  );
}
