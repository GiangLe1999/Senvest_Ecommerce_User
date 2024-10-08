import { useTranslations } from "next-intl";
import { FC } from "react";
import Image from "next/image";
import SmallSectionContainer from "@/components/small-section-container";

interface Props {}

const ingredients = [
  {
    heading: "ingredient_1_heading",
    description: "ingredient_1_description",
    icon: "/home-page/section-4-petroleum.webp",
  },
  {
    heading: "ingredient_2_heading",
    description: "ingredient_2_description",
    icon: "/home-page/section-4-cruelty.webp",
  },
  {
    heading: "ingredient_3_heading",
    description: "ingredient_3_description",
    icon: "/home-page/section-4-phthalate.webp",
  },
  {
    heading: "ingredient_4_heading",
    description: "ingredient_4_description",
    icon: "/home-page/section-4-vegan.webp",
  },
];

const Ingredients: FC<Props> = (props): JSX.Element => {
  const t = useTranslations("home_page.ingredients");

  return (
    <section className="lg:py-[90px] py-[60px]">
      <SmallSectionContainer className="grid lg:grid-cols-2 grid-cols-1 gap-[30px]">
        <div>
          <h2 className="lg:text-4xl text-3xl mb-10">
            {t("heading_line_1")} <br /> {t("heading_line_2")}
          </h2>
          <ul className="space-y-8">
            {ingredients.map((ingredient) => (
              <li key={ingredient.heading} className="flex items-center gap-8">
                <Image
                  src={ingredient.icon}
                  alt={ingredient.heading}
                  width={51}
                  height={61}
                  className="rounded-sm"
                />
                <div>
                  <h3 className="lg:text-2xl text-xl">
                    {t(ingredient.heading)}
                  </h3>
                  <p className="text-muted">{t(ingredient.description)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Image
          src={"/home-page/section-4-img.webp"}
          alt="Section 4 image"
          width={640}
          height={640}
          className="xl:-mt-12 mx-auto"
        />
      </SmallSectionContainer>
    </section>
  );
};

export default Ingredients;
