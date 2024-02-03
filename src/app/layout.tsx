import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "./components/TopNav/Nav";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div>
          <Nav />
        </div>
        {children}
      </body>
    </html>
  );
}
