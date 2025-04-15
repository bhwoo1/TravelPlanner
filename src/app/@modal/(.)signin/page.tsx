import Modal from "@/app/components/layout/Modal";
import LoginForm from "@/app/components/signin/LoginForm";
import React from "react";

function page() {
  return (
    <Modal>
      <div className="flex justify-center flex-col items-center ">
        <LoginForm />
      </div>
    </Modal>
  );
}

export default page;
