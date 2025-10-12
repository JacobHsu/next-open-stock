import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import {searchStocks} from "@/lib/actions/finnhub.actions";

const Header = async () => {
    const initialStocks = await searchStocks();

    return (
        <header className="sticky top-0 header">
            <div className="container header-wrapper">
                <Link href="/" className="flex items-center justify-center gap-2">
                    <Image
                        src="https://i.ibb.co/r28VWPjS/Screenshot-2025-10-04-123317-Picsart-Ai-Image-Enhancer-removebg-preview.png"
                        alt="OpenStock"
                        width={200}
                        height={50}
                    />
                </Link>
                <nav className="w-full sm:w-auto">
                    <NavItems initialStocks={initialStocks}/>
                </nav>
            </div>
        </header>
    )
}
export default Header