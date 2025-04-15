"use client";

import React, { useState } from "react";

function Modal({ children }: { children: React.ReactNode }) {
  const [isModalClosed, setIsModalClosed] = useState(false);
  const closeModal = () => {
    setIsModalClosed(true);
  };

  if (isModalClosed) {
    return null;
  }
  return (
    <div>
      <button onClick={closeModal}>닫기</button>
      <div className="shadow-lg rounded-2xl p-8 w-full max-w-md mx-auto flex flex-col gap-6">{children}</div>
    </div>
  );
}

export default Modal;
