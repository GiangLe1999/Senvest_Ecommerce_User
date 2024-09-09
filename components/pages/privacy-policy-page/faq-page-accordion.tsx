import {
  ClipboardPenIcon,
  CopyCheckIcon,
  FlipVerticalIcon,
  HeartIcon,
  RecycleIcon,
  ShieldQuestionIcon,
  TicketPercentIcon,
  TicketXIcon,
} from "lucide-react";
import { FC } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";

interface Props {}

const icons = [
  { icon: <FlipVerticalIcon className="w-4 h-4" /> },
  { icon: <HeartIcon className="w-4 h-4" /> },
  { icon: <ShieldQuestionIcon className="w-4 h-4" /> },
  { icon: <RecycleIcon className="w-4 h-4" /> },
  { icon: <ClipboardPenIcon className="w-4 h-4" /> },
  { icon: <TicketPercentIcon className="w-4 h-4" /> },
  { icon: <CopyCheckIcon className="w-4 h-4" /> },
  { icon: <TicketXIcon className="w-4 h-4" /> },
];

const FaqPageAccordion: FC<Props> = (props): JSX.Element => {
  const t = useTranslations("faq_page");
  return (
    <div className="max-w-4xl mx-auto">
      <Accordion type="multiple" defaultValue={["question-1"]}>
        {icons.map(({ icon }, index) => (
          <AccordionItem value={`question-${index + 1}`} key={index}>
            <AccordionTrigger className="hover:no-underline font-bold justify-between gap-x-3">
              <div className="flex items-center gap-x-3">
                <div className="w-8 h-8 border rounded-md grid place-content-center shadow">
                  {icon}
                </div>
                {t(`question_${index + 1}`)}
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted">
              {t(`answer_${index + 1}`)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FaqPageAccordion;
