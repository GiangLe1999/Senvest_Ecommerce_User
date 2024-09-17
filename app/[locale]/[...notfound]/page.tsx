import { unstable_setRequestLocale } from "next-intl/server";
import NotFoundPageContent from "@/components/pages/404-page/404-page-content";
import { Metadata } from "next";

interface Props {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isVi = params.locale === "vi";

  return {
    title: isVi ? "Không tìm thấy trang" : "Page Not Found",
    description: isVi
      ? "Trang bạn đang tìm không tồn tại hoặc đã bị di chuyển. Vui lòng kiểm tra lại đường dẫn."
      : "The page you're looking for doesn't exist or has been moved. Please check the URL.",
  };
}

const NotFound = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  return <NotFoundPageContent />;
};

export default NotFound;
