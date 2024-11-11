export const metadata = {
  title: "oops",
  description: "we couldn't find the page you were looking for",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
