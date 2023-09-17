import type { CmsCollection, CmsField, CmsFieldList } from "decap-cms-core";

const getContentPath = (...path: string[]) => `cms-content/${path.join("/")}`;

const modules: CmsFieldList["types"] = [
  {
    name: "carousel",
    label: "Carousel",
    widget: "object",
    summary: "{{fields.header}}",
    fields: [
      {
        label: "Header",
        name: "header",
        widget: "string",
        default: "Image Gallery",
      },
      {
        label: "Images",
        name: "images",
        widget: "list",
        fields: [
          {
            label: "Image",
            name: "image",
            widget: "image",
          },
          {
            label: "Alternative Text",
            name: "alt",
            widget: "string",
          },
        ],
      },
    ],
  },
  {
    name: "spotlight",
    label: "Spotlight",
    widget: "object",
    fields: [
      {
        label: "Header",
        name: "header",
        widget: "string",
      },
      {
        label: "Text",
        name: "text",
        widget: "text",
      },
    ],
  },
  {
    name: "richContent",
    label: "Rich Content",
    widget: "object",
    fields: [
      {
        label: "Content",
        name: "content",
        widget: "markdown",
      },
    ],
  },
];

const modulesField: CmsField = {
  name: "modules",
  widget: "list",
  label: "Modules",
  label_singular: "Module",
  types: modules,
};

export const cmsCollections: CmsCollection[] = [
  {
    format: "json",
    name: "pagesNested",
    label: "Nested Pages",
    label_singular: "Nested Page",
    folder: getContentPath("pagesNested"),
    create: true,
    preview_path: "{{dirname}}/{{filename}}",
    nested: {
      depth: 100,
    },
    meta: { path: { widget: "string", label: "Path", index_file: "index" } },
    fields: [
      {
        name: "title",
        required: true,
        widget: "string",
      },
      modulesField,
    ],
  },
];
