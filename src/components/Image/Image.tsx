import { usePreviewContext } from "@/cms/preview";
import NextImage, { type ImageProps as NextImageProps } from "next/image";

export type ImageProps = NextImageProps;

type SharedKeys = "src" | "alt";
type PossibleImageProps = Omit<ImageProps, SharedKeys> & Pick<JSX.IntrinsicElements["img"] | ImageProps, SharedKeys>;

export const Image: React.FC<ImageProps> = (props) => {
  const { src, alt, width, height } = props as PossibleImageProps;

  const preview = usePreviewContext();

  if (preview && typeof src !== "object" && src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} src={src && preview.getAsset(src).url} alt={alt} />;
  }

  if (typeof src === "object" || (typeof src === "string" && width && height)) {
    return <NextImage {...props} src={src} alt={alt ?? ""} {...{ width, height }} />;
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} src={src} alt={alt} />;
};
