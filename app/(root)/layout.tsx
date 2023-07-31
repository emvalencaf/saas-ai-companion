
// custom components
import Navbar from "@/components/Navbar";

// interfaces
export interface IRootLayoutProps {
    children: React.ReactNode;
}

const RootLayout: React.FC<IRootLayoutProps> = ({ children }) => {
    return (
        <div className="h-full">
            <Navbar />
            <main className="md:pl-20 pt-16 h-full">{children}</main>
        </div>
    );
};

export default RootLayout;
