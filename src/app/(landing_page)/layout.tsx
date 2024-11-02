import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/COOL_navbar";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "quoio",
  description: "The straightforward way to learn a language",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Toaster richColors position="top-right" closeButton />
        <body>
          <header>
            <Navbar />
          </header>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
