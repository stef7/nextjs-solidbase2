import { MarkdownRenderer } from "@/components/MarkdownRenderer/MarkdownRenderer";
import { Template } from "@/types";

export const PagesTemplate: Template<"pages"> = (data) => {
  return (
    <>
      <h1 data-testid="pages page">{data.title}</h1>
      <MarkdownRenderer>{data.markdown}</MarkdownRenderer>
    </>
  );
};
