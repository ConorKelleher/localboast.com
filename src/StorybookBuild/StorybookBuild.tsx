import classes from "./StorybookBuild.module.sass";

interface StorybookBuildProps {
  url: string;
  onChangeIframeRef: (ref: HTMLIFrameElement | null) => void;
  onChangeErrorRef: (ref: HTMLElement | null) => void;
}
const StorybookBuild = (props: StorybookBuildProps) => {
  return (
    <div className={classes.iframeWrapper}>
      <iframe ref={props.onChangeIframeRef} style={{ height: "100%", width: "100%" }} src={props.url} />
      <h1 ref={props.onChangeErrorRef} style={{ display: "none", color: "purple", position: "absolute", inset: 0 }}>
        If you're seeing this, then storybook isn't loading correctly - must be built separately
      </h1>
    </div>
  );
};

export default StorybookBuild;
