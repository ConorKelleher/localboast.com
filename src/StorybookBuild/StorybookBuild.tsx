import classes from "./StorybookBuild.module.sass";

interface StorybookBuildProps {
  url: string;
  onChangeIframeRef: (ref: HTMLIFrameElement | null) => void;
  onChangeErrorRef: (ref: HTMLElement | null) => void;
}
/*
unused attempt at making full storybook content sit flat on page
const updateIFrameSize = (iframe: HTMLIFrameElement | null) => {
  if (iframe && !iframe.onload) {
    iframe.onload = () => {
      updateIFrameSize(iframe);
    };
  }
  if (iframe?.contentWindow) {
    iframe.style.minHeight = "100%";
    iframe.style.minWidth = "100%";
    const htmlTag = iframe.contentWindow.document.querySelector("html");
    const bodyTag = iframe.contentWindow.document.body;

    if (!(htmlTag && bodyTag)) {
      return;
    }

    const storybookDocsTag = bodyTag.querySelector("#storybook-docs") as HTMLDivElement | null;
    const storybookPreviewWrapper = bodyTag.querySelector("#storybook-preview-wrapper") as HTMLDivElement | null;

    const contentTag = storybookDocsTag || storybookPreviewWrapper;

    if (contentTag) {
      // let currTag: HTMLElement | null = contentTag;
      // do {
      // currTag.style.height = "fit-content";
      // currTag.style.width = "fit-content";
      // currTag.style.position = "relative";
      //   currTag = currTag.parentElement;
      // } while (currTag);
      if (bodyTag) {
        bodyTag.style.height = `${contentTag.scrollHeight}px`;
        // bodyTag.style.width = `${contentTag.scrollWidth}px`;
      }
    }

    if (bodyTag && bodyTag.scrollHeight) {
      iframe.style.height = `${bodyTag.scrollHeight}px`;
      // iframe.style.width = `${bodyTag.scrollWidth}px`;
      iframe.style.position = "relative";
    }
    if (htmlTag && htmlTag.scrollHeight) {
      iframe.style.height = `${htmlTag.scrollHeight}px`;
      // iframe.style.width = `${htmlTag.scrollWidth}px`;
      iframe.style.position = "relative";
    }

    // const nestedIFrames = iframe.contentWindow.document.querySelectorAll("iframe");
    // nestedIFrames.forEach(updateIFrameSize);
  }
};
*/
const StorybookBuild = (props: StorybookBuildProps) => {
  return (
    <div className={classes.iframeWrapper}>
      <iframe
        width="100%"
        style={{
          minWidth: "100%",
          minHeight: "100%",
        }}
        ref={props.onChangeIframeRef}
        src={props.url}
      />
    </div>
  );
};

export default StorybookBuild;
