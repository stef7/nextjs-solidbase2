import type { CMS, PreviewTemplateComponentProps } from "decap-cms-core";
import { CmsPreviewable, CmsContent } from "./api";
import React, { createContext, useContext } from "react";
import { useThrottleFn } from "react-use";
import RootSlugPage from "@/pages/[[...slug]]";
import { usePreviewStyles } from "./preview-styles";

const templateMap: { [K in CmsPreviewable]: React.FC<CmsContent<K>> } = {
  pagesNested: RootSlugPage,
};

const PreviewContext = createContext<PreviewTemplateComponentProps | null>(null);
export const usePreviewContext = () => useContext(PreviewContext);

export const registerPreviewTemplates = (cms: CMS) => {
  for (const collectionName in templateMap) {
    const Template = templateMap[collectionName as CmsPreviewable];

    cms.registerPreviewTemplate(collectionName, function Renderer(previewProps) {
      usePreviewStyles(previewProps.document);

      const entryProps = useThrottleFn((e) => e.get("data").toJS(), 500, [previewProps.entry]);

      return (
        <PreviewContext.Provider value={previewProps}>
          <Template {...entryProps} />
        </PreviewContext.Provider>
      );
    });
  }
};
