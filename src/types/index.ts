/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { ParsedUrl } from "next/dist/shared/lib/router/utils/parse-url";

export type InferGetStaticPathsParams<T extends (args: any) => any> = (Extract<
  Awaited<ReturnType<T>>,
  { paths: (string | { params: ParsedUrl["query"] })[] }
>["paths"][number] &
  object)["params"];
