import createTypes from "netlify-ts";
import { cmsCollections } from "./collections";

const types = createTypes({ collections: cmsCollections } as unknown as string);

const lookups = `
export type LOOKUP_ALL={${cmsCollections
  .flatMap((c) => c.files?.map((f) => f.name) ?? c.name)
  .map((n) => `${n}:${n}`)
  .join(";")}};
export type LOOKUP_FILE_COLLECTIONS={${cmsCollections
  .flatMap((c) => (c.files ? ([[c.name, c.files.map((f) => f.name)]] as const) : []))
  .map(([n, f]) => `${n}:"${f.join('"|"')}"`)
  .join(";")}};
`;

const typesPath = `${import.meta.dir}/types-generated.ts`;
await Bun.write(typesPath, [types, lookups].join(""));
console.log(`✅ CMS types generated: ${typesPath}`);
