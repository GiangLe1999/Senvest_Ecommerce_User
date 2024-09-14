import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Props {
  article: any;
}

const ArticleCard: FC<Props> = ({ article }): JSX.Element => {
  return (
    <article>
      <Link href={article.link} target="_blank" rel="noopener noreferrer">
        <div className="relative w-full aspect-[1.333]">
          <Image
            src={`${process.env.NEXT_PUBLIC_BLOG_BASE_URL}${article.thumbnail}`}
            alt={article.title.rendered}
            fill
            sizes="100vw"
            className="object-cover rounded-lg"
          />
        </div>
        <h3 className="font-bold text-xl line-clamp-2 mt-3 min-h-[56px]">
          {article.title.rendered}
        </h3>
        <div className="flex items-center justify-between gap-2 mt-3">
          <div className="flex items-center gap-2">
            <div className="rounded-full w-5 h-5 bg-primary text-white grid place-items-center text-sm font-bold">
              L
            </div>
            <span className="font-bold text-muted text-sm">
              Pham Huynh Linh
            </span>
          </div>

          <span className="text-sm text-muted-foreground">
            {format(new Date(article.date), "MMMM d, yyyy")}
          </span>
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;
