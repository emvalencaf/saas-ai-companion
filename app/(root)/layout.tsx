// custom components
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

// interfaces
export interface IRootLayoutProps {
    children: React.ReactNode;
}

const RootLayout: React.FC<IRootLayoutProps> = ({ children }) => {
    return (
        <div className="h-full">
            <Navbar />
            <div className="hidden md:flex mt-16 h-full w-20 flex-col fixed inset-y-0">
                <Sidebar />
            </div>
            <main className="md:pl-20 pt-16 h-full">{children}</main>
        </div>
    );
};

export default RootLayout;
