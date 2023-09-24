import { getCmsContent } from "@/cms/api";
import { ModulesSwitch } from "@/components/ModulesSwitch/ModulesSwitch";
import { InferGetStaticPathsParams } from "@/types";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticPaths = (async () => {
  return {
    paths: [{ params: { slug: ["one"] } }],
    fallback: "blocking",
  };
}) satisfies GetStaticPaths<{ slug?: string[] }>;

export const getStaticProps = (async ({ params }) => {
  const slug = params?.slug ?? [];
  // if last segment is 'index', may be link from CMS preview path, so redirect to URI without
  if (slug.at(-1) === "index") {
    slug.pop();
    return { redirect: { permanent: false, destination: `/${slug.join("/")}` } };
  }

  const page = getCmsContent("pagesNested", slug);
  if (!page) return { notFound: true };

  return { props: page };
}) satisfies GetStaticProps<any, InferGetStaticPathsParams<typeof getStaticPaths>>;

export default function RootSlugPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <section className="p-8" data-testid="RootSlugPage">
      <ModulesSwitch>{props.modules}</ModulesSwitch>

      <pre className="whitespace-pre-wrap">{JSON.stringify({ props }, null, 2)}</pre>
    </section>
  );
}
