"use client";

import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const NavBar = () => {
  const pathname = usePathname();

  return (
    <div className="flex w-full py-3 pl-3 bg-[#03DAC5]">
      <div className="flex gap-5 items-center">
        {pathname === "/" && (
          <Image src="/logo.png" width={40} height={40} alt="logo" />
        )}

        {pathname !== "/" && <ArrowLeft />}

        <p className="font-bold text-lg">IMCI</p>
      </div>
    </div>
  );
};

export default NavBar;
