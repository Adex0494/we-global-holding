import Navbar from "@/components/Navbar";
import StyledComponentsRegistry from "@/lib/registry";
import "./globals.css";

export const metadata = {
  title: "WE Global Holding Inc.",
  description: "Bridging global innovation, investment & growth.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-dark-primary text-white">
        <StyledComponentsRegistry>
          <Navbar />
          <div>{children}</div>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
