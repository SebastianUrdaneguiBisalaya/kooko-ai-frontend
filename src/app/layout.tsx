import type { Metadata } from "next";
import { ReactQueryClientProvider } from "@/providers/ReactQueryClientProvider";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";


const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "kooko.ai | Automatización del registro de boletas y/o facturas con AI.",
  description: "Automatización del registro de bolets y/o facturas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
			<html lang="en">
				<body
					className={`${bricolageGrotesque.variable} antialiased`}
				>
					{children}
				</body>
			</html>
		</ReactQueryClientProvider>
  );
}
