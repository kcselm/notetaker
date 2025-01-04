import Link from "next/link";
import { Coffee, Menu, X } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { auth } from "~/server/auth";
import { ModeToggle } from "./ThemeToggle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

const NavBar = async () => {
  const session = await auth();

  return (
    <nav className="absolute flex w-full gap-3 p-6 text-black">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Link href="/">
              <Coffee
                size={34}
                strokeWidth={2.5}
                className="text-yellow-800 dark:text-yellow-700"
              />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Home</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="absolute right-5 flex gap-4">
        <ModeToggle />
        {session && (
          <Popover>
            <PopoverTrigger>
              <img
                src={session?.user?.image ?? ""}
                alt={session?.user?.name ?? ""}
                className={buttonVariants({
                  variant: "outline",
                  size: "icon",
                })}
              />
            </PopoverTrigger>
            <PopoverContent className="p-2">
              <div className="">
                <Link
                  href="/api/auth/signout"
                  className={buttonVariants({ size: "default" })}
                >
                  Sign{" "}
                  <span className="text-md font-extrabold">
                    {session.user.name}
                  </span>{" "}
                  Out
                </Link>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
