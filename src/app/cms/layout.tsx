import type { Layout } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS",
};

const CmsLayout: Layout = ({ children }) => {
  return (
    <html lang="en" className="cms">
      <body>{children}</body>
    </html>
  );
};

export default CmsLayout;
