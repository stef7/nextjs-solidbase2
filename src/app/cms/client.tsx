"use client";

import { cmsConfig } from "./config";
import { useEffect, useState } from "react";
import { registerPreviewTemplates } from "./preview";

export const CmsClient: React.FC = () => {
  const [cms, setCms] = useState<(typeof import("decap-cms-app"))["default"] | null>();

  useEffect(() => {
    import("decap-cms-app")
      .then((module) => {
        setCms(module.default);
      })
      .catch((error) => {
        console.error(error);
        setCms(null);
      });
  }, []);

  useEffect(() => {
    if (!cms || cms instanceof Error) return;

    registerPreviewTemplates(cms);

    cms.init({ config: cmsConfig });
  }, [cms]);

  return cms ? null : <h1>{cms === null ? "Error loading CMS." : "Loading CMS..."}</h1>;
};
