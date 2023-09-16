"use client";

import type { CMS, PreviewTemplateComponentProps } from "decap-cms-core";
import { PagesTemplate } from "../(public)/[slug]/template";
import { HomeTemplate } from "../(public)/template";
import { CmsAnyName, CmsContent } from "./api";
import { createContext, useContext } from "react";
import { useThrottleFn } from "react-use";

const PreviewContext = createContext<PreviewTemplateComponentProps | null>(null);
export const usePreviewContext = () => useContext(PreviewContext);

const previewTemplates = {
  home: HomeTemplate,
  pages: PagesTemplate,
} as const satisfies {
  [K in CmsAnyName]: React.FC<CmsContent<K>>;
};

export const registerPreviewTemplates = (cms: CMS) => {
  for (const key in previewTemplates) {
    const Template = previewTemplates[key as keyof typeof previewTemplates];

    cms.registerPreviewTemplate(key, (previewProps) => {
      const entryData = useThrottleFn((e) => e.get("data").toJS(), 1000, [previewProps.entry]);

      return (
        <PreviewContext.Provider value={previewProps}>
          <Template {...entryData} />
        </PreviewContext.Provider>
      );
    });
  }
};
