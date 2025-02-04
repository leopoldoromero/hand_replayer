import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/StyledComponentsRegistry";
import StylesProvider from "@/theme/StylesProvider";
import { HandContextProvider } from "@/contexts/HandContext";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <StylesProvider>
            <HandContextProvider>
              {children}
            </HandContextProvider>
          </StylesProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
