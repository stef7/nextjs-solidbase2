import * as fsj from "fs-jetpack";
import { cmsCollections } from "./collections";
import { LOOKUP_ALL, LOOKUP_FILE_COLLECTIONS, LOOKUP_NESTED_FOLDERS, LOOKUP_PREVIEWABLE } from "./types-generated";

type DeepPartialExcept<T, E> = { [P in Exclude<keyof T, E>]?: DeepPartial<T[P], E> } & Pick<T, E & keyof T>;
type DeepPartial<T, Except = "type"> = T extends any[]
  ? DeepPartial<T[number], Except>[]
  : T extends object
  ? DeepPartialExcept<T, Except>
  : T;

type CmsAnyName = string & keyof LOOKUP_ALL;
type CmsFileName = CmsAnyName & LOOKUP_FILE_COLLECTIONS[keyof LOOKUP_FILE_COLLECTIONS];
type CmsFolderName = Exclude<CmsAnyName, CmsFileName>;
type CmsNestedFolderName = LOOKUP_NESTED_FOLDERS;
type CmsFlatFolderName = Exclude<CmsFolderName, CmsNestedFolderName>;

export type CmsContent<N extends CmsAnyName> = DeepPartial<LOOKUP_ALL[N]>;

type CmsModuleBase = Extract<LOOKUP_ALL[CmsAnyName], { modules: any[] }>["modules"][number];
export type CmsModule = DeepPartial<CmsModuleBase>;
export type CmsModuleKey = CmsModuleBase["type"];
export type CmsModuleByKey<K extends CmsModuleKey> = Extract<CmsModule, { type: K }>;

export type CmsPreviewable = CmsAnyName & LOOKUP_PREVIEWABLE;

type GetCmsContentParams =
  | [nestedFolderName: CmsNestedFolderName, folderFilePath: string[]]
  | [flatFolderName: CmsFlatFolderName, folderFilePath: string]
  | [fileName: CmsFileName];

const getCmsContentPath = (...params: GetCmsContentParams) => {
  for (const { name, folder, files } of cmsCollections) {
    if (params.length === 2) {
      const pathInFolder = Array.isArray(params[1]) ? [...params[1], "index"].join("/") : params[1];
      if (folder && name === params[0]) return `${folder}/${pathInFolder}.json`;
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
      const paths = fsj.list(folder);
      return paths?.map((p) => p);
    }
  }
  throw new Error(`no match for ${folderName}`);
};

export const getCmsContent = <P extends GetCmsContentParams>(...params: P) => {
  const path = getCmsContentPath(...params);
  const string = fsj.read(path);
  return string ? (JSON.parse(string) as CmsContent<(typeof params)[0]>) : undefined;
};
