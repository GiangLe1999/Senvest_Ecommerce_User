import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
    collectionSlug: string;
  };
}

const CollectionPage: NextPage<Props> = ({
  params: { locale, collectionSlug },
}: Props) => {
  unstable_setRequestLocale(locale);

  // const { data } = await getUserAddress(id);

  return <></>;
};

export default CollectionPage;
