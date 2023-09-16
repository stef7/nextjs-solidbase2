import { Image } from "@/components/Image/Image";
import { MarkdownRenderer } from "@/components/MarkdownRenderer/MarkdownRenderer";
import { Template } from "@/types";

export const HomeTemplate: Template<"home"> = (data) => {
  return (
    <>
      <h1 data-testid="home page">Home</h1>
      <Image src={data.image} alt="Home" width={200} height={150} />
      <MarkdownRenderer>{data.markdown}</MarkdownRenderer>
    </>
  );
};
