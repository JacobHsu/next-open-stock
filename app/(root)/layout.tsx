import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Layout = async ({ children }: { children : React.ReactNode }) => {
    return (
        <main className="min-h-screen text-gray-400">
            <Header />

            <div className="container py-10">
                {children}
            </div>

            <Footer />
        </main>
    )
}
export default Layout