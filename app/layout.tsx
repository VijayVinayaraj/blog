'use client'
import { theme } from "@/common/theme"
import { Oxygen } from "next/font/google";
import { ThemeUIProvider } from "theme-ui"



const oxygen = Oxygen({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {


	return (
		<html lang="n" className={oxygen.className}>
			<ThemeUIProvider theme={theme}>

				<body>{children}</body>
			</ThemeUIProvider>
		</html>

	)
}
