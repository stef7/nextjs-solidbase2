/* eslint-disable */
/* tslint:disable */

export interface pages {
  title: string;
  markdown: string;
}

export interface home {
  image: string;
  markdown: string;
}

export type LOOKUP_ALL = { pages: pages; home: home };
export type LOOKUP_FILE_COLLECTIONS = { pagesSpecial: "home" };
