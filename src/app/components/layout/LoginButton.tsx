"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

function LoginButton() {
  const { data: session } = useSession();

 
  return (
    <div>
      {session ? (
        <div>
          <div className="flex flex-row items-center">
            <Link href={"/mypage"}>
              <div className="cursor-pointer">
                <p className="text-xl font-semibold text-gray-800">
                  {session.user?.name} 님
                </p>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <Link href={"/signin"}>
            <button className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gradient-to-l hover:from-purple-500 hover:to-blue-500 hover:shadow-xl transition-all duration-300">
              로그인
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default LoginButton;
