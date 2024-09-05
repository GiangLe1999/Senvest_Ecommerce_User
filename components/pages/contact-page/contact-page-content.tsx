import CustomBreadcrumb from "@/components/custom-breadcrumb";
import SmallSectionContainer from "@/components/small-section-container";
import { Session } from "next-auth";
import { useTranslations } from "next-intl";
import { FC } from "react";
import ContactForm from "./contact-form";
import { Payment } from "@/entities/payment.entity";
import GoogleMaps from "./google-maps";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  session: Session | null;
  payments: Payment[] | null;
}

const ContactPageContent: FC<Props> = ({ session, payments }): JSX.Element => {
  const t = useTranslations("contact_page");

  return (
    <SmallSectionContainer className="mt-12">
      <CustomBreadcrumb pages={[{ name: t("heading"), link: "/so-sanh" }]} />

      <div className="flex gap-16 items-center">
        <div className="w-1/2">
          <div className="max-w-[400px]">
            <h1 className="text-4xl font-bold mt-6 capitalize mb-3 text-primary">
              {t("heading")}
            </h1>
            <p className="text-sm text-muted mb-4">{t("desc")}</p>
            <ul className="space-y-2 text-sm text-muted list-disc list-inside">
              <li>
                <a href="mailto:info@kindlehopecandles.com">
                  info@kindlehopecandles.com
                </a>
              </li>
              <li>
                <a href="tel:0962334807">0962334807</a>
              </li>
              <li>
                <a
                  href="https://kindlehopecandles.com"
                  className="underline font-bold"
                >
                  https://kindlehopecandles.com
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-6 mt-8">
            <div>
              <h3 className="text-lg font-bold">{t("block_1_heading")}</h3>
              <p className="text-sm text-muted mt-2">{t("block_1_desc")}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold">{t("block_2_heading")}</h3>
              <p className="text-sm text-muted mt-2">{t("block_2_desc")}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold">{t("block_3_heading")}</h3>
              <p className="text-sm text-muted mt-2">{t("block_3_desc")}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold">{t("block_4_heading")}</h3>
              <p className="text-sm text-muted mt-2">{t("block_4_desc")}</p>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <ContactForm session={session} payments={payments} />
        </div>
      </div>

      <div className="flex items-center mt-20 gap-16">
        <div className="w-1/2">
          <GoogleMaps />
        </div>

        <div className="flex-1">
          <h2 className="text-lg">{t("our_location")}</h2>
          <span className="text-4xl font-bold mt-6 capitalize mb-3 text-primary">
            {t("connect")}
          </span>

          <h3 className="text-lg font-bold mt-5">{t("headquarters")}</h3>
          <ul className="text-muted text-sm mt-1 space-y-1">
            <li>Kindle Hopes Candles Co., Ltd.</li>
            <li>16 Má Hai, Phường Tân Hòa</li>
            <li>TP. Buôn Ma Thuột, Đăk Lăk, 630000</li>
            <li>Việt Nam</li>
          </ul>
        </div>
      </div>

      <div className="mt-32">
        <div className="text-center">
          <h2 className="text-4xl font-bold mt-6 capitalize text-primary">
            {t("faq_heading")}
          </h2>
          <p className="text-sm text-muted mb-4 mt-3">{t("faq_desc")}</p>
        </div>
        <div className="flex-1">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="question_1">
              <AccordionTrigger className="hover:no-underline font-bold">
                {t("question_1")}
              </AccordionTrigger>
              <AccordionContent className="text-muted">
                {t("answer_1")}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="question_2">
              <AccordionTrigger className="hover:no-underline font-bold">
                {t("question_2")}
              </AccordionTrigger>
              <AccordionContent className="text-muted">
                {t("answer_2")}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="question_3">
              <AccordionTrigger className="hover:no-underline font-bold">
                {t("question_3")}
              </AccordionTrigger>
              <AccordionContent className="text-muted">
                {t("answer_3")}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="question_4">
              <AccordionTrigger className="hover:no-underline font-bold">
                {t("question_4")}
              </AccordionTrigger>
              <AccordionContent className="text-muted">
                {t("answer_4")}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </SmallSectionContainer>
  );
};

export default ContactPageContent;
