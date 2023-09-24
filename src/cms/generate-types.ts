import createTypes from "netlify-ts";
import { cmsCollections } from "./collections";

const types = createTypes({ collections: cmsCollections } as unknown as string);

const generated = cmsCollections.map((c) => c.files ?? [c]).flat();

const lookups = `
export type LOOKUP_ALL={${generated.map(({ name: n }) => `${n}:${n}`).join(";")}};
export type LOOKUP_PREVIEWABLE=${generated
  .filter((c) => c.preview_path)
  .map((c) => `"${c.name}"`)
  .join("|")};
export type LOOKUP_NESTED_FOLDERS=${cmsCollections
  .filter((c) => c.nested)
  .map((c) => `"${c.name}"`)
  .join("|")};
export type LOOKUP_FILE_COLLECTIONS={${cmsCollections
  .filter((c) => c.files)
  .map((c) => `${c.name}:"${c.files!.map((f) => f.name).join('"|"')}"`)
  .join(";")}};
`;

const typesRelative = `./types-generated.ts`;
const typesPath = import.meta.resolveSync(typesRelative);
await Bun.write(typesPath, [types, lookups].join(""));

const CYAN = `\x1b[36m`;
const RESET = `\u001B[0m`;
console.log(`${CYAN}CMS types generated:${RESET} ${typesPath}`);
