"use client";

import type { CmsConfig } from "decap-cms-core";
import { cmsCollections } from "./collections";

export const cmsConfig: CmsConfig = {
  backend: {
    name: "github",
    repo: `${process.env.VERCEL_GIT_REPO_OWNER}/${process.env.VERCEL_GIT_REPO_SLUG}`,
  },
  local_backend: true,
  load_config_file: false,
  media_folder: "public/cms-uploads",
  public_folder: "/cms-uploads",
  site_url: location.origin,
  slug: {
    encoding: "ascii",
    clean_accents: true,
  },
  collections: cmsCollections,
};
