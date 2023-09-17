import dynamic from "next/dynamic";

const CmsClient = dynamic(
  () =>
    Promise.all([import("decap-cms-app"), import("@/cms/init")]).then(([{ default: cms }, { cmsInit }]) => () => {
      cmsInit(cms);
      document.documentElement.classList.add("_cms");
      return null;
    }),
  {
    ssr: false,
    loading: ({ error, timedOut }) => {
      if (error) console.error(error);
      return (
        <div className="prose m-auto text-center p-10">
          <h1>{timedOut ? `CMS load timed out.` : error ? `Error loading CMS.` : `Loading CMS...`}</h1>
        </div>
      );
    },
  },
);

export default function CmsPage() {
  return <CmsClient />;
}
