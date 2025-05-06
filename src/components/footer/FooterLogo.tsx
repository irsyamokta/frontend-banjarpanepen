import { Link } from "react-router-dom";
import logoColor from "../../assets/logo/logo-white.png";

const ADDRESS = `Desa Banjarpanepen, Kecamatan Sumpiuh,
Kabupaten Banyumas, Provinsi Jawa Tengah, 53195
Indonesia`;

function FooterLogo() {
    return (
        <div className="text-center md:text-left">
            <div className="flex justify-center md:justify-start items-center mb-4">
                <img src={logoColor} alt="Logo" className="w-65 h-auto mr-3" />
            </div>
            <p className="text-sm md:text-lg whitespace-pre-line">
                <Link to={"https://maps.app.goo.gl/ZQbxnU4aLeh7gjzX6"} target="_blank">
                    {ADDRESS}
                </Link>
            </p>
        </div>
    );
}

export default FooterLogo;