import { Layout } from "@/types";

const PublicLayout: Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default PublicLayout;
