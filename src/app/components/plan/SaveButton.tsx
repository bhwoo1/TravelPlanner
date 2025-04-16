"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

function SaveButton({ planId }: { planId: string }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handlePlanSave = async () => {
    if (!session) {
      Swal.fire({
        icon: "warning",
        title: "Warning!",
        text: "로그인이 필요합니다!",
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }

    try {
      const res = await fetch("/api/user/saveplan", {
        method: "POST",
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
          text: "저장하였습니다!",
          showConfirmButton: false,
          timer: 1000,
        });
      }
      if (res.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "이미 저장되었습니다!",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "저장에 실패했습니다!",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  const handleReTry = () => {
    Swal.fire({
      icon: "info",
      text: "저장되지 않은 내용은 삭제될 수 있습니다.",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/");
      }
    });
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4">
        <button
          className="w-full lg:w-1/2 cursor-pointer bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
          onClick={handlePlanSave}
        >
          저장하기
        </button>
        <button
          onClick={handleReTry}
          className="w-full lg:w-1/2 cursor-pointer bg-red-400 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
        >
          다시하기
        </button>
      </div>
    </>
  );
}

export default SaveButton;
