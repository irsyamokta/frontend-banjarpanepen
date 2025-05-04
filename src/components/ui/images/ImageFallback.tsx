import useImageWithFallback from "../../../hooks/useImageWithFallback";

export default function ImageFallback({ src, alt }: { src: string; alt: string }) {
    const thumbnail = useImageWithFallback(src, alt);
    return thumbnail;
}; 