import { CmsModuleByKey, CmsModuleKey, CmsModule } from "@/cms/api";
import { Fragment } from "react";
import { MarkdownRenderer } from "../MarkdownRenderer/MarkdownRenderer";
import { Image } from "../Image/Image";

const moduleMap = {
  carousel: function CarouselModule({ header, images }) {
    if (!images) return null;
    return (
      <section>
        <h2>{header}</h2>
        {images.map((item, index) => {
          return <Image key={`${index}: ${item.image}`} src={item.image!} alt={item.alt ?? ""} />;
        })}
      </section>
    );
  },
  spotlight: function SpotlightModule({ header, text }) {
    return (
      <section>
        <h2>{header}</h2>
        <p>{text}</p>
      </section>
    );
  },
  richContent: function RichContentModule({ content }) {
    return (
      <section>
        <MarkdownRenderer>{content}</MarkdownRenderer>
      </section>
    );
  },
} as const satisfies { [K in CmsModuleKey]: React.FC<CmsModuleByKey<K>> };

export const ModulesSwitch: React.FC<{ children: CmsModule[] | undefined }> = ({ children }) => {
  if (!children) return null;

  return children.map((mod, index) => {
    const Module = moduleMap[mod.type] as React.FC<CmsModuleByKey<typeof mod.type>>;

    return (
      <Fragment key={index}>
        <Module {...mod} />
      </Fragment>
    );
  });
};
