import galleryImage1 from "../../assets/img/img-galeri-1.png";
import galleryImage2 from "../../assets/img/img-galeri-2.png";

const IMAGES = [galleryImage1, galleryImage2, galleryImage2, galleryImage1];

function FooterGallery() {
    return (
        <div className="text-center justify-center md:justify-self-end md:text-left">
            <h4 className="text-lg md:text-xl text-gray-100 font-bold mb-4">Galeri</h4>
            <div className="grid grid-cols-2 gap-4">
                {IMAGES.map((image, index) => (
                    <div key={index} className="overflow-hidden">
                        <img
                            src={image}
                            alt={`Gallery Image ${index + 1}`}
                            className="w-full object-cover aspect-5/4 rounded-xl"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FooterGallery;