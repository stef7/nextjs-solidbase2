"use client";

import { Page } from "@/types";
import dynamic from "next/dynamic";

const CmsClient = dynamic(() => import("./client").then((m) => m.CmsClient), { ssr: false });

const CmsPage: Page = () => {
  return <CmsClient />;
};

export default CmsPage;
