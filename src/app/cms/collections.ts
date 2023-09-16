import type { CmsCollection } from "decap-cms-core";

const getContentPath = (...path: string[]) => `cms-content/${path.join("/")}`;

export const cmsCollections: CmsCollection[] = [
  {
    format: "json",
    name: "pages",
    label: "Pages",
    label_singular: "Page",
    folder: getContentPath("pages"),
    create: true,
    fields: [
      {
        name: "title",
        required: true,
        widget: "string",
      },
      {
        name: "markdown",
        widget: "markdown",
      },
    ],
  },
  {
    format: "json",
    name: "pagesSpecial",
    label: "Special Pages",
    label_singular: "Special Page",
    files: [
      {
        name: "home",
        label: "Home",
        file: getContentPath("pagesSpecial", "home.json"),
        fields: [
          {
            name: "image",
            widget: "image",
          },
          {
            name: "markdown",
            widget: "markdown",
          },
        ],
      },
    ],
  },
];
// as const satisfies readonly CmsCollection[];
