"use client"

import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import Swal from 'sweetalert2';

interface Register {
  email: string,
  password: string,
  confirmPassword: string,
  name: string
}

function RegisterForm() {
  const router = useRouter();
  const [registerInfo, setRegisterInfo] = useState<Register>({
    email: "",
    password: "",
    confirmPassword: "",
    name: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRegisterInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (registerInfo.email === "" || registerInfo.password === "" || registerInfo.confirmPassword === "" || registerInfo.name === "" ) {
      Swal.fire({
        icon: 'warning',
        title: "Warning!",
        text: "빈칸 없이 입력해주세요!",
        showConfirmButton: false,
        timer: 1000
      });
      return;
    }

    if (registerInfo.password !== registerInfo.confirmPassword) {
      Swal.fire({
        icon: 'warning',
        title: "Warning!",
        text: "비밀번호를 확인해주세요!",
        showConfirmButton: false,
        timer: 1000
      });
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerInfo),
      });
  
      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "가입되었습니다!",
          showConfirmButton: false,
          timer: 1000
        });

        router.push("/signin");
      }
    } catch(err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : String(err);

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: errorMessage,
        showConfirmButton: false,
        timer: 1000
      })
    }

    
  }

  return (
    <form
  onSubmit={handleSubmit}
  className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md mx-auto flex flex-col gap-6 animate-fade-in"
>
  <h2 className="text-2xl font-semibold text-center text-gray-800">회원가입</h2>

  <div className="flex flex-col">
    <label htmlFor="email" className="text-sm text-gray-600 mb-1">
      이메일
    </label>
    <input
      type="email"
      name="email"
      id="email"
      value={registerInfo.email}
      placeholder="이메일 주소"
      onChange={handleChange}
      className="border border-gray-300 focus:border-blue-500 focus:ring-blue-500 ring-1 ring-transparent focus:outline-none p-2 rounded-md transition-all"
      required
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="password" className="text-sm text-gray-600 mb-1">
      비밀번호
    </label>
    <input
      type="password"
      name="password"
      id="password"
      value={registerInfo.password}
      placeholder="비밀번호"
      onChange={handleChange}
      className="border border-gray-300 focus:border-blue-500 focus:ring-blue-500 ring-1 ring-transparent focus:outline-none p-2 rounded-md transition-all"
      required
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="confirmPassword" className="text-sm text-gray-600 mb-1">
      비밀번호 확인
    </label>
    <input
      type="password"
      name="confirmPassword"
      id="confirmPassword"
      value={registerInfo.confirmPassword}
      placeholder="비밀번호 확인"
      onChange={handleChange}
      className="border border-gray-300 focus:border-blue-500 focus:ring-blue-500 ring-1 ring-transparent focus:outline-none p-2 rounded-md transition-all"
      required
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="name" className="text-sm text-gray-600 mb-1">
      닉네임
    </label>
    <input
      type="text"
      name="name"
      id="name"
      value={registerInfo.name}
      placeholder="닉네임"
      onChange={handleChange}
      className="border border-gray-300 focus:border-blue-500 focus:ring-blue-500 ring-1 ring-transparent focus:outline-none p-2 rounded-md transition-all"
      required
    />
  </div>

  <button
    type="submit"
    className="bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-2 rounded-md shadow"
  >
    회원가입
  </button>

  <div className="text-center text-sm text-gray-600">
    이미 계정이 있으신가요?{" "}
    <span
      onClick={() => router.push("/signin")}
      className="text-blue-600 hover:underline cursor-pointer font-semibold"
    >
      로그인
    </span>
  </div>
</form>
  )
}

export default RegisterForm