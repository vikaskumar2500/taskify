import Image from "next/image";
import Link from "next/link";
import React from "react";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../public/font.woff2",
});

const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image src="/logo.svg" alt="Logo" width={30} height={30} priority />
        <h1
          className={cn("text-neutral-700 text-lg pb-1", headingFont.className)}
        >
          Taskify
        </h1>
      </div>
    </Link>
  );
};

export default Logo;
