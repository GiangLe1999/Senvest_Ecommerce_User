import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("common");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
