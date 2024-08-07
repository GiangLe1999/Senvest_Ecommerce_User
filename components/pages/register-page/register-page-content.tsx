"use client";

import { FC, useState } from "react";
import RegisterForm from "./register-form";
import VerificationForm from "./verification-form";

interface Props {}

const RegisterPageContent: FC<Props> = (props): JSX.Element => {
  const [activeForm, setActiveForm] = useState("register");
  const [currentEmail, setCurrentEmail] = useState("");
  return (
    <>
      {activeForm === "register" ? (
        <RegisterForm
          setActiveForm={setActiveForm}
          setCurrentEmail={setCurrentEmail}
        />
      ) : (
        <VerificationForm email={currentEmail} />
      )}
    </>
  );
};

export default RegisterPageContent;
