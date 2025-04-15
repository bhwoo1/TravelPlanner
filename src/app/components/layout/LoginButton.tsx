"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

function LoginButton() {
  const { data: session } = useSession();
  return (
    <div>
      {session ? (
        <div>
          <div>
            환영해요 {session.user?.name} 님
            <button onClick={() => signOut()}>로그아웃</button>
          </div>
        </div>
      ) : (
        <div>
          <Link href={"/signin"}>
            <button className="cursor-pointer">로그인</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default LoginButton;
