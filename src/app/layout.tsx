import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "./components/TopNav/Nav";
import { CartProvider } from "./context/cartCtx";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = cookies().get("currentUser")?.value;

  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-100`}>
        <CartProvider>
          <Nav tokenAuth={currentUser} />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
