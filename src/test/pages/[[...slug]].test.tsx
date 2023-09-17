import { describe, expect, it } from "bun:test";
import { render, screen } from "@/test/utils";
import RootSlugPage, { getStaticPaths, getStaticProps } from "@/pages/[[...slug]]";

describe(RootSlugPage.name, () => {
  it("renders", async () => {
    render(<RootSlugPage params={{ slug: ["one", "two"] }} />);

    expect(screen.getByText('{"params":{"slug":["one","two"]}}')).toBeTruthy();
  });

  describe(getStaticPaths.name, () => {
    it("returns paths", async () => {
      const result = await getStaticPaths();
      expect(result.paths.every((item) => item.params.slug.every((segment) => typeof segment === "string"))).toBeTrue();
      expect(result).toMatchObject({
        fallback: "blocking",
        paths: expect.any(Array),
      });
    });
  });

  describe(getStaticProps.name, () => {
    it("returns props for params", async () => {
      const params = { slug: ["one", "two"] };
      const result = await getStaticProps({ params });
      expect(result).toStrictEqual({ props: { params } });
    });
  });
});
