"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

function DeleteButton({ planId }: { planId: string }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handlePlanDelete = async () => {
    if (!session) {
      Swal.fire({
        icon: "warning",
        title: "Warning!",
        text: "권한이 없습니다!",
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }

    try {
      const res = await fetch("/api/user/saveplan", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId,
          userId: session?.user?.id,
        }),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "삭제에 성공했습니다다!",
          showConfirmButton: false,
          timer: 1000,
        });
        router.push("/mypage");
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "삭제에 실패했습니다!",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <button
        className="w-full lg:w-1/2 cursor-pointer bg-red-400 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
        onClick={handlePlanDelete}
      >
        삭제하기
      </button>
    </div>
  );
}

export default DeleteButton;
