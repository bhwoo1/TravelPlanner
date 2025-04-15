import Image from "next/image";
import Link from "next/link";
import React from "react";
import LoginButton from "./LoginButton";
// import Navigator from './Navigator'

function Header() {
  return (
    <header className="h-[80px] flex items-center border-b-1 border-slate-400 justify-between">
      <div className="relative lg:w-[100px] w-[200px] h-[100px] lg:h-[80px] lg:mx-24 2xl:mx-80">
        <Link href={"/"}>
          <Image src={"/ic.png"} alt="logo" fill className="object-contain" />
        </Link>
      </div>
      <div className="mx-12 lg:mx-48 2xl:mx-80 hidden 2xl:block">
        <LoginButton />
      </div>
      {/* <div className='mx-12 lg:mx-48 2xl:mx-80 hidden 2xl:block'>
        <Navigator />
      </div> */}
    </header>
  );
}

export default Header;
