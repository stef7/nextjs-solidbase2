import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

type Params = { slug?: string[] };

export const getStaticPaths = (async () => {
  return {
    paths: [
      { params: { slug: [] } },
      { params: { slug: ["one"] } },
      { params: { slug: ["one", "two"] } },
      { params: { slug: ["three"] } },
    ],
    fallback: "blocking",
  };
}) satisfies GetStaticPaths<Params>;

export const getStaticProps = (async ({ params }) => {
  if (params?.slug?.[0] === "404") return { notFound: true };
  return { props: { params } };
}) satisfies GetStaticProps<any, Params>;

export default function RootSlugPage({ params }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <pre className="p-8" data-testid="RootSlugPage">
      {JSON.stringify({ params })}
    </pre>
  );
}
