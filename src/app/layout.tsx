import { Layout } from "@/types/next-types";

import "./globals.css";

const RootLayout: Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
