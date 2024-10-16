import CopyBtn from "@/components/dashborad/CodeCopyBtn";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = ({
  params,
}: {
  params: {
    formId: string;
  };
}) => {
  if (!params.formId) return <div>Invalid Project ID</div>;

  return (
    <div className="mt-10">
      <h1 className="md:text-4xl  mb-2 text-2xl text-white">
        How to Implement the <span className="text-blue-500">Widget</span> on
        Your Website
      </h1>
      <p className="md:text-lg text-sm text-slate-200">
        To start collecting feedback using the widget, follow these step to
        embed it into your site:
      </p>

      <div className="mt-6 text-white">
        <h2 className="md:text-2xl  font-bold">
          Step 1: Embed the Widget Code
        </h2>
        <p className="md:text-lg text-sm text-slate-200">
          Place the following code snippet inside the {"<head>"} or at the end
          of the {"<body>"} of your HTML file:
        </p>
      </div>
      <div className="bg-blue-950  md:p-7 p-3 rounded-md mt-6 relative max-w-4xl">
        <code className=" text-white">
          <span className="font-mono md:text-lg text-sm">{`<my-widget project="${params.formId}"></my-widget>`}</span>
          <br />
          <br />
          <span className="font-mono md:text-lg text-sm">{`<script src="https://quickfeedwidget.netlify.app/widget.js"></script>`}</span>
        </code>
        <CopyBtn
          text={`<my-widget project="${params.formId}"></my-widget>\n<script src="https://quickfeedwidget.netlify.app/widget.js"></script>`}
        />
      </div>

      <Link href={`/projects/${params.formId}/`}>
        <Button className="bg-blue-500 hover:bg-blue-600 hover:scale-105 mt-6">
          Start Collecting Feedback
        </Button>
      </Link>
    </div>
  );
};

export default page;
