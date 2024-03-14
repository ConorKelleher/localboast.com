import StorybookBuild from "StorybookBuild";
import styles from "./styles.module.sass";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import usePageTitle from "localboast/hooks/usePageTitle";
import { capitalize } from "localboast/utils/stringHelpers";
import * as LocalBoast from "localboast";

const allLocalBoastKeys = Object.keys(LocalBoast);
const allLocalBoastKeysLowerCaseMap: Record<string, string> = {};
allLocalBoastKeys.forEach((key) => {
  allLocalBoastKeysLowerCaseMap[key.toLowerCase()] = key;
});

const baseUrl = "assets/storybook-static/index.html";
const defaultQuery = "?path=/docs/welcome--docs";

const getCodebaseTitleFromQuery = (query: string) => {
  let title = "Library";

  if (query) {
    const storyContext = query.replace(/\?path=\/[a-z]+\//, "");
    title = "";
    if (storyContext) {
      const [module] = storyContext.split("--");
      const moduleTitleSegments = module.split("-");

      if (moduleTitleSegments[1]) {
        const lowerCaseModuleName = moduleTitleSegments[1];
        const moduleName = allLocalBoastKeysLowerCaseMap[lowerCaseModuleName] || lowerCaseModuleName;
        title += moduleName;
      } else {
        title += capitalize(moduleTitleSegments[0]);
      }
    }
  }

  return `${title} | LocalBoast`;
};

const translateFromUglyQuery = (uglyQuery: string) => {
  return uglyQuery.replace("path=/docs/", "page=").replace("--docs", "");
};

const translateToUglyQuery = (niceQuery: string) => {
  if (niceQuery.includes("path=/docs/")) {
    // direct navigation to ugly url, just use that
    return niceQuery;
  }
  return niceQuery.replace("page=", "path=/docs/") + "--docs";
};

const StorybookPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pageTitle = useMemo(() => getCodebaseTitleFromQuery(location.search), [location.search]);
  usePageTitle(pageTitle);
  const query = translateToUglyQuery(location.search);
  const queryRef = useRef(query);
  const queryPollIntervalRef = useRef<NodeJS.Timeout>();
  const [initialUrl] = useState(baseUrl + (query || defaultQuery));
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

  const setQuery = (newQuery: string) => {
    navigate(
      {
        ...location,
        search: translateFromUglyQuery(newQuery),
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

  const onChangeIframe = (ref: HTMLIFrameElement | null) => {
    if (!ref) {
      return;
    }
    iframeRef.current = ref;
    ref.onload = onIframeLoaded;
  };

  return (
    <div className={styles.storybookPage}>
      <StorybookBuild
        url={initialUrl}
        onChangeIframeRef={onChangeIframe}
        onChangeErrorRef={(ref) => (errorRef.current = ref)}
      />
    </div>
  );
};

export default StorybookPage;
