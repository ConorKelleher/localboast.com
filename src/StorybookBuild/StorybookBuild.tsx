import { useRef } from "react";
// import storybookUrl from "../assets/storybook-static/index.html?url";
import classes from "./StorybookBuild.module.sass";

const StorybookBuild = () => {
  const iframeRef = useRef<HTMLIFrameElement | null>();
  const errorRef = useRef<HTMLHeadingElement | null>();

  const onChangeIframe = (ref: HTMLIFrameElement | null) => {
    if (!ref) {
      return;
    }
    iframeRef.current = ref;

    ref.onload = () => {
      if (errorRef.current && !ref.contentWindow?.document.getElementById("root")) {
        errorRef.current.style.display = "unset";
      }
    };
  };

  return (
    <div className={classes.iframeWrapper}>
      <iframe ref={onChangeIframe} style={{ height: "100%", width: "100%" }} src="assets/storybook-static/index.html" />
      <h1
        ref={(ref) => (errorRef.current = ref)}
        style={{ display: "none", color: "purple", position: "absolute", inset: 0 }}
      >
        static build at project root (ideally symlinked from the other repo)
      </h1>
    </div>
  );
};

export default StorybookBuild;
