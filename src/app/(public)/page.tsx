import { Page } from "@/types";
import { getCmsContent } from "@/app/cms/api";
import { HomeTemplate } from "./template";

const HomePage: Page = async () => {
  const data = getCmsContent("home");
  return <HomeTemplate {...data} />;
};
export default HomePage;
