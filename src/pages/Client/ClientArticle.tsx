import PageMeta from "../../components/common/PageMeta";
import Hero from "../../components/common/Hero";

import heroImage from "../../assets/img/img-hero-artikel.png";
import ArticleSection from "../../components/section/article/ArticleSection";

export default function ClientArticle() {
    return (
        <>
            <PageMeta
                title="Artikel"
                description="Baca artikel menarik seputar wisata, budaya, dan kehidupan di Banjarpanepen. Temukan panduan perjalanan dan kisah inspiratif yang memperkenalkan keindahan desa Banjarpanepen."
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