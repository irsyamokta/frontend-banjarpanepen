import PageMeta from "../../components/common/PageMeta";
import ArticleCard from "../../components/cards/ArticleCard";

export default function Article() {
    return (
        <>
            <PageMeta
                title="Artikel"
                description="Artikel"
            />
            <div className="grid grid-cols-1 gap-4 md:gap-6">
                <ArticleCard />
            </div>
        </>
    );
}