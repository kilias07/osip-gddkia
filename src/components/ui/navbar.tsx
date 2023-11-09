"use client";

import Link from "next/link";
import { useRef } from "react";
import useOnClickOutside from "@/lib/use-click-outside";
import { ModeToggle } from "../mode-toggle";

const Navbar = () => {
  const refNav = useRef<HTMLDivElement>(null);
  const refInput = useRef<HTMLInputElement>(null);
  useOnClickOutside(refNav, () => (refInput.current!.checked = false));

  return (
    <nav className="">
      <div
        className="container mx-auto flex items-center justify-between mt-[10px]"
        ref={refNav}
      >
        <div className="relative z-50">
          <Link
            href="/"
            className="inline-block text-5xl uppercase font-medium"
            as="/"
          >
            osad
            <span className="-ml-1 text-xs font-light">GDDKiA</span>
          </Link>
        </div>
        <div className="md:hidden grow text-right mr-4">
          <ModeToggle />
        </div>
        <label className="hamburger-menu z-50 md:hidden" htmlFor="hamburger">
          <input type="checkbox" id="hamburger" ref={refInput} />
        </label>
        <ul
          className="absolute bg-white dark:bg-slate-950 inset-0 flex h-[400px] -translate-y-full flex-col justify-center gap-10 bg-light-full transition-transform duration-300 md:static md:grow md:h-fit md:translate-y-0 md:flex-row md:transition-none md:[&>li:last-child]:text-right items-center"
          id="navLinks"
        >
          <li>
            <Link href="/wyswietl"> wyswietl wyniki</Link>
          </li>
          <li>
            <Link href="/dodaj"> dodaj wyniki</Link>
          </li>
        </ul>
        <div className="hidden md:block relative z-50">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
