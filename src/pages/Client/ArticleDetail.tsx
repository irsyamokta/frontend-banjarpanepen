import { useParams } from "react-router-dom";
import useSWR from "swr";
import { getArticleById } from "../../services/articleService";
import PageShell from "../../components/common/PageShell";
import ArticleDetailContent from "../../components/section/article/ArticleDetailContent";
// import { Spinner } from "../../components/ui/spinner/Spinner";

const fetcher = (id: string) => getArticleById(id);

export default function ArticleDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { data: article } = useSWR(id ? `article-${id}` : null, () => fetcher(id!), {
        suspense: true,
    });

    return (
        <PageShell title={article.title} description="Temukan informasi lengkap tentang wisata di Banjarpanepen. Jelajahi tempat menarik, budaya, dan keindahan alam yang dapat membuat liburan Anda semakin berkesan di Banjarpanepen.">
            <ArticleDetailContent article={article} />
        </PageShell>
    );
}
