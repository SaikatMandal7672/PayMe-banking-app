import Navbar from "@/components/ui/Navbar";
import Sidebar from "./_components/Sidebar";
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />
      <div className="mt-14 flex flex-1 h-full ">
        <Sidebar />
        <div className="flex-1 bg-magnolia-300 overflow-auto ml-0 md:ml-48">{children}</div>
      </div>
    </div>
  );
}
