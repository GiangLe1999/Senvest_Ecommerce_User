import ArticleCard from "@/components/article-card";
import { FC } from "react";

interface Props {
  articles: any[];
}

const Articles: FC<Props> = ({ articles }): JSX.Element => {
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mt-4">
      {articles?.map((article, index) => (
        <ArticleCard key={index} article={article} />
      ))}
    </div>
  );
};

export default Articles;
