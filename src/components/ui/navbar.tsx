"use client";

import Link from "next/link";
import { useRef } from "react";
import useOnClickOutside from "@/lib/use-click-outside";
import { ModeToggle } from "../mode-toggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const refNav = useRef<HTMLDivElement>(null);
  const pathName = usePathname();
  const refInput = useRef<HTMLInputElement>(null);
  const handleClick = () => (refInput.current!.checked = false);
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
            className="inline-block text-4xl uppercase font-medium"
            as="/"
          >
            osad fwd
            <span className="text-xs font-light">GDDKiA</span>
            <p className="text-xs font-light lowercase">
              Obsługa Systemu Akwizycji Danych FWD
            </p>
          </Link>
        </div>
        <div className="md:hidden grow text-right mr-4">
          <ModeToggle />
        </div>
        <label className="hamburger-menu z-50 md:hidden" htmlFor="hamburger">
          <input type="checkbox" id="hamburger" ref={refInput} />
        </label>
        <ul
          className="absolute bg-white dark:bg-slate-950 inset-0 z-40 flex h-[400px] -translate-y-full flex-col justify-center gap-10 bg-light-full transition-transform duration-300 md:static md:grow md:h-fit md:translate-y-0 md:flex-row md:transition-none md:[&>li:last-child]:text-right text-sm font-medium items-center"
          id="navLinks"
        >
          <li
            className={`${cn(
              "py-1 uppercase",
              pathName === "/wyswietl"
                ? "border-b-2 border-slate-950 dark:border-white"
                : "border-0"
            )}`}
          >
            <Link href="/wyswietl" onClick={handleClick}>
              tryb wizualizacji
            </Link>
          </li>
          <li
            className={`${cn(
              "py-1 uppercase",
              pathName === "/dodaj"
                ? "border-b-2 border-slate-950 dark:border-white"
                : "border-0"
            )}`}
          >
            <Link href="/dodaj" onClick={handleClick}>
              tryb dodawania plików
            </Link>
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
