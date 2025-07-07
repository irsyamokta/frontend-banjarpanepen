import SectionCard from "../../cards/SectionCard";
import { getArticles } from "../../../services/articleService";
import BasicCardThree from "../../cards/basic/BasicCardThree";
import { formatCalendarDate } from "../../../utils/dateFormatter";

interface Article {
    id: string;
    title: string;
    thumbnail: string;
    created_at: string;
}

export default function ArticleSection() {
    return (
        <SectionCard<Article>
            queryKey="cardArticle"
            fetcher={getArticles}
            renderItem={(article) => (
                <BasicCardThree
                    key={article.id}
                    id={article.id}
                    title={article.title}
                    date={formatCalendarDate(article.created_at)}
                    thumbnail={article.thumbnail}
                    label="Baca Artikel"
                    basePath="artikel"
                />
            )}
        />
    );
}
