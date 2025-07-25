import { formatDateTime } from "../../../utils/dateFormatter";

import { FiCalendar, FiUser } from "react-icons/fi";
import ImageFallback from "../../ui/images/ImageFallback";

import { createMarkup } from "../../../utils/htmlMarkup";

interface Article {
    title: string;
    content?: string;
    thumbnail: string;
    created_at: string;
    writer: string;
}

interface ArticleDetailContentProps {
    article: Article;
}

export default function ArticleDetailContent({ article }: ArticleDetailContentProps) {
    return (
        <>
            {/* Thumbnail */}
            <div className="w-full h-64 md:h-96 overflow-hidden rounded-xl">
                <ImageFallback
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    fallbackClassName="h-full object-cover"
                />
            </div>

            {/* Title + Location + About + InfoCard */}
            <div className="flex flex-col md:flex-row gap-6">
                {/* About */}
                <div className="flex-1">
                    <h1 className="text-2xl md:text-title-md font-bold mb-3 md:mb-5">
                        {article.title}
                    </h1>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-5">
                        <p className="flex text-sm text-gray-600 md:mb-4">
                            <FiCalendar
                                className="mr-3 w-5 h-5 text-primary"
                            />
                            {formatDateTime(article.created_at)}
                        </p>
                        <p className="flex text-sm text-gray-600 md:mb-4">
                            <FiUser
                                className="mr-3 w-5 h-5 text-primary"
                                size={20}
                            />
                            {article.writer}
                        </p>
                    </div>
                    <hr className="mt-4 sm:mt-0 mb-4 border-t-2" />
                    <div
                        className="prose text-base leading-relaxed text-gray-800"
                        dangerouslySetInnerHTML={createMarkup(article.content || "")}
                    />
                </div>
            </div>
        </>
    );
}
