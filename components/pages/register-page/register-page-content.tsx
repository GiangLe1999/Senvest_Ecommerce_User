"use client";

import { FC, useState } from "react";
import RegisterForm from "./register-form";
import VerificationForm from "./verification-form";
import SectionContainer from "@/components/section-container";
import CustomBreadcrumb from "@/components/custom-breadcrumb";
import { useTranslations } from "next-intl";

interface Props {}

const RegisterPageContent: FC<Props> = (props): JSX.Element => {
  const [activeForm, setActiveForm] = useState("register");
  const [currentEmail, setCurrentEmail] = useState("");
  const t = useTranslations("navigation");

  return (
    <SectionContainer>
      <div className="max-w-[640px] mx-auto">
        <CustomBreadcrumb pages={[{ name: t("register"), link: "/dang-ki" }]} />
        {activeForm === "register" ? (
          <RegisterForm
            setActiveForm={setActiveForm}
            setCurrentEmail={setCurrentEmail}
          />
        ) : (
          <VerificationForm email={currentEmail} />
        )}
      </div>
    </SectionContainer>
  );
};

export default RegisterPageContent;
