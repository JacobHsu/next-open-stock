import Link from "next/link";
import Image from "next/image";
import OpenDevSocietyBranding from "./OpenDevSocietyBranding";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white border-t border-gray-800">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Copyright */}
                    <div className="text-gray-400 text-sm mb-2 md:mb-0">
                        © {new Date().getFullYear()} Open Dev Society. All rights reserved.
                    </div>

                    {/* Open Dev Society Branding */}
                    <div className="flex items-center space-x-2">
                        <OpenDevSocietyBranding />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
