import StorybookBuild from "StorybookBuild";
import styles from "./styles.module.sass";
import { Location, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import usePageTitle from "localboast/hooks/usePageTitle";
import { capitalize } from "localboast/utils/stringHelpers";
import copyToClipboard from "localboast/utils/copyToClipboard";
import useUpdatingRef from "localboast/hooks/useUpdatingRef";
import * as LocalBoast from "localboast";

const allLocalBoastKeys = Object.keys(LocalBoast);
const allLocalBoastKeysLowerCaseMap: Record<string, string> = {};
allLocalBoastKeys.forEach((key) => {
  allLocalBoastKeysLowerCaseMap[key.toLowerCase()] = key;
});

const baseUrl = "/assets/storybook-static/index.html";
const defaultSearch = "?path=/docs/welcome--docs";

const getCodebaseTitleFromSearch = (search: string) => {
  let title = "";

  if (search) {
    const storyContext = search.replace(/\?path=\/[a-z]+\//, "");
    if (storyContext) {
      const [lowercaseModuleName] = storyContext.split("--");
      const moduleTitleSegments = lowercaseModuleName.split("-");

      if (moduleTitleSegments[1]) {
        const lowerCaseModuleName = moduleTitleSegments[1];
        const moduleName = allLocalBoastKeysLowerCaseMap[lowerCaseModuleName] || lowerCaseModuleName;
        title = moduleName;
      } else {
        title = capitalize(moduleTitleSegments[0]);
      }
    }
  }

  return title;
};

const getCodebaseTitleFromPathname = (pathname: string) => {
  let title = "";
  const storyContext = pathname.replace(/\/docs\/?/, "");
  if (storyContext) {
    const [lowerCaseFolderName, lowerCaseModuleName] = storyContext.split("/");

    if (lowerCaseModuleName) {
      const moduleName = allLocalBoastKeysLowerCaseMap[lowerCaseModuleName] || lowerCaseModuleName;
      title = moduleName;
    } else {
      title = capitalize(lowerCaseFolderName);
    }
  }
  return title;
};

const getCodebaseTitleFromLocation = (location: Omit<Location, "state" | "key" | "hash">) => {
  let title = "Library";

  if (location.search.includes("path=/docs/")) {
    title = getCodebaseTitleFromSearch(location.search) || title;
  } else {
    title = getCodebaseTitleFromPathname(location.pathname) || title;
  }

  return `${title} | LocalBoast`;
};

const translateFromUglySearch = (location: Location, uglySearch: string) => {
  const newLocation = {
    ...location,
    pathname: `${location.pathname.replace(/\/docs\/.+/, "/docs/")}/${uglySearch
      .replace("?path=/docs/", "")
      .replace("--docs", "")
      .replace("welcome", "")
      .replace(/-/g, "/")}`
      .replace(/\/+$/, "")
      .replace(/\/+/g, "/"),
    search: "",
  };

  return newLocation;
};

const translateToUglySearch = (location: Location) => {
  if (location.search.includes("path=/docs/")) {
    // direct navigation to ugly url, just use that
    return location.search;
  }
  return `?path=/docs/${(location.pathname.split("/docs/")[1] || "welcome").replace(/\//g, "-")}--docs`;
};

const StorybookPage = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeLoadedRef = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pageTitle = useMemo(
    () => getCodebaseTitleFromLocation({ pathname: location.pathname, search: location.search }),
    [location.search, location.pathname]
  );
  usePageTitle(pageTitle);
  const search = translateToUglySearch(location);
  const searchRef = useRef(search);
  const { hash } = location;
  const hashRef = useRef(hash);
  const searchPollIntervalRef = useRef<NodeJS.Timeout>();
  const [initialUrl] = useState(baseUrl + (search || defaultSearch) + location.hash);
  const iframeRef = useRef<HTMLIFrameElement | null>();
  const errorRef = useRef<HTMLElement | null>();

  const setLocationRef = useUpdatingRef(({ search: newSearch, hash: newHash }: { search: string; hash: string }) => {
    const onlyHashHasChanged = hashRef.current !== newHash && newSearch === searchRef.current;
    searchRef.current = newSearch;
    hashRef.current = newHash;
    const newLocation = translateFromUglySearch(
      {
        ...location,
        hash: newHash,
      },
      newSearch
    );
    if (onlyHashHasChanged) {
      copyToClipboard(window.location.href.replace(/#.+/, `#${newHash}`));
    }
    if (
      newLocation.pathname !== location.pathname ||
      newLocation.search !== location.search ||
      newLocation.hash !== location.hash
    ) {
      navigate(
        newLocation,
        { replace: !newSearch || newSearch.includes("path=/docs/") } // Don't add to history if automatically redirecting from root
      );
    }
  });

  // When outer page query changes, update the url state so it goes there
  useEffect(() => {
    // leaving this commented out for now. Will need to figure something out
    // when I add external nav within docs. But currently all nav is done within the iframe
    // setUrl(baseUrl + query);
    setLocationRef.current({ search, hash });
  }, [search, hash, setLocationRef]);

  const clearLocationPollingInterval = useCallback(() => {
    clearInterval(searchPollIntervalRef.current);
  }, []);

  useEffect(() => {
    return clearLocationPollingInterval;
  }, [clearLocationPollingInterval]);

  const onIframeLoaded = () => {
    const iframeLoaded = iframeRef.current?.contentWindow?.document.getElementById("root");
    if (iframeLoaded) {
      if (!iframeLoadedRef.current) {
        iframeLoadedRef.current = true;
        setIframeLoaded(true);
      }
      if (searchPollIntervalRef.current) {
        clearInterval(searchPollIntervalRef.current);
      }
      searchPollIntervalRef.current = setInterval(() => {
        const newLocation = iframeRef.current!.contentWindow!.location;
        const iframeSearch = newLocation.search;
        const iframeHash = newLocation.hash;

        if (iframeSearch !== searchRef.current || iframeHash !== hashRef.current) {
          setLocationRef.current(newLocation);
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
        style={{ opacity: iframeLoaded ? 1 : 0 }}
        url={initialUrl}
        onChangeIframeRef={onChangeIframe}
        onChangeErrorRef={(ref) => (errorRef.current = ref)}
      />
    </div>
  );
};

export default StorybookPage;
