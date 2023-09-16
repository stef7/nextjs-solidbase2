"use client";

import { usePreviewContext } from "@/app/cms/preview";
import NextImage, { type ImageProps as NextImageProps } from "next/image";

export type ImageProps = NextImageProps;

export const Image: React.FC<ImageProps> = (props) => {
  const preview = usePreviewContext();
  if (preview && typeof props.src === "string") {
    return <img {...props} src={preview.getAsset(props.src).url} alt={props.alt} />;
  }
  return <NextImage {...props} />;
};
