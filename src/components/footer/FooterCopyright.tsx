function FooterCopyright() {
    return (
        <div className="bg-[#212529] text-[#ADB5BD] pt-6 border-t border-gray-700 text-center mt-8">
            <p className="text-sm md:text-lg">
                © {new Date().getFullYear()} Desa Banjarpanepen. Hak Cipta Dilindungi oleh Telkom University
                Purwokerto.
            </p>
        </div>
    );
}

export default FooterCopyright;  