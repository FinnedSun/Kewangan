export const metadata = {
  icons: [
    {
      url: "/logo-ori.svg",
      href: "/logo-ori.svg"
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
