import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";

async function generateSitemap() {
    const sitemap = new SitemapStream({ hostname: "https://visitbapen.com/" });

    const pages = [
        { url: "/", changefreq: "daily", priority: 1.0 },
    ];

    pages.forEach((page) => sitemap.write(page));
    sitemap.end();

    const data = await streamToPromise(sitemap);
    createWriteStream("./public/sitemap.xml").write(data);
}

generateSitemap();