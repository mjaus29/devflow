import { Code } from "bright";
import { MDXRemote } from "next-mdx-remote/rsc";

Code.theme = {
  light: "github-light",
  dark: "github-dark",
  lightSelector: "html.light",
};

export const Preview = ({ content }: { content: string }) => {
  const formattedContent = content.replaceAll("\\", "").replaceAll("&#x20;", "");

  return (
    <section className="markdown prose max-w-full overflow-hidden wrap-break-word">
      <MDXRemote
        source={formattedContent}
        components={{
          pre: (props) => (
            <Code {...props} lineNumbers className="shadow-light-200 dark:shadow-dark-200 overflow-x-auto" />
          ),
        }}
      />
    </section>
  );
};
