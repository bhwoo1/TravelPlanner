"use client";

import { useSession } from "next-auth/react";
import React from "react";
import MyPlan from "./MyPlan";
import LogoutButton from "../layout/LogoutButton";

function Profile() {
  const { data: session } = useSession();
  if (!session) return null;
  return (
    <section className="m-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 font-serif">
          오늘은 어떤 계획을 세우러 오셨나요? 
        </h2>
        <p className="text-lg md:text-xl text-blue-600 font-medium">
          {session?.user?.name} 님 ✨
        </p>
        <div className="mt-4"><LogoutButton /></div>
      </div>
      
      <div>{session?.user?.id && <MyPlan userId={session.user.id} />}</div>
    </section>
  );
}

export default Profile;
