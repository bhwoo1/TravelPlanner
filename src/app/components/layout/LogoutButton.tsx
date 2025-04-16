"use client"

import { signOut } from "next-auth/react";
import React from "react";

function LogoutButton() {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
    localStorage.removeItem("token");
  };
  return (
    <div>
      <button
        className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gradient-to-l hover:from-purple-500 hover:to-blue-500 hover:shadow-xl transition-all duration-300"
        onClick={handleSignOut}
      >
        로그아웃
      </button>
    </div>
  );
}

export default LogoutButton;
