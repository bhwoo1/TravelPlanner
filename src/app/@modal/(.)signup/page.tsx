import Modal from "@/app/components/layout/Modal";
import RegisterForm from "@/app/components/signup/RegisterForm";
import React from "react";

function page() {
  return (
    <Modal>
      <div className="flex justify-center flex-col items-center">
        <RegisterForm />
      </div>
    </Modal>
  );
}

export default page;
