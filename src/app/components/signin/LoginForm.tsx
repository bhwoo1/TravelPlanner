"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false, // false로 하면 결과를 받아서 직접 처리 가능
      email,
      password,
    });

    if (result?.ok) {
      Swal.fire({
        icon: "success",
        title: "로그인 성공!",
        showConfirmButton: false,
        timer: 1000,
      });
      router.push("/"); // 로그인 후 이동할 경로
    } else {
      Swal.fire({
        icon: "error",
        title: "로그인 실패",
        text: "이메일 또는 비밀번호가 올바르지 않습니다.",
        showConfirmButton: true,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="shadow-lg rounded-2xl p-8 w-full max-w-md mx-auto flex flex-col gap-6 animate-fade-in"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        로그인
      </h2>

      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm text-gray-600 mb-1">
          이메일
        </label>
        <input
          id="email"
          type="email"
          placeholder="이메일 주소"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 focus:border-blue-500 focus:ring-blue-500 ring-1 ring-transparent focus:outline-none p-2 rounded-md transition-all"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="text-sm text-gray-600 mb-1">
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 focus:border-blue-500 focus:ring-blue-500 ring-1 ring-transparent focus:outline-none p-2 rounded-md transition-all"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-2 rounded-md shadow"
      >
        로그인
      </button>

      <div className="text-center text-sm text-gray-600">
        계정이 없으신가요?{" "}
        <span
          onClick={() => router.push("/signup")}
          className="text-blue-600 hover:underline cursor-pointer font-semibold"
        >
          회원가입
        </span>
      </div>
    </form>
  );
}

export default LoginForm;
