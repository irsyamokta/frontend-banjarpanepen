import PageMeta from "../../components/common/PageMeta";
import Hero from "../../components/common/Hero";

import heroImage from "../../assets/img/img-hero-artikel.png";
import ArticleSection from "../../components/section/article/ArticleSection";

export default function ClientArticle() {
    return (
        <>
            <PageMeta
                title="Artikel"
                description="Artikel"
            />
            <div className="flex flex-col">
                <Hero
                    title="Menjelajah Lewat Tulisan"
                    subtitle={`Baca kisah-kisah menarik, panduan perjalanan, serta informasi budaya yang \nmemperkenalkan lebih dalam kehangatan dan kekayaan Desa Banjarpanepen`}
                    image={heroImage}
                    heightClass="h-[60vh]"
                    showButton={false}
                />
                <ArticleSection />
            </div>
        </>
    );
}