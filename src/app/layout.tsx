import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Kathputra-Tact", template: "%s · Kathputra-Tact" },
  description:
    "Therapist workspace for the Kathputra-Tact sensor-embedded therapy puppet.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
