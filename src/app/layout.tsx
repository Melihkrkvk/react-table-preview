import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import "@mantine/core/styles.css";
import "@/src/components/globals.css";

import { theme } from "@/theme";

export const metadata = {
  title: "Mantine React Table",
  description: "Preview Mantine React Table.",
};

export default async function RootLayout({ children }: { children: any }) {
  return (
    <html lang={"en"}>
      <head>
        <ColorSchemeScript />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
