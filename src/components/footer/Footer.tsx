import FooterLogo from "./FooterLogo";
import FooterContact from "./FooterContact";
import FooterGallery from "./FooterGallery";
import FooterCopyright from "./FooterCopyright";

function Footer() {
    return (
        <footer id="footer" className="bg-[#212529] text-[#ADB5BD] py-10 w-full mt-25">
            <div className="w-full px-6 md:px-12 lg:px-25">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FooterLogo />
                    <FooterContact />
                    <FooterGallery />
                </div>
                <FooterCopyright />
            </div>
        </footer>
    );
}

export default Footer;
