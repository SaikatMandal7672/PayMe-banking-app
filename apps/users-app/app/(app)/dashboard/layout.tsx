import Navbar from "@/components/ui/Navbar";
import Sidebar from "./_components/Sidebar";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-purple-100">
      <Navbar />
      <div className="mt-14 flex">
        <Sidebar />
        {children}

      </div>
    </div>
  );
}
