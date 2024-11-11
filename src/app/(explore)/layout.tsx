import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import HomeNavbar from "@/components/home_navbar";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "explore",
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
            <HomeNavbar />
          </header>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
