import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Image, type ImageProps } from "../Image/Image";

export const MarkdownRenderer: React.FC<{
  children: string | undefined;
}> = ({ children }) => {
  if (!children) return null;
  return (
    <div className="prose">
      <ReactMarkdown
        components={{
          a: ({ node, ...props }) => {
            if (props.href) return <Link {...props} href={props.href} />;
            return <a {...props} />;
          },
          img: ({ node, ...props }) => {
            return <Image {...(props as ImageProps)} alt={props.alt ?? ""} />;
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};
