/* eslint-disable */
/* tslint:disable */

export interface pagesNested_modules_carousel_images {
  image: string;
  alt: string;
}

export interface pagesNested_modules_carousel {
  type: "carousel";
  header: string;
  images: pagesNested_modules_carousel_images[];
}

export interface pagesNested_modules_spotlight {
  type: "spotlight";
  header: string;
  text: string;
}

export interface pagesNested_modules_richContent {
  type: "richContent";
  content: string;
}

export interface pagesNested {
  title: string;
  modules: (pagesNested_modules_carousel | pagesNested_modules_spotlight | pagesNested_modules_richContent)[];
}

export type LOOKUP_ALL = { pagesNested: pagesNested };
export type LOOKUP_PREVIEWABLE = "pagesNested";
export type LOOKUP_NESTED_FOLDERS = "pagesNested";
export type LOOKUP_FILE_COLLECTIONS = {};
