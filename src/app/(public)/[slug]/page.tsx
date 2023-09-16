import { getCmsContent, getCmsFolderFileSlugs } from "@/app/cms/api";
import { Page } from "@/types";
import { PagesTemplate } from "./template";

export const generateStaticParams = async () => {
  return getCmsFolderFileSlugs("pages");
};

const PagesPage: Page<{ params: { slug: string } }> = async ({ params }) => {
  const data = getCmsContent("pages", params.slug);
  return <PagesTemplate {...data} />;
};
export default PagesPage;
