import { Layout } from "@/types/next-types";

const RootLayout: Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
