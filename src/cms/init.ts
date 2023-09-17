import type { CMS } from "decap-cms-core";
import { cmsConfig } from "@/cms/config";
import { registerPreviewTemplates } from "@/cms/preview";

let initialised = false;

export const cmsInit = (cms: CMS) => {
  if (!initialised) initialised = true;
  else return console.warn("CMS already initialised.");

  registerPreviewTemplates(cms);

  cms.init({ config: cmsConfig });

  return null;
};
