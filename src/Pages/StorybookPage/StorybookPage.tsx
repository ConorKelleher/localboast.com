import StorybookBuild from "StorybookBuild";
import styles from "./styles.module.sass";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import usePageTitle from "temp/usePageTitle";
import { capitalize } from "localboast";

const baseUrl = "assets/storybook-static/index.html";

const getCodebaseTitleFromQuery = (query: string) => {
  let title = "React Library";

  if (query) {
    const storyContext = query.replace(/\?path=\/[a-z]+\//, "");
    title = "";
    if (storyContext) {
      const [module, storyName] = storyContext.split("--");
      const moduleTitleSegments = module.split("-");

      if (moduleTitleSegments[1]) {
        title += `${moduleTitleSegments[1]}`;
      }
      if (storyName && storyName !== "docs") {
        title += ` - ${storyName.split("-").map(capitalize).join(" ")}`;
      }
    }
  }

  return `${title} | LocalBoast`;
};

const StorybookPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pageTitle = useMemo(() => getCodebaseTitleFromQuery(location.search), [location.search]);
  usePageTitle(pageTitle);
  const query = location.search;
  const queryRef = useRef(query);
  const queryPollIntervalRef = useRef<NodeJS.Timeout>();
  const [currentUrl] = useState(baseUrl + query);
  const iframeRef = useRef<HTMLIFrameElement | null>();
  const errorRef = useRef<HTMLElement | null>();

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

  const onChangeIframe = (ref: HTMLIFrameElement | null) => {
    if (!ref) {
      return;
    }
    iframeRef.current = ref;
    ref.onload = onIframeLoaded;
  };

  const setQuery = (newQuery: string) => {
    debugger;
    navigate(
      {
        ...location,
        search: newQuery,
      },
      { replace: !query } // Don't add to history if automatically redirecting from root
    );
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

  return (
    <div className={styles.storybookPage}>
      <StorybookBuild
        url={currentUrl}
        onChangeIframeRef={onChangeIframe}
        onChangeErrorRef={(ref) => (errorRef.current = ref)}
      />
    </div>
  );
};

export default StorybookPage;
