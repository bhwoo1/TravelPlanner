import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <header className="h-[80px] flex items-center border-b-1 border-slate-400">
      <div className="relative w-[100px] h-[50px] lg:h-[80px] mx-12 lg:mx-48 2xl:mx-80">
        <Link href={"/"}>
          <Image src={"/ic.png"} alt="logo" fill className="object-contain" />
        </Link>
      </div>
    </header>
  )
}

export default Header