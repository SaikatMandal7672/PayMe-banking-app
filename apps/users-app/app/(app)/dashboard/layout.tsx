import Navbar from "@/components/ui/Navbar";
import Sidebar from "./_components/Sidebar";
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />
      <div className="mt-14 flex flex-1 h-full bg-magnolia-300">
        <Sidebar />
        <div className="flex-1 h-full">{children}</div>
      </div>
    </div>
  );
}
