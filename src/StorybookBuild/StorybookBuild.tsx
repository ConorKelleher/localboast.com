import { useEffect, useRef, useState } from "react";
import classes from "./StorybookBuild.module.sass";
import { useLocation, useNavigate } from "react-router-dom";

const baseUrl = "assets/storybook-static/index.html";

const StorybookBuild = () => {
  const iframeRef = useRef<HTMLIFrameElement | null>();
  const errorRef = useRef<HTMLHeadingElement | null>();
  const location = useLocation();
  const query = location.search;
  const navigate = useNavigate();
  const queryRef = useRef(query);
  const queryPollIntervalRef = useRef<NodeJS.Timeout>();
  const [url] = useState(baseUrl + query);

  // When outer page query changes, update the url state so it goes there
  useEffect(() => {
    // leaving this commented out for now. Will need to figure something out
    // when I add external nav within docs. But currently all nav is done within the iframe
    // setUrl(baseUrl + query);
    queryRef.current = query;
  }, [query]);

  useEffect(() => {
    return () => {
      clearInterval(queryPollIntervalRef.current);
    };
  }, []);

  const setQuery = (query: string) => {
    navigate({
      ...location,
      search: query,
    });
  };

  const onIframeLoaded = () => {
    const iframeLoaded = iframeRef.current?.contentWindow?.document.getElementById("root");

    if (iframeLoaded) {
      queryPollIntervalRef.current = setInterval(() => {
        const iframeQuery = iframeRef.current!.contentWindow!.location.search;
        if (iframeQuery !== queryRef.current) {
          setQuery(iframeQuery);
        }
      }, 500);
    } else if (errorRef.current) {
      errorRef.current.style.display = "unset";
    }
  };

  const onChangeIframe = (ref: HTMLIFrameElement | null) => {
    if (!ref) {
      return;
    }
    iframeRef.current = ref;
    ref.onload = onIframeLoaded;
  };

  return (
    <div className={classes.iframeWrapper}>
      <iframe ref={onChangeIframe} style={{ height: "100%", width: "100%" }} src={url} />
      <h1
        ref={(ref) => (errorRef.current = ref)}
        style={{ display: "none", color: "purple", position: "absolute", inset: 0 }}
      >
        If you're seeing this, then storybook isn't loading correctly - must be built separately
      </h1>
    </div>
  );
};

export default StorybookBuild;
