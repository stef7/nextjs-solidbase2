import { readdirSync, readFileSync } from "fs";
import { cmsCollections } from "./collections";
import { LOOKUP_ALL, LOOKUP_FILE_COLLECTIONS } from "./types-generated";

export type CmsAnyName = string & keyof LOOKUP_ALL;
export type CmsFileName = CmsAnyName & LOOKUP_FILE_COLLECTIONS[keyof LOOKUP_FILE_COLLECTIONS];
export type CmsFolderName = Exclude<CmsAnyName, CmsFileName>;
export type CmsContent<N extends CmsAnyName> = LOOKUP_ALL[N];

type GetCmsContentParams = [folderName: CmsFolderName, folderFilePath: string] | [fileName: CmsFileName];

const getCmsContentPath = (...params: GetCmsContentParams) => {
  for (const { name, folder, files } of cmsCollections) {
    if (params.length === 2) {
      if (folder && name === params[0]) return `${folder}/${params[1]}.json`;
    } else {
      const file = files?.find((f) => f.name === params[0]);
      if (file?.file) return file.file;
    }
  }
  throw new Error(`no match for ${params}`);
};

export const getCmsFolderFileSlugs = (folderName: CmsFolderName) => {
  for (const { name, folder } of cmsCollections) {
    if (folder && name === folderName) {
      const paths = readdirSync(folder);
      return paths.map((p) => p);
    }
  }
  throw new Error(`no match for ${folderName}`);
};

export const getCmsContent = <P extends GetCmsContentParams>(...params: P) => {
  const path = getCmsContentPath(...params);
  const string = readFileSync(path, { encoding: "utf8" });
  return JSON.parse(string) as CmsContent<(typeof params)[0]>;
};
