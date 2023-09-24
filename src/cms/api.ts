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

function getCmsFolderFileSlugs(folderName: CmsNestedFolderName): string[][];
function getCmsFolderFileSlugs(folderName: CmsFlatFolderName): string[];
function getCmsFolderFileSlugs<C extends CmsFolderName>(folderName: C): string[][] | string[] {
  const c = cmsCollections.find((c) => c.name === folderName && c.folder);
  if (!c?.folder) throw new Error(`no match for ${folderName}`);

  const cwd = fsj.cwd(c.folder);
  return c.nested
    ? cwd.find("./").map((path) =>
        path
          .replace(/[/\\]?index\.json$/, "")
          .split(/[/\\]/g)
          .filter(Boolean),
      )
    : cwd.list()?.map((path) => path.replace(/\.json$/, "")) ?? [];
}
export { getCmsFolderFileSlugs };

type GetCmsContentParams =
  | [nestedFolderName: CmsNestedFolderName, nestedFolderFilePath: string[]]
  | [flatFolderName: CmsFlatFolderName, flatFolderFilePath: string]
  | [fileName: CmsFileName];

const getCmsContentPath = (...params: GetCmsContentParams) => {
  for (const { name, folder, files } of cmsCollections) {
    // if params.length is 2, this is a folder-collection; else it's a file-collection file
    if (params.length === 2) {
      // if params[1] is array, this is a nested folder
      const pathInFolder = Array.isArray(params[1]) ? [...params[1], "index"].join("/") : params[1];
      if (folder && name === params[0]) return `${folder}/${pathInFolder}.json`;
    } else {
      const file = files?.find((f) => f.name === params[0]);
      if (file?.file) return file.file;
    }
  }
  throw new Error(`no match for ${params}`);
};

export const getCmsContent = <P extends GetCmsContentParams>(...params: P) => {
  const path = getCmsContentPath(...params);
  const string = fsj.read(path);
  return string ? (JSON.parse(string) as CmsContent<(typeof params)[0]>) : undefined;
};
