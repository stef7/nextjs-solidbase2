import { CmsAnyName, CmsContent } from "@/app/cms/api";
import type { NextPage } from "next";
import type { PropsWithChildren } from "react";
import React from "react";

export type Template<N extends CmsAnyName> = React.FC<CmsContent<N>>;

export type Page<P = {}> = NextPage<P>;

export type Layout<P = {}> = NextPage<PropsWithChildren<P>>;
