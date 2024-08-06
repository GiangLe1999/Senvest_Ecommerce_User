import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FC } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/configs/i18n-navigation";

interface Props {
  pages: { name: string; link: any }[];
}

const CustomBreadcrumb: FC<Props> = ({ pages }): JSX.Element => {
  const t = useTranslations("navigation");
  const allPages = [{ name: t("home"), link: "/" }, ...pages];

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList className="justify-center">
        {allPages.map((page, index) => {
          if (index === allPages.length - 1) {
            return (
              <BreadcrumbItem key={page.name}>
                <BreadcrumbPage className="font-bold">
                  {page.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            );
          }
          return (
            <BreadcrumbItem key={page.name}>
              <BreadcrumbPage className="hover:text-primary transition hover:underline">
                <Link href={page.link}>{page.name}</Link>
              </BreadcrumbPage>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
